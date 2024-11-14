import React from 'react'
import './online.scss'
const Online = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='online'>
            <li className="friend">
                <div className="friendProfile">
                    <img src={PF + user.profilePicture} className='friendImg' alt="" />
                    <span className="friendOn"></span>
                </div>
                <span className="userName">{user.username}</span>
            </li>
        </div>
    )
}

export default Online