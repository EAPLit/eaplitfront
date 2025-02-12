"use client"
import { useEffect } from 'react';
import { authOnAppLoad } from '@services/auth';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const getAuthCredentialsOnAppLoad = async () => {
      await authOnAppLoad(); // This will get a public key for later use in encrypting login information
    }
    getAuthCredentialsOnAppLoad();
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  }

  const handleRegisterClick = () => {
    router.push('/register');
  }

  return (
    <div>
      <div 
        className="navigation"
        data-testid="navigation"
      >

      </div>

      <div 
        className="header"
        data-testid="header"
      >
        
      </div>

      <div 
        className="promo-first"
        data-testid="promo-first"
      >
        
      </div>

      <div 
        className="promo-second"
        data-testid="promo-second"
      >
        
      </div>
      <div 
        className="promo-third"
        data-testid="promo-third"
      >
        
      </div>

      <div 
        className="promo-fourth"
        data-testid="promo-fourth"
      >
        
      </div>

      <div
        className="auth-buttons"
      >
        <div>
          <button
            className="login-button"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
        <div>
          <button 
            className="register-button"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
