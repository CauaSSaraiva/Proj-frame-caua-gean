// app/_layout.tsx
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "./utils/auth"; // sua função com AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function checkLogin() {
      const token = await getToken();
      setLoggedIn(!!token);
      setAuthChecked(true);
    }

    if (__DEV__) {
      AsyncStorage.setItem("auth_token", "fake-token");
    }
    checkLogin();
  }, []);

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

  return <Slot />;
}
