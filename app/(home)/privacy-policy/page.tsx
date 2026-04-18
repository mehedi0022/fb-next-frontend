import { PrivacyPolicy } from '@/lib';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'গোপনীয়তা নীতি - Freelancer Bangladesh',
  description: 'Freelancer Bangladesh এর গোপনীয়তা নীতি। আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি সে সম্পর্কে বিস্তারিত জানুন।',
  keywords: 'গোপনীয়তা নীতি, প্রাইভেসি পলিসি, ডেটা সুরক্ষা, তথ্য নিরাপত্তা, ব্যক্তিগত তথ্য',
};

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicy />
  );
}