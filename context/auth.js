import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
    session: null,
    initialized: false,
    signIn: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
});

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error('Error getting session:', error);
            }
            setSession(session);
            setInitialized(true);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return { error };
        } catch (error) {
            return { error };
        }
    };

    const signUp = async (email, password) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,

            });
            return { error };
        } catch (error) {
            return { error };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            return { error };
        } catch (error) {
            return { error };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                initialized,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);