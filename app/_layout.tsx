import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthRedirector />
      <Slot />
    </AuthProvider>
  );
}

function AuthRedirector() {
  const { memoryToken, isAuthChecked } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthChecked) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!memoryToken && !inAuthGroup) {
      router.replace('/login');
    } else if (memoryToken && inAuthGroup) {
      router.replace('/');
    }
  }, [memoryToken, isAuthChecked, segments]);

  return null;
}