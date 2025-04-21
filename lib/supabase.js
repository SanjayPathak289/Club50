import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eimiurlpzzxpnpkbgzre.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbWl1cmxwenp4cG5wa2JnenJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMTAzOTcsImV4cCI6MjA2MDc4NjM5N30.nwIqL4izoDDPKLYFkEPcbkn7X6UAkbK6BaPFwf51ylg";

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase URL or anon key. Please check your environment variables.');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || '', {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
}
);