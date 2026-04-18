import { TwoFactorAuth } from '@/lib';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'দুই-ধাপ যাচাইকরণ - Freelancer Bangladesh',
  description: 'আপনার অ্যাকাউন্টের নিরাপত্তার জন্য দুই-ধাপ যাচাইকরণ সম্পন্ন করুন',
};

export default function TwoFactorPage() {
  return (
    <TwoFactorAuth />
  );
}