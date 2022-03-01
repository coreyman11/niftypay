import React, { useEffect, useRef, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const state = useState<T>(() => {
        try {
            const value = localStorage.getItem(key);
            if (value) return JSON.parse(value) as T;
        } catch (error) {
            console.error(error);
        }

        return defaultState;
    });
    const value = state[0];

    const rendered = useRef(false);
    useEffect(() => {
        if (!rendered.current) {
            rendered.current = true;
            return;
        }

        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(error);
        }
    }, [key, value]);

    return state;
}
