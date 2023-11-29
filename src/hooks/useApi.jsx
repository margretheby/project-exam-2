import { useState, useEffect } from "react";

function useApi(url) {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ throwError, setThrowError ] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                setThrowError(false);

                const response = await fetch(url);
                const result = await response.json();

                setData(result);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                setThrowError(true);
            }
        }
        getData();
        
    }, [url]);

    return { data, loading, throwError };
}

export default useApi;