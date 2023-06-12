import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 12


function setCriteria(filterBy) {
    const criteria = {}
    // console.log('filterBy!@!!nn:', filterBy)
    if (filterBy.txt) {
        criteria.$or = [
            { title: { $regex: filterBy.txt, $options: "i" } },
            { description: { $regex: filterBy.txt, $options: "i" } },
            { category: { $regex: filterBy.txt, $options: "i" } },
            { "owner.fullname": { $regex: filterBy.txt, $options: "i" } }
        ]
    }
    if (filterBy.category) {
        criteria.category = { $regex: filterBy.category, $options: "i" }
    }
    if (filterBy.tag) {
        criteria.tags = { $elemMatch: { $regex: filterBy.tag, $options: "i" } }

    }
    console.log('creteria:', criteria)

    return criteria
}

async function query(filterBy = {}) {
    try {
        const criteria = setCriteria(filterBy)
        const collection = await dbService.getCollection('gig')

        var gigCursor = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'owner._id',
                    from: 'review',
                    foreignField: 'sellerId',
                    as: 'reviews'
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$$ROOT", { reviews: "$reviews" }]
                    }
                }
            },
        ])

        if (filterBy.pageIdx !== undefined) {
            gigCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        }
        let gigs = gigCursor.toArray()
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        var gigs = await collection.aggregate([
            {
                $match: { _id: ObjectId(gigId) }
            },
            {
                $lookup:
                {
                    localField: 'owner._id',
                    from: 'review',
                    foreignField: 'sellerId',
                    as: 'reviews'
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$$ROOT", { reviews: "$reviews" }]
                    }
                }
            },
        ]).toArray()

        // const gig = collection.findOne( { _id: ObjectId(gigId) })
        return gigs[0]
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.deleteOne({ _id: ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        const userCollection = await dbService.getCollection('user')
        const owner = await userCollection.findOne({ _id: ObjectId(gig.ownerId) })

        const gigToSave = {
            title: gig.title,
            // price: gig.price,
            // daysToMake: gig.daysToMake,
            description: gig.description,
            imgUrls: [...gig.imgUrls],
            category: gig.category,
            tags: [...gig.tags],
            likedByUsers: [...gig.likedByUsers],
            packages: { ...gig.packages },
            owner: {
                _id: owner._id,
                fullname: owner.fullname,
                imgUrl: owner.imgUrl,
                level: owner.level,
                rate: owner.rate
            }
        }
        const collection = await dbService.getCollection('gig')
        const result = await collection.insertOne(gigToSave)
        return result.ops[0]
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}

async function update(gig) {
    try {
        const gigToSave = {
            title: gig.title,
            packages: { ...gig.packages },
            // price: gig.price,
            // daysToMake: gig.daysToMake,
            description: gig.description,
            imgUrls: [...gig.imgUrls],
            category: gig.category,
            tags: [...gig.tags],
            likedByUsers: [...gig.likedByUsers]
        }
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ _id: ObjectId(gig._id) }, { $set: gigToSave })
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gig._id}`, err)
        throw err
    }
}

async function addGigMsg(gigId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ _id: ObjectId(gigId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add gig msg ${gigId}`, err)
        throw err
    }
}

async function removeGigMsg(gigId, msgId) {
    try {
        const collection = await dbService.getCollection('gig')
        await collection.updateOne({ _id: ObjectId(gigId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add gig msg ${gigId}`, err)
        throw err
    }
}

export const gigService = {
    remove,
    query,
    getById,
    add,
    update,
    addGigMsg,
    removeGigMsg
}
