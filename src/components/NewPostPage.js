import React, { useState, useContext } from 'react';
import PostContext from '../contexts/PostContext'
import CrudModel from './CrudModel';
import { Redirect } from 'react-router-dom';

export default function NewPostPage(props) {
    
    const [form, setForm] = useState({
        content: '',
    });

    const [redirect, setRedirect] = useState(false);
    
    const {fetchData} = useContext(PostContext);

    const handleChange = evt => {
        const {name, value} = evt.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }
    
    const handleSubmit = evt => {
        evt.preventDefault();
        const note = new CrudModel(0, form.content);

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
            // console.log('redirecting...');
            fetchData();
            setRedirect(true);
        })  

    }    

    function handleClose() {
        setRedirect(true);
    }

    return (
        <>
            {redirect && <Redirect to='/' />}

            <button onClick={handleClose}>Закрыть</button>

            <form onSubmit={handleSubmit}>
                <label>Новый пост</label> <br />
                <textarea name="content" rows="5" onChange={handleChange} value={form.content} /> <br />
                <input type="submit" value="Опубликовать" />
            </form>
        </>
    )
}