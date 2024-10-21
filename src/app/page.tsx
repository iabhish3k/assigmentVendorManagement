// src/app/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function HomePage() {
  redirect('/dashboard');
  const token = cookies().get('token');

  if (!token) {
    // Redirect to login if not logged in
    redirect('/login');
  } else {
    // Redirect to dashboard if logged in
    redirect('/dashboard');
  }

  return null;
}
