import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './conversation.scss'

const Conversation = ({ conversation, currentUser }) => {

    const [user, setUser] = useState()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {

        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const getUserFriend = async () => {
            try {
                const res = await axios.get("/user?userId=" + friendId);
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUserFriend()
    }, [currentUser, conversation])

    return (
        <div className='conversation'>
            <img src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className='convImg' />
            <span className='convTxt'>{user?.username}</span>
        </div>
    )
}

export default Conversation