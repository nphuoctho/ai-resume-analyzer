import type { FC } from 'react';

interface DetailsProps {
  feedback: Feedback;
}

const Details: FC<DetailsProps> = ({ feedback }) => {
  return <h1>Details</h1>;
};

export default Details;
