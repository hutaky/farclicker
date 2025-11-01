
import React from 'react';

export const FarcasterIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM5.06 4.34l5.88 2.52a.2.2 0 0 1 .1.35L8.2 11.66a.2.2 0 0 1-.36-.09L6.1 7.9a.2.2 0 0 0-.26-.26l-3.67-1.74a.2.2 0 0 1-.09-.36l2.98-1.16a.2.2 0 0 1 .1.1Z" fill="currentColor"/>
  </svg>
);

export const CoinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.852 6.811c.428-.242.923-.384 1.448-.384 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.525 0-1.02-.142-1.448-.384m-2.896-7.232c.428.242.923.384 1.448.384 2.21 0 4-1.79 4-4s-1.79-4-4-4c-.525 0-1.02.142-1.448.384m2.896 7.232c-.428.242-.923.384-1.448.384-2.21 0-4 1.79-4 4s1.79 4 4 4c.525 0 1.02-.142 1.448-.384m-2.896-7.232c-.428-.242-1.22-.68-2.052-1.157M5.75 13.25c.832.476 1.624.915 2.052 1.157" />
    </svg>
);

export const CalendarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const LogoutIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const ShopIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

export const AutoClickerIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8 14.25h.008v.008H8v-.008z" />
    </svg>
);

export const MultiplierIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
