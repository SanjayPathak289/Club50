import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../context/auth';
import { LogOut, User } from 'lucide-react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import "../global.css"
export default function Home() {
    const { session, signOut } = useAuth();
    const userEmail = session?.user?.email || 'user';
    const firstName = userEmail.split('@')[0];

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 mt-6">
            <Animated.View
                className="flex-1 p-6"
                entering={FadeIn.delay(200).duration(700)}
            >
                <View className="flex-row justify-between items-center mb-8">
                    <Text className="text-3xl font-bold text-gray-800">Home</Text>

                    <TouchableOpacity
                        className="bg-gray-100 p-2 rounded-full"
                        onPress={handleSignOut}
                    >
                        <LogOut size={28} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <Animated.View
                    className="bg-white rounded-xl p-6 shadow-sm mb-6"
                    entering={FadeInUp.delay(200).duration(800)}
                >
                    <View className="items-center mb-4">
                        <View className="w-16 h-16 rounded-full bg-primary-100 items-center justify-center mb-2">
                            <User size={30} color="#8B5CF6" />
                        </View>
                    </View>

                    <View>
                        <Text className="text-center text-3xl font-bold text-gray-800 mb-2">
                            Hi, {firstName}!
                        </Text>
                        <Text className="text-center text-gray-500">
                            Welcome to your dashboard.
                        </Text>
                    </View>
                </Animated.View>

            </Animated.View>
        </SafeAreaView>
    );
}