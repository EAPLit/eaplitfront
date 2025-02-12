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
    </div>
  );
}
