import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export const ProtectedRoute = ({ children, requireUnlocked = false }) => {
  const { isAuthenticated, loading } = useAuth();
  const { hasWallet, isLocked } = useWallet();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darkbg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-forest-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-mono text-xs">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user has no wallet setup yet and is not already on onboarding
  if (!hasWallet && !['/welcome', '/create-wallet', '/import-wallet'].includes(location.pathname)) {
    return <Navigate to="/welcome" replace />;
  }

  // If page requires wallet to be unlocked (e.g. sending funds) and it is locked
  if (requireUnlocked && isLocked) {
    return <Navigate to="/unlock" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
