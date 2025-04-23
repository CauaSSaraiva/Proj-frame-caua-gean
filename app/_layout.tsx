// app/_layout.tsx
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState, createContext, useContext } from "react";
import { getToken } from "./utils/auth"; 
import AsyncStorage from "@react-native-async-storage/async-storage";


// adicionando context pq se não ele vai sempre redirecionar de volta pro login
// se o usuario nao marcar o  lembrar de mim lá
const AuthContext = createContext<{
  setMemoryToken: (token: string | null) => void;
} | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth precisa estar dentro do AuthProvider");
  return context;
}


export default function RootLayout() {
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [memoryToken, setMemoryToken] = useState<string | null>(null);


  const segments = useSegments();
  const router = useRouter();


  useEffect(() => {
    async function checkLogin() {
      const token = await getToken();
      if (token || memoryToken) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setAuthChecked(true);
    }

    // comentar e descomentar isso aqui pra testar a autenticação
    // if (__DEV__) {
    //   AsyncStorage.setItem("auth_token", "fake-token");
    // }
    checkLogin();
  }, [memoryToken]);

  useEffect(() => {
    if (!isAuthChecked) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/"); // home
    }
  }, [isAuthChecked, isLoggedIn, segments]);

  if (!isAuthChecked) return null; // ou uma tela de loading

    return (
      <AuthContext.Provider value={{ setMemoryToken }}>
        <Slot />
      </AuthContext.Provider>
    );
}
