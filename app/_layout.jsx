import React, { useEffect } from 'react'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { useFonts } from 'expo-font';
import { AuthProvider, useAuth } from '../context/auth';
import { StatusBar } from 'expo-status-bar';
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
    const { session, initialized } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!initialized) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!session && !inAuthGroup) {
            router.replace('/sign-in');
        } else if (session && inAuthGroup) {
            router.replace('/');
        }
    }, [session, initialized, segments]);

    if (!initialized) return null;

    return <Slot />;
}
const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "chesnagrotesk-medium": require("../assets/fonts/chesnagrotesk-medium.otf"),
        "ChesnaGrotesk-Bold": require("../assets/fonts/ChesnaGrotesk-Bold.ttf")
    });
    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error])
    if (!fontsLoaded && !error) return null;

    return (
        <AuthProvider>
            <InitialLayout />
            <StatusBar style="auto" />
        </AuthProvider>
    )
}

export default RootLayout