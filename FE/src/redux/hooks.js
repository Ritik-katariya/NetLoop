import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useDebounced = ({ searchQuery, delay }) => {
    const [debouncedValue, setDebouncedValue] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [searchQuery, delay]);

    return debouncedValue;
}

export const useEmail = () => {
    return useSelector((state) => state.email.email);
};