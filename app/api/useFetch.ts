import { useState, useEffect, useCallback } from 'react';

function useFetch<T>(url: string, options?: RequestInit, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Failed to fetch ${response.statusText}`);
            const result = await response.json();

            // Debugging
            console.log(`[useFetch] Fetched data from ${url}:`, result);
            // No need to warn about no data because sometimes there just isn't anything to return back from the database
            // if(!("data" in result)) {
            //     console.warn(`[useFetch] Warning: "data" field is missing in API response from ${url}`, result);
            // }
            setSuccess(result.success);
            setMessage(result.message);
            setData(result.data ?? ({} as T)); // allow data to be an empty object if it is missing
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options), ...dependencies]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, success, message, error, refetch: fetchData };
}

export default useFetch;