import Navbar from '~/components/nav-bar';
import type { Route } from './+types/home';
import { resumes } from '~/constants';
import ResumeCard from '~/components/resume-card';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resumind' },
    { name: 'description', content: 'Smart feedback for your dream job!' },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=');
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className='resumes-section'>
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
