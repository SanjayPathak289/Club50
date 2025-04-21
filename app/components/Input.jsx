import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { cn } from '../../lib/utils';

export default function Input({
    label,
    error,
    icon,
    className,
    containerClassName,
    ...props
}) {
    return (
        <View className={cn('mb-4', containerClassName)}>
            {label && (
                <Text className="text-gray-700 mb-2 font-medium">{label}</Text>
            )}

            <View
                className={cn(
                    'flex-row items-center border rounded-md px-3 py-2 bg-gray-50',
                    error ? 'border-red-500' : 'border-gray-300',
                    className
                )}
            >
                {icon && <View className="mr-2">{icon}</View>}

                <TextInput
                    className="flex-1 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                    {...props}
                />
            </View>

            {error && (
                <Text className="text-red-500 text-sm mt-1">{error}</Text>
            )}
        </View>
    );
}