import type { UUID } from 'node:crypto';

interface ResumeAnalyzeType {
  id: UUID;
  resumePath: string;
  imagePath: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  feedback: Feedback | null;
}
