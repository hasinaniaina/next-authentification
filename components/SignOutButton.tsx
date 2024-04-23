'use client'
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react'

export default function SignOutButton() {
  const [logoutLoadingButton, setLogoutButtonLoading] = useState(false);
  return (    
    <button onClick={() => {
        setLogoutButtonLoading(true);
        signOut( {
          redirect: true,
          callbackUrl: `${window.location.origin}/login`
        });
      }}>
        <span className={cn({"disappear":!logoutLoadingButton})}>
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <circle className="spin2" cx="400" cy="400" fill="none"
            r="200" stroke-width="50" stroke="#000"
            stroke-dasharray="700 1400"
            stroke-linecap="round" />
          </svg>
        </span>
        <span className={cn({"disappear":logoutLoadingButton})}>
          Logout
        </span>
    </button>
  )
}
