import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



type AuthContextType = {
  memoryToken: string | null;
  setMemoryToken: (token: string | null) => void;
  userData: String | null;
  setUserData: (data: String | null) => void;
  savePersistentToken: (token: string) => Promise<void>;
  clearPersistentToken: () => Promise<void>;
  isAuthChecked: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [memoryToken, setMemoryToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<String | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Funções de persistência
  const savePersistentToken = async (token: string) => {
    await AsyncStorage.setItem('auth_token', token);
  };

  const clearPersistentToken = async () => {
    await AsyncStorage.removeItem('auth_token');
  };

  // Carrega token ao iniciar (opcional)
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      setMemoryToken(token);
      setIsAuthChecked(true);
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        memoryToken,
        setMemoryToken,
        userData,
        setUserData,
        savePersistentToken,
        clearPersistentToken,
        isAuthChecked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}