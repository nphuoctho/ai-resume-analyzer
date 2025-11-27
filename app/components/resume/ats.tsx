import type { FC } from 'react';

interface ATSProps {
  score: number;
  tips: {
    type: 'good' | 'improve';
    tip: string;
  }[];
}

const ATS: FC<ATSProps> = () => {
  return <h1>ATS</h1>;
};

export default ATS;
