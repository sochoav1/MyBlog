// frontend/src/components/EditPost.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditPost({ postId, onPostUpdated }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${postId}`)
            .then(response => {
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
            })
            .catch(error => {
                console.error("Error fetching the post!", error);
            });
    }, [postId]);

    const handleUpdate = () => {
        axios.put(`http://localhost:5000/posts/${postId}`, { title, content })
            .then(() => {
                alert('Post updated successfully!');
                onPostUpdated();
            })
            .catch(error => {
                console.error("Error updating the post!", error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Edit Post</h2>
            <div className="mb-3">
                <label className="form-label">Title:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Content:</label>
                <textarea 
                    className="form-control" 
                    rows="5" 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                />
            </div>
            <button className="btn btn-success" onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default EditPost;
