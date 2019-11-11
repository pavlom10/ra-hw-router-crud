import {useState, useEffect} from 'react';

export default function useJsonFetch(url, opts) { 

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { 

        const fetchData = async () => {

            setLoading(true);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    setError(response.statusText);
                } else {
                    const data = await response.json();
                    setData(data);
                    setError(null);
                }

            } catch (e) {
                console.log(e);
                // setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();        

    }, [url]);

    return [data, loading, error]; 
}