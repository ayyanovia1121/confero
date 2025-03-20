'use client'
import { SignIn, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

export default function Page() {
  const {user} = useUser();
  if(user) redirect('/')
  return <SignIn forceRedirectUrl={'/'}/>;
} 