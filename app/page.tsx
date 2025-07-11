"use client"
import { useEffect } from 'react';
import { authOnAppLoad } from '@services/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import "./styles/home.scss";

export default function Home() {
  const { user } = useAuth();
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
    <div className="front-page">
      <section 
        className="heading"
        aria-label="heading"
      >
        <div className="heading-panel">
          
          <div className="heading-item">
            <h1 className="heading-title">EAPLY</h1>
          </div>
          
          <div className="heading-blurb">
            <p>Write. EAPLY style.</p>
          </div>
          
        </div>
      </section>

      <section
        className="auth-buttons"
        aria-label="auth-buttons"
      >

        <div className="button-panel">
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
        </div>
        
      </section>

      

      {/* <section 
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
        
      </section> */}

      
    </div>
  );
}
