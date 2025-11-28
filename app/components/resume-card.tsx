import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router';
import ScoreCircle from './score-circle';
import { usePuterStore } from '~/lib/puter';

interface ResumeCardProps {
  resume: Resume;
}

const ResumeCard: FC<ResumeCardProps> = ({
  resume: { id, imagePath, companyName, jobTitle, feedback },
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string>('');

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className='resume-card animate-in fade-in duration-100'
    >
      <div className='resume-card-header'>
        <div className='flex flex-col gap-2'>
          {companyName && (
            <h2 className='text-black! font-bold wrap-break-words'>
              {companyName}
            </h2>
          )}
          {jobTitle && (
            <h3 className='text-lg wrap-break-word text-gray-500'>
              {jobTitle}
            </h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className='text-black! font-bold'>Resume</h2>
          )}
        </div>

        <div className='shrink-0'>
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className='gradient-border animate-in fade-in duration-100'>
          <div className='w-full h-full rounded-2xl overflow-hidden'>
            <img
              src={resumeUrl}
              alt='resume'
              className='w-full h-[350px] max-sm:h-[200px] object-cover object-top'
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
