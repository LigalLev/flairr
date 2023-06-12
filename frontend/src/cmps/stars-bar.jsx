import  React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {StarRating} from "./star-rating-new";

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#ffb33e' : '#ffb33e',
    },
}));

export function StarsBar({ rate, scores, totalScores }) {
  const value = scores[rate] / totalScores;

  return (
    <div className="stars-bar">
      <div className="rate">
        {rate} Star{`${rate === "1" ? "" : "s"}`}
      </div>
      <Box sx={{paddingInline: "10px", paddingBlock: "10px", width: "70%"}}>
        <BorderLinearProgress
          variant="determinate"
          value={value * 100}
        />
      </Box>
      <div className="score">
        ({scores[rate]})
      </div>
    </div>
  );
}