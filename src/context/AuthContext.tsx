import { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextProps } from '../types';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));

  const addUser = (user: User) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const findUserByEmail = (email: string): User | undefined => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    return users.find(user => user.email === email);
  };

  const login = (email: string, password: string) => {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = (email: string, password: string, name: string) => {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }
    const newUser = { email, password, name };
    addUser(newUser);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
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
