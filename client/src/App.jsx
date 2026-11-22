import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AIAgentCopilot from './components/AIAgentCopilot';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import Unlock from './pages/Unlock';
import Send from './pages/Send';
import Receive from './pages/Receive';
import History from './pages/History';
import AddressBook from './pages/AddressBook';
import Profile from './pages/Profile';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
          <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-darkbg dark:text-gray-100 flex flex-col transition-colors duration-200 relative overflow-x-hidden">
            {/* Atmospheric Web3 Background Mesh */}
            <div className="web3-bg-mesh">
              <div className="web3-glow-orb-1" />
              <div className="web3-glow-orb-2" />
              <div className="web3-glow-orb-3" />
              <div className="web3-grid-overlay" />
            </div>

            <Navbar />
            <main className="flex-1 pb-16 relative z-10">
              <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Onboarding & Wallet Setup Routes */}
                <Route
                  path="/welcome"
                  element={
                    <ProtectedRoute requireUnlocked={false}>
                      <Welcome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-wallet"
                  element={
                    <ProtectedRoute requireUnlocked={false}>
                      <CreateWallet />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/import-wallet"
                  element={
                    <ProtectedRoute requireUnlocked={false}>
                      <ImportWallet />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/unlock"
                  element={
                    <ProtectedRoute requireUnlocked={false}>
                      <Unlock />
                    </ProtectedRoute>
                  }
                />

                {/* Main Authenticated Wallet Pages */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/send"
                  element={
                    <ProtectedRoute requireUnlocked={true}>
                      <Send />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/receive"
                  element={
                    <ProtectedRoute>
                      <Receive />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <ProtectedRoute>
                      <AddressBook />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <AIAgentCopilot />
          </div>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
