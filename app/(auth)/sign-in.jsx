import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/auth';
import { ArrowRight, Eye, EyeClosed, Lock, Mail } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

    const { signIn } = useAuth();
    const router = useRouter();
    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await signIn(email, password);

            if (error) {
                setError(error.message || 'Failed to sign in. Please check your credentials.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Sign in error:', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 p-6">
                    <Animated.View
                        className="items-center mt-12 mb-10"
                        entering={FadeIn.delay(200).duration(800)}
                    >
                        <View className="w-24 h-24 rounded-full bg-primary-500 items-center justify-center mb-4">
                            <Lock size={40} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
                        <Text className="text-gray-500 mt-2 text-center text-lg">Sign in to your account to continue</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(800)}>
                        {error && (
                            <View className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <Text className="text-red-700 text-sm">{error}</Text>
                            </View>
                        )}

                        <View className="mb-6">
                            <Text className="text-gray-700 mb-2 font-medium text-lg">Email</Text>
                            <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                                <Mail size={18} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-2 text-gray-900 text-lg"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="text-gray-700 mb-2 font-medium text-lg">Password</Text>
                            <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                                <Lock size={18} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-2 text-gray-900 text-lg"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!show}
                                />
                                {show ? (
                                    <Eye size={18} color="#6B7280" onPress={() => setShow(!show)} />
                                ) : (
                                    <EyeClosed size={18} color="#6B7280" onPress={() => setShow(!show)} />
                                )}
                            </View>
                        </View>

                        <TouchableOpacity
                            className="bg-primary-600 rounded-md py-3 items-center mb-4"
                            onPress={handleSignIn}
                            disabled={loading}
                            activeOpacity={0.5}
                        >
                            <View className="flex-row items-center justify-center bg-black/80 w-full py-3 rounded-md">
                                {loading ? (

                                    <ActivityIndicator color="white" size={24} />
                                ) : (
                                    <>
                                        <Text className="text-white font-medium mr-2 text-xl">Sign In</Text>
                                        <ArrowRight size={18} color="white" />
                                    </>

                                )}
                            </View>
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-gray-600 text-lg">Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
                                <Text className="text-primary-600 font-medium text-lg"> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}