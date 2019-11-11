import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import { Redirect } from 'react-router-dom';
import CrudModel from './CrudModel';


function findPostById(posts, id) {
    return posts.find(o => o.id === id);
}

export default function PostPage({match}) {

    const postId = match.params.id;
    const {data, fetchData} = useContext(PostContext);
    const [redirect, setRedirect] = useState(false);
    const post = findPostById(data, Number(postId));
    const [form, setForm] = useState({
        content: '',
    });

    useEffect(() => { 
        if (post) {
            setForm(prev => ({...prev, content: post.content}));
        }
    }, [post]);

    function handleClose() {
        setRedirect(true);
    }    

    const handleChange = evt => {
        const {name, value} = evt.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }
    
    const handleSubmit = evt => {
        evt.preventDefault();
        const note = new CrudModel(postId, form.content);

        //console.log(JSON.stringify(note));
        // onAdd(note);

        fetch(
            `${process.env.REACT_APP_API_URL}/posts/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }) 
        .then(response => {
            console.log('update & redirect...', note);
            fetchData();
            setRedirect(true);
        })  

    }  
    
    return (
        <>     
            {redirect && <Redirect to={`/posts/${postId}`} />}

            {post && <>
                        <button onClick={handleClose}>Закрыть</button>

                        <form onSubmit={handleSubmit}>
                            <label>Редактировать пост</label> <br />
                            <textarea name="content" rows="5" onChange={handleChange} value={form.content} /> <br />
                            <input type="submit" value="Опубликовать" />
                        </form>
                </>
            }
        </>
        
    );    

}