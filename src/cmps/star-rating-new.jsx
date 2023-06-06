import React from 'react'

export function StarRating({ rating }) {
  const starCount = Math.floor(rating);
  // console.log('starCount:', starCount)
  // const isHalfStar = rating % 1 !== 0;

  const stars = []
 
  for (let i = 0; i <= starCount; i++) {
    stars.push(
      <svg key={i}  width="17" height="17" viewBox="173.637 309.882 16.391 16.472" xmlns="http://www.w3.org/2000/svg">
        <path  fill-rule="evenodd" fill="#ffb33e" clip-rule="evenodd" d="M 189.735 316.246 C 189.735 316.416 189.61 316.577 189.485 316.7 L 185.995 320.046 L 186.822 324.772 C 186.832 324.838 186.832 324.895 186.832 324.961 C 186.832 325.207 186.716 325.433 186.437 325.433 C 186.303 325.433 186.168 325.386 186.053 325.32 L 181.735 323.089 L 177.418 325.32 C 177.293 325.386 177.168 325.433 177.033 325.433 C 176.755 325.433 176.63 325.207 176.63 324.961 C 176.63 324.895 176.639 324.838 176.649 324.772 L 177.476 320.046 L 173.976 316.7 C 173.86 316.577 173.735 316.416 173.735 316.246 C 173.735 315.963 174.033 315.849 174.274 315.811 L 179.101 315.122 L 181.264 310.821 C 181.351 310.641 181.514 310.433 181.735 310.433 C 181.957 310.433 182.12 310.641 182.207 310.821 L 184.37 315.122 L 189.197 315.811 C 189.428 315.849 189.735 315.963 189.735 316.246 Z"  />
      </svg>
    );
    console.log(stars)
  }

  //   if (isHalfStar) {
  //     stars.push(<svg key="half" className="half-star" ...>...</svg>);
  //   }

  //   for (let i = starCount + isHalfStar; i < 5; i++) {
  //     stars.push(<svg key={i} className="empty-star" ...>...</svg>);
  //   }

  return <div className="stars-container">{stars}</div>;
}


