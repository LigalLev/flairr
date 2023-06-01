import { useEffect, useState } from 'react'
export function Hero() {
    const slides = [
        {
            heroClass: 'valentina',
            name: 'Valentina',
            Rating: '',
            occupation: 'AI Artist'
        },
        {
            name: 'Andrea',
            heroClass: 'andrea',
            Rating: '',
            occupation: 'Fashion Designer'
        },
        {
            name: 'Moon',
            heroClass: 'moon',
            Rating: '',
            occupation: 'Marketing Expert'
        },
        {
            name: 'Ritika',
            heroClass: 'ritika',
            Rating: '',
            occupation: 'Shoemaker and Designer'
        },
        {
            name: 'Zach',
            heroClass: 'zach',
            Rating: '',
            occupation: 'Bar Owner'
        },
        {
            name: 'Gabrielle',
            heroClass: 'gabrielle',
            Rating: '',
            occupation: 'Video Editor'
        },


    ]

    const [currSlideIdx, setCurrSlideIdx] = useState(0)

    useEffect(() => {
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
                className='full hero-img-wrapper'
                key={idx}
                >

                    <div
                        
                        className={`hero-img full ${slide.heroClass} ${currSlideIdx === idx ? 'active' : ''}`}
                    ></div>

                    {/* <p>
                        {`${slide.name},`}
                        <span>{slide.occupation}</span>
                    </p> */}
                </section>
            ))}

        </section >
    )
}