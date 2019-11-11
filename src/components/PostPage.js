import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import { Redirect } from 'react-router-dom';


function findPostById(posts, id) {
    return posts.find(o => o.id === id);
}

export default function PostPage({match}) {

    const {data, fetchData} = useContext(PostContext);
    // const post = null;

    const [redirect, setRedirect] = useState(false);

    const post = findPostById(data, Number(match.params.id));

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            fetchData();
            setRedirect(true);
        }); 
    }

    console.log('loading post data...');

    return (
        <>     
            {redirect && <Redirect to='/' />}

            {post && <>
                        <div className="post">
                            {post.id} <br />
                            {post.content}
                        </div>

                        <Link to={`/posts/${post.id}/edit`}>Изменить</Link>
                        <button onClick={() => handleDelete(post.id)}>Удалить</button>
                </>
            }
        </>
        
    );    

}