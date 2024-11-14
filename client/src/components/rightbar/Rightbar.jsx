import React, { useEffect, useState } from 'react'
import './rightbar.scss';
import { Users } from '../../dummayData'
import Online from '../online/Online'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { Add, Remove } from '@mui/icons-material'

const axios = require('axios')
const Rightbar = ({ user }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(false);
    const { user: currentUser, dispatch } = useContext(AuthContext)

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/user/friends/" + user?._id);
                setFriends(friendList.data)
                console.log(friendList.data)
            } catch (err) {
                console.log(err)
            }
        };
        getFriends();
    }, [user?._id]);

    useEffect(() => {
        setFollowed(currentUser.following.includes(user?._id));
    }, [currentUser, user?._id])



    const followHandler = async () => {
        try {
            if (followed) {
                await axios.put("/user/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put("/user/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id })

            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed);
    }





    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}gift.png`} className='birthdayImg' alt="" />
                    <span className="birthdayTxt">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src={`${PF}ad.png`} alt="" className='AdImg' />
                <h4 className="Title">Online Friends</h4>
                <ul className="friendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}


                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username &&
                    <button className="followBtn" onClick={followHandler}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                }
                <h4 className="title">User Information</h4>
                <div className="Info">
                    <div className="infoItem">
                        <span className="infoKey">City:</span>
                        <span className="infoValue">{user.city}</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">From:</span>
                        <span className="infoValue">{user.from}</span>
                    </div>
                    <div className="infoItem">
                        <span className="infoKey">Relationship:</span>
                        <span className="infoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="title">User freinds</h4>
                <div className="followings">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                            <div className="following" >
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="followingImg" />
                                <span className="followingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}


                </div>
            </>
        )
    }


    return (
        <>
            <div className='rightbar'>
                <div className="wraper">
                    {user ? <ProfileRightbar /> : <HomeRightbar />}
                </div>
            </div>
        </>
    )
}

export default Rightbar