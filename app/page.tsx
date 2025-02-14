"use client"
import { useEffect, useState } from 'react';
import { authOnAppLoad } from '@services/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import "./styles/home.scss";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getAuthCredentialsOnAppLoad = async () => {
      await authOnAppLoad(); // This will get a public key for later use in encrypting login information
    }
    getAuthCredentialsOnAppLoad();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/mylearning");
    }
  }, [user, router]);

  const handleLoginClick = () => {
    router.push('/login');
  }

  const handleRegisterClick = () => {
    router.push('/register');
  }

  return (
    <div>
      <section 
        className="navigation"
        aria-label="navigation"
      >
      </section>

      <section 
        className="header"
        aria-label="header"
      >
        
      </section>

      <section 
        className="promo-first"
        aria-label="promo-first"
      >
        
      </section>

      <section 
        className="promo-second"
        aria-label="promo-second"
      >
        
      </section>
      <section 
        className="promo-third"
        aria-label="promo-third"
      >
        
      </section>

      <section 
        className="promo-fourth"
        aria-label="promo-fourth"
      >
        
      </section>

      <section
        className="auth-buttons"
        aria-label="auth-buttons"
      >
        <div className="button-item">
          <button
            className="a-button"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
        <div className="button-item">
          <button 
            className="a-button"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </section>
    </div>
  );
}
