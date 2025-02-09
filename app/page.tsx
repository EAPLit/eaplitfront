"use client"
import { useEffect } from 'react';
import { authOnAppLoad } from '@services/auth';

export default function Home() {

  useEffect(() => {
    const getAuthCredentialsOnAppLoad = async () => {
      await authOnAppLoad(); // This will get a public key for later use in encrypting login information
    }
    getAuthCredentialsOnAppLoad();
  }, []);

  return (
    <div>
      <p>Welcome to the home page</p>
    </div>
  );
}
