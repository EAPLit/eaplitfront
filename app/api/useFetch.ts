import { useState, useEffect, useCallback } from 'react';

function useFetch<T>(url: string, options?: RequestInit, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Failed to fetch ${response.statusText}`);
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options), ...dependencies]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export default useFetch;