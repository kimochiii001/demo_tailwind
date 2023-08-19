// MIN = Minimum expected value
// MAX = Maximum expected value
import React from 'react';

import { CircularProgress, LinearProgress } from "@mui/material";

// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value) => ((value - 0) * 100) / (100 - 0);

// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>

  );
}

export default Progress