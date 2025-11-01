import React, { useEffect, useState } from 'react';
import { FarcasterIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const QRCodeSVG = () => (
    <svg width="200" height="200" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-lg">
        <path fill="#ffffff" d="M0 0h256v256H0z"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M64 64H0V0h64v64Zm-8-8V8h-48v48h48ZM48 48V16h-32v32h32Zm24-40h168V0H72v8ZM192 64h64V0h-64v64Zm8-8V8h48v48h-48ZM80 56h16V40H80v16Zm8-8v-24h24V8H72v48h24V40H88v8Zm32 0h16V40h-16v16Zm8-8h-24V24h16v16h8v-8h16V16h-24v24h-8v8Zm32 8h16V40h-16v16Zm16-8v-8h16v16h-16V40h-8v8h8Zm-40-16h16V24h-16v16Zm-24-8h16V16h-16v16Zm-40 40H0v16h88v-16h-8Zm-8 8v-24H24v32h48v-8h-8Zm120 48h48v-16h16v24h-64v-8Zm-8-8h-16v16h24v-24h-8v8Zm8-40h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Zm-24 24h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Zm-24 24h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Zm-24-40h-16v16h16v-16Zm8 24h-16v16h16v-16Zm-8 8h-16v16h24v-24h-8v8Zm-24-40h-16v16h16v-16Zm8 24h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Zm-24 24H88v16h16v-16Zm8-8H88v16h24v-24h-8v8Zm48-40v16h-16v-16h16Zm-8-8h-16v16h24v-24h-8v8Zm-24 24h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Zm16-24v16h-16v-16h16Zm-8-8h-16v16h24v-24h-8v8Zm24-24v16h-16v-16h16Zm-8-8h-16v16h24v-24h-8v8ZM64 192H0v64h64v-64Zm-8 8v48H8v-48h48Zm-40 8v32h32v-32H16Zm80-64H80v16h16v-16Zm-8-8H72v48h16v-16h8v-16h-8v-16Zm40-8h16v-16h-16v16Zm-8 24v-8h16v-16h-24v48h16v-16h8v-8h-8Zm-48-8h-16v16h16v-16Zm8-8h-24v48h16v-16h8v-16h-8v-16Zm-40 40H0v-16h72v16h-8Zm8-8H24v-16h48v16Zm120 40h64v-64h-64v64Zm8-8v-48h48v48h-48Zm8-40v32h32v-32h-32Zm-48-24h-16v16h16v-16Zm-8 8h-16v16h24v-24h-8v8Zm48 40h16v-16h-16v16Zm-8 8h-16v16h24v-24h-8v8Zm-24-24h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Zm-8-24h16v-16h-16v16Zm-8 8h-16v16h24v-24h-8v8Zm-24-24h-16v16h16v-16Zm-8-8h-16v16h24v-24h-8v8Z"/>
    </svg>
);

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [status, setStatus] = useState<'scanning' | 'verifying' | 'success'>('scanning');

  useEffect(() => {
    if (isOpen) {
      setStatus('scanning'); // Reset status when modal opens
      const timer = setTimeout(() => {
        setStatus('verifying');
        const successTimer = setTimeout(() => {
          setStatus('success');
          // Wait a bit on success message before closing and logging in
          setTimeout(() => {
            onLoginSuccess();
          }, 1000);
        }, 2000); // Simulate verification time
        return () => clearTimeout(successTimer);
      }, 2500); // Time for user to "scan"
      return () => clearTimeout(timer);
    }
  }, [isOpen, onLoginSuccess]);

  if (!isOpen) {
    return null;
  }

  const statusContent = {
    scanning: {
      title: 'Scan to Sign In',
      description: 'Open Warpcast on your mobile device and scan this QR code to sign in securely.',
    },
    verifying: {
      title: 'Verifying...',
      description: 'Please confirm the sign-in request in your Farcaster app.',
    },
    success: {
      title: 'Success!',
      description: 'You have been successfully authenticated. Welcome!',
    },
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700 w-full max-w-sm m-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
            <FarcasterIcon />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{statusContent[status].title}</h2>
        <p className="text-gray-400 mb-6">{statusContent[status].description}</p>
        
        <div className="relative w-[200px] h-[200px] mx-auto">
            {status === 'scanning' && <QRCodeSVG />}
            {status === 'verifying' && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {status === 'success' && (
                <div className="w-full h-full flex items-center justify-center">
                     <svg className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            )}
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
            This is a simulation of the "Sign-In with Farcaster" flow.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
