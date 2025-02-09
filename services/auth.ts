
// authOnAppLoad receives a public key from the server
// to prepare for encryption
export async function authOnAppLoad(): Promise<any> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/public-key`, {
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error with authorization on app load", error);
        return null;
    }
}