import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { cn } from '../../lib/utils';

export default function Button({
    variant = 'primary',
    loading = false,
    children,
    className,
    textClassName,
    disabled,
    ...props
}) {
    const variantClasses = {
        primary: 'bg-primary-600 active:bg-primary-700',
        secondary: 'bg-secondary-500 active:bg-secondary-600',
        outline: 'bg-transparent border border-gray-300 active:bg-gray-100',
        ghost: 'bg-transparent active:bg-gray-100',
    };

    const textVariantClasses = {
        primary: 'text-white',
        secondary: 'text-white',
        outline: 'text-gray-800',
        ghost: 'text-gray-800',
    };

    return (
        <TouchableOpacity
            className={cn(
                'rounded-md py-3 px-4 justify-center items-center',
                variantClasses[variant],
                disabled || loading ? 'opacity-50' : 'opacity-100',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? '#4B5563' : 'white'}
                />
            ) : (
                <View className="flex-row items-center justify-center">
                    <Text
                        className={cn(
                            'font-medium text-base',
                            textVariantClasses[variant],
                            textClassName
                        )}
                    >
                        {children}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}