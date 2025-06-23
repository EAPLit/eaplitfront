import { useState, useCallback } from 'react';

function useFetch<T>(url: string, options?: RequestInit) {
    const [data, setData] = useState<T | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (overrideOptions?: RequestInit) => {
        setLoading(true);
        //setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, { ...options, ...overrideOptions });
            console.log("This is the response from useFetch:", response);
            if (!response.ok) throw new Error(`Failed to fetch ${response.statusText}`);
            const result = await response.json();

            // Debugging
            console.log(`[useFetch] Fetched data from ${url}:`, result);
            // No need to warn about no data because sometimes there just isn't anything to return back from the database
            // if(!("data" in result)) {
            //     console.warn(`[useFetch] Warning: "data" field is missing in API response from ${url}`, result);
            // }
            console.log("✅ API Result:", result);
            console.log("✅ result.success:", result.success, typeof result.success);
            console.log("✅ result.message:", result.message, typeof result.message);
            setSuccess(result.success);
            setMessage(result.message);
            console.log("This is the message from the API:", result.message);
            setData(
                typeof result.data === 'string'
                ? JSON.parse(result.data)
                : (result.data ?? ({} as T))
            ); // allow data to be an empty object if it is missing
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    return { data, loading, success, message, error, sendRequest: fetchData };
}

export default useFetch;