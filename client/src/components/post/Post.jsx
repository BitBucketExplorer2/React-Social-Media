import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './post.scss'
import { MoreVert } from '@mui/icons-material'
import axios from 'axios';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext'
const Post = ({ post }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});

    const { user: currentUser } = useContext(AuthContext)

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);


    const likeHandler = () => {
        try {
            axios.put("/post/" + post._id + "/like", { userId: currentUser._id })

        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked);
    }


    return (
        <div className='post'>
            <div className="wraper">
                <div className="top">
                    <div className="left">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className='profileImg' />
                        </Link>
                        <span className="userName">{user.username}</span>
                        <span className="postTime">{format(post.createdAt)}</span>

                    </div>
                    <div className="right">
                        <MoreVert className='icon' />
                    </div>
                </div>
                <div className="center">
                    <span className="postTxt">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className='postImg' />
                </div>
                <div className="bottom">
                    <div className="left">
                        <img className='likeIcon' src={`${PF}like.png`} alt="" onClick={likeHandler} />
                        <img className='likeIcon' src={`${PF}heart.png`} alt="" onClick={likeHandler} />
                        <span className="likeCounter">{like} people liked</span>
                    </div>
                    <div className="right">
                        <span className='postComment'> {post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post