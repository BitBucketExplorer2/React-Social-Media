import React, { useEffect, useState } from 'react'
import './profile.scss'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useParams } from 'react-router'


const Profile = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const username = useParams().username;

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="rightSection">
                    <div className="topCover">
                        <div className="profileCover">
                            <img className='coverImg' src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.jpg"} alt="" />
                            <img className='userImg' src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='nameTxt'>{user.username}</h4>
                            <span className='descTxt'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="bottomCover">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>

        </>
    )
}

export default Profile