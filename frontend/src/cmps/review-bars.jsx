import { StarRating } from "./star-rating-new";
import { StarsBar } from "./stars-bar";


export function ReviewBars() {
  const scores = {
    "5": 18,
    "4": 2,
    "3": 0,
    "2": 0,
    "1": 0,
  };
  const values = Object.values(scores);
  const sum = values.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="review-bars">
      <div className="stars-top">
        {`${sum} reviews for this Gig`}
        <div className="rating">
          <StarRating rating={5} /> 4.9
          
        </div>
      </div>
      <div className="stars">
        <StarsBar rate={"5"} scores={scores} totalScores={sum} />
        <StarsBar rate={"4"} scores={scores} totalScores={sum} />
        <StarsBar rate={"3"} scores={scores} totalScores={sum} />
        <StarsBar rate={"2"} scores={scores} totalScores={sum} />
        <StarsBar rate={"1"} scores={scores} totalScores={sum} />
      </div>
    </div>
  );
}