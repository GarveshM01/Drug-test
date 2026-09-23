import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Officer } from '../types';
import { MOCK_OFFICERS } from '../data/mockData';

interface AuthContextType {
  user: Officer | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (officerId: string, unitId?: string, pin?: string) => boolean;
  loginAs: (officer: Officer) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'drugtest_secure_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial user strictly from localStorage, null by default so user begins at /login
  const [user, setUser] = useState<Officer | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = (officerId: string, unitId?: string, pin?: string): boolean => {
    const trimmedId = officerId.trim().toUpperCase();
    const trimmedUnit = unitId?.trim() || 'BPL-CENTRAL-01';
    const trimmedPin = pin?.trim() || '';

    // Match primary demo credentials (OFF-1023, BPL-CENTRAL-01, PIN 1234 or 1023)
    if (trimmedId === 'OFF-1023' || trimmedId === 'OFF1023') {
      if (!trimmedPin || trimmedPin === '1234' || trimmedPin === '1023') {
        const officer: Officer = {
          ...MOCK_OFFICERS[0],
          id: 'OFF-1023',
          unit: trimmedUnit || 'BPL-CENTRAL-01'
        };
        setUser(officer);
        return true;
      }
    }

    // Match other mock officers
    const found = MOCK_OFFICERS.find(
      o => o.id.toUpperCase() === trimmedId
    );
    if (found) {
      if (!trimmedPin || found.pin === trimmedPin || trimmedPin === '1234') {
        const officer: Officer = {
          ...found,
          unit: trimmedUnit || found.unit
        };
        setUser(officer);
        return true;
      }
    }

    // Allow mock sign-in for any provided Officer ID if PIN is provided or valid demo PIN
    if (trimmedId.length > 0) {
      const isSupervisor = trimmedId.includes('ADM') || trimmedId.includes('SUP');
      const fallbackOfficer: Officer = {
        id: trimmedId,
        name: isSupervisor ? `Supervisor ${trimmedId}` : `Officer ${trimmedId}`,
        badgeNumber: `FLD-${Math.floor(1000 + Math.random() * 9000)}`,
        unit: trimmedUnit || 'BPL-CENTRAL-01',
        station: 'Field Station Sector 4',
        role: isSupervisor ? 'supervisor' : 'officer',
        pin: trimmedPin || '1234',
        phone: '+91 98260 10234'
      };
      setUser(fallbackOfficer);
      return true;
    }

    return false;
  };

  const loginAs = (officer: Officer) => {
    setUser(officer);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAdmin = user?.role === 'supervisor';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        login,
        loginAs,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
