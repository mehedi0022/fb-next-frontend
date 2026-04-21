const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyOTP = async (email: string, otp: string) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    throw new Error('OTP verification failed');
  }

  return response.json();
};

export const authService = {
  verifyOTP,
};
