import { accessToken } from '../../variables/localStorage.jsx'
import { useState, useEffect } from 'react';

/**
 * GetData Hook to fetch data from the API using a url parameter and handle error/loading states
 * @param {string} url for GET requests
 * @returns {Object} containing the fetched data, loading and error states
 */
function GetData(url) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ throwError, setThrowError ] = useState(false);

    useEffect(() => {
        // API call function with try/catch blocks
        async function getData() {
            try {
                setLoading(true);
                setThrowError(false);

                // Make GET request
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify()
                })
        
                const result = await response.json();

                // Update states
                setData(result);
                setLoading(false);
            } catch(error) {
                // Update states
                setLoading(false);
                setThrowError(true);
            }
        }
        getData();
    }, [url])
    return { data, loading, throwError };
} 


export default GetData;
