import type { FC } from 'react';

interface SummaryProps {
  feedback: Feedback;
}

const Summary: FC<SummaryProps> = ({ feedback }) => {
  return <h1>Summary</h1>;
};

export default Summary;
