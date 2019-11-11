import React, { useState, useEffect } from 'react'
import PostContext from '../contexts/PostContext';

export default function PostsProvider(props) {

    const [data, setData] = useState([]);

    const fetchData = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/`);

            if (!response.ok) {
                // setError(response.statusText);
            } else {
                const data = await response.json();
                setData(data);
                // setError(null);
            }

        } catch (e) {
            console.log(e);
            // setError(e);
        }
    };    

    useEffect(() => { 
        fetchData(); 
    }, []);

    return (
        <PostContext.Provider value={{data, fetchData}}>
            {props.children}
        </PostContext.Provider>
    )
}