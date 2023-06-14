export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    resizeImgUrl,
    formatSearchParam,
    getRandomColor,
    formatTime
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function resizeImgUrl(url, params = 'w_440,h_230,c_fill') {
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');

    if (uploadIndex !== -1) {
        parts.splice(uploadIndex + 1, 0, params);
    }

    const convertedUrl = parts.join('/');

    return convertedUrl;
}

function formatSearchParam(searchParam) {
    if (searchParam.includes('&')) return searchParam.replaceAll('&', '%26')
    // else if (searchParam.includes('-')) return searchParam.replaceAll('%26',' & ')
    else return searchParam
}

//get random color HEX
function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
}

function formatTime(time) {
    let now = Date.now()
    let diff = now - time
    console.log('now:', now)
    console.log('time:', time)

    const SECOND = 1000
    const MINUTE = SECOND * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = DAY * 30
    const YEAR = DAY * 365

    if (diff < MINUTE) return 'Just now'
    if (diff < MINUTE * 5) return 'A few minutes ago'
    if (diff < HOUR) return 'Less than a hour ago'
    if (diff < HOUR * 3) return 'Couple of hours ago'
    if (diff < DAY) return 'Today'
    if (diff < DAY * 2) return 'Yesterday'
    if (diff < DAY * 3) return '2 days ago'
    if (diff < WEEK) return 'About a week ago'
    if (diff < MONTH) return 'About a month ago'
    if (diff < MONTH * 2) return 'A few months ago'
    // if (diff < YEAR) return 'About a year ago'

    return _getFormattedTime(time)
}

function _getFormattedTime(t) {
    var d = new Date(t)
    // console.log('d', d)

    var str = 'At ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' +
        d.getFullYear() + ', ' + padTime(d.getHours())+ ':' + padTime(d.getMinutes())
    return str
}

function padTime(time){
    const res = time < 10 ? "0"+time.toString() : time.toString()
    return res
    
}