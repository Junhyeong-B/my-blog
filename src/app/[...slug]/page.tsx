import { redirect } from 'next/navigation';

export default function GlobalNotFound() {
  // Temporarily redirects to the home page.
  redirect('/');
  return null;
}
