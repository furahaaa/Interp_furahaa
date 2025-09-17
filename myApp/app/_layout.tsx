import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Configure Amplify for development and testing
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configure Amplify for all environments (including Expo Go for testing)
try {
    const { Amplify } = require('aws-amplify');
    const awsconfig = require('../aws-exports').default;
    Amplify.configure(awsconfig);
    console.log('✅ AWS Amplify configured successfully');
    console.log('📱 User Pool ID:', awsconfig.aws_user_pools_id);
    console.log('📱 App Client ID:', awsconfig.aws_user_pools_web_client_id);
} catch (error) {
    console.warn('⚠️ AWS Amplify configuration failed:', error);
    console.warn('💡 Make sure aws-exports.js is properly configured');
}

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
        'Outfit-Regular': require('@/assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Medium': require('@/assets/fonts/Outfit-Medium.ttf'),
        'Outfit-SemiBold': require('@/assets/fonts/Outfit-SemiBold.ttf'),
        'Outfit-Bold': require('@/assets/fonts/Outfit-Bold.ttf'),
        'Outfit-ExtraBold': require('@/assets/fonts/Outfit-ExtraBold.ttf'),
        'Outfit-Black': require('@/assets/fonts/Outfit-Black.ttf'),
        'Inter': require('@/assets/fonts/inter/Inter[opsz,wght].ttf'),
        // Ajout des polices manquantes
        'Poppins': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Black': require('@/assets/fonts/Poppins-Black.ttf'),
        'Readex-Pro': require('@/assets/fonts/ReadexPro-Regular.ttf'),
        'Readex-Pro-Medium': require('@/assets/fonts/ReadexPro-Medium.ttf'),
        'Readex-Pro-SemiBold': require('@/assets/fonts/ReadexPro-SemiBold.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="splash" options={{ headerShown: false }} />
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen name="inscription_tel" options={{ headerShown: false }} />
                <Stack.Screen name="verification_sms" options={{ headerShown: false }} />
                <Stack.Screen name="inscription_first" options={{ headerShown: false }} />
                <Stack.Screen name="inscription_mail" options={{ headerShown: false }} />
                <Stack.Screen name="create_password" options={{ headerShown: false }} />
                <Stack.Screen name="verification_email" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="inscription" options={{ headerShown: false }} />
                <Stack.Screen name="password_reset" options={{ headerShown: false }} />
                <Stack.Screen name="create_profil" options={{ headerShown: false }} />
                <Stack.Screen name="activation_location" options={{ headerShown: false }} />
                <Stack.Screen name="lieu" options={{ headerShown: false }} />
                <Stack.Screen name="new_account" options={{ headerShown: false }} />
                <Stack.Screen name="langue_source" options={{ headerShown: false }} />
                <Stack.Screen name="langue_signes" options={{ headerShown: false }} />
                <Stack.Screen name="account_fin" options={{ headerShown: false }} />
                <Stack.Screen name="create_account" options={{ headerShown: false }} />
                <Stack.Screen name="activation_notification" options={{ headerShown: false }} />
                <Stack.Screen name="dashboard_interp" options={{ headerShown: false }} />
                <Stack.Screen name="dashboard_interp_video" options={{ headerShown: false }} />
                <Stack.Screen name="langue_cible" options={{ headerShown: false }} />
                <Stack.Screen name="creation_comptePro" options={{ headerShown: false }} />
                <Stack.Screen name="creation_comptePro2" options={{ headerShown: false }} />
                <Stack.Screen name="creation_comptePro3" options={{ headerShown: false }} />
                <Stack.Screen name="creation_comptePro4" options={{ headerShown: false }} />
                <Stack.Screen name="homeInterpdistance" options={{ headerShown: false }} />
                <Stack.Screen name="cartInterpretation" options={{ headerShown: false }} />
                <Stack.Screen name="page_local" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
