import React from 'react'
import './closeFriend.scss'
const ClosedFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='closeFriend'>
            <li className="item">
                <img src={PF + user.profilePicture} alt="" className='itemImg' />
                <span className='itemText'>{user.username}</span>
            </li>
        </div>
    )
}

export default ClosedFriend