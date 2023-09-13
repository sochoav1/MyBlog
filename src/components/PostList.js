////Import main libs
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditPost from './EditPost';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);

    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error("Error fetching the posts!", error);
            });
    }, []);

    const handleDelete = (postId) => {
        axios.delete(`http://localhost:5000/posts/${postId}`)
            .then(() => {
                // Update the list of posts after deletion
                setPosts(posts.filter(post => post.id !== postId));
            })
            .catch(error => {
                console.error("Error deleting the post!", error);
            });
    };

    const handleEditClick = (postId) => {
        setEditingPostId(postId);
    };

    const handlePostUpdated = () => {
        setEditingPostId(null);
        // Refetch the posts
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error("Error fetching the posts!", error);
            });
    };

    return (
        <div>
            <h2>Posts</h2>
            {editingPostId ? (
                <EditPost postId={editingPostId} onPostUpdated={handlePostUpdated} />
            ) : (
                posts.map(post => (
                    <div key={post.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                            <button className="btn btn-primary" onClick={() => handleEditClick(post.id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PostList;
