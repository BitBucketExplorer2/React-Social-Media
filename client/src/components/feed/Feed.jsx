import React, { useState } from 'react'
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
const Feed = ({ username }) => {
    const [posts, setPostes] = useState([]);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("/post/profile/" + username)
                : await axios.get("/post/timeline/" + user._id)
            setPostes(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        }
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className='feed'>
            <div className="wraper">
                {/* {username ? username === user.username && <Share /> : <Share />} */}
                {/* OR */}
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}

export default Feed