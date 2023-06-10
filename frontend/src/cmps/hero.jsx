import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { SearchFilter } from './search-filter'
import { TagFilter } from './tag-filter'
import { heroSlides } from '../constants/constants'

export function Hero() {
    const slides = heroSlides
    const [currSlideIdx, setCurrSlideIdx] = useState(0)

    useEffect(() => {
        if (window.innerWidth < 964) return
        const slideInterval = setInterval(() => {
            setCurrSlideIdx((prevIdx) => (prevIdx + 1) % slides.length)
        }, 7000)

        return () => {
            clearInterval(slideInterval)
        }
    }, [])

    const slide = slides[currSlideIdx]
    return (
        <section className="hero main-layout full">
            {slides.map((slide, idx) => (
                <section
                    key={idx}
                    className={`main-layout full hero-bg-wrapper  ${currSlideIdx === idx ? 'active' : ''}`}
                >

                    <div

                        className={`hero-img full ${slide.heroClass} `}
                    ></div>

                    <div className='hero-name-wrapper'>
                        {slide.isSeller &&
                            <img
                                src="https://res.cloudinary.com/dqhfnvtca/image/upload/v1685657712/flairr/hero/five_stars_dfomu6.svg"
                                alt="five stars"
                                className='rating'
                            />
                        }
                        <p>
                            {`${slide.name}, `}
                            <span>{slide.occupation}</span>
                        </p>
                    </div>
                </section>
            ))}

            <section className="filtering-area" >
                <h1>
                    Find the right <span>freelance <br /> service, </span>right away
                </h1>

                <SearchFilter placeholder={'Search for any service...'} />

                <div className='popular-tags'>
                    <p>Popular:</p>
                    <TagFilter/>
                    {/* <ul>
                        {popularTags.map(tag =>
                            <li key={tag}>
                                <button>
                                    <Link to="/gig">
                                        {tag}
                                    </Link>
                                </button>
                            </li>
                        )}

                    </ul> */}
                </div>

            </section >

        </section >
    )
}