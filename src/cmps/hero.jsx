import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
export function Hero() {
    const slides = [
        {
            heroClass: 'valentina',
            name: 'Valentina',
            isSeller: true,
            occupation: 'AI Artist'
        },
        {
            name: 'Andrea',
            heroClass: 'andrea',
            isSeller: false,
            occupation: 'Fashion Designer'
        },
        {
            name: 'Moon',
            heroClass: 'moon',
            isSeller: true,
            occupation: 'Marketing Expert'
        },
        {
            name: 'Ritika',
            heroClass: 'ritika',
            isSeller: false,
            occupation: 'Shoemaker and Designer'
        },
        {
            name: 'Zach',
            heroClass: 'zach',
            isSeller: false,
            occupation: 'Bar Owner'
        },
        {
            name: 'Gabrielle',
            heroClass: 'gabrielle',
            isSeller: true,
            occupation: 'Video Editor'
        },


    ]

    const popularTags = ['Website Design', 'wordPress', 'Logo Design', 'AI services']

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

                <div className='search-bar'>
                    <input type="text" placeholder='Search for any service...' name="txt" id="hero-search-text" />

                    <button className='search-btn'>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z" /></svg>
                    </button>
                </div>

                <div className='popular-tags'>
                    <p>Popular:</p>
                    <ul>
                        {popularTags.map(tag =>
                            <li key={tag}>
                                <button>
                                    <Link to="/gig">
                                        {tag}
                                    </Link>
                                </button>
                            </li>
                        )}

                    </ul>
                </div>

            </section >

        </section >
    )
}