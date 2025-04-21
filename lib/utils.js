import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function handleError(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isStrongPassword(password) {
    return password.length >= 6;
}