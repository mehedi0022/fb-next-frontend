import { TermsAndConditions } from '@/components/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'টার্মস এন্ড কন্ডিশন - Freelancer Bangladesh',
  description: 'Freelancer Bangladesh এর ব্যবহারের শর্তাবলী, ক্রয়-বিক্রয়ের নিয়মাবলী এবং নীতিমালা সম্পর্কে বিস্তারিত জানুন।',
  keywords: 'টার্মস এন্ড কন্ডিশন, শর্তাবলী, নীতিমালা, ক্রয়-বিক্রয়, রিটার্ন পলিসি',
};

export default function TermsAndConditionsPage() {
  return (
    <TermsAndConditions />
  );
}