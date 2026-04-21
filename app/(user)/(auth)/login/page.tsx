import { SignIn } from '@/components/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'লগইন - Freelancer Bangladesh',
  description: 'আপনার অ্যাকাউন্টে লগইন করুন এবং আমাদের সেবা উপভোগ করুন',
};

export default function LoginPage() {
  return (
    <SignIn />
  );
}
