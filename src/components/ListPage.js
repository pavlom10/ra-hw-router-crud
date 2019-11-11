import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

export default function ListPage() {

    const {data} = useContext(PostContext);

    return (
        <>
            <Link to='/posts/new'>Создать пост</Link>
            
            {data && 
                data.map(item =>
                    <div className="post" key={item.id}>
                        <Link to={`/posts/${item.id}`}>
                            {item.content}
                        </Link>
                    </div>
                )
            }
        </>
    )
}