import React from 'react'
import './sidebar.scss';
import { HelpOutline, WorkOutline, Event, School, Bookmark, Group, PlayCircleFilledOutlined, Chat, RssFeed } from '@mui/icons-material';
import { Users } from '../../dummayData'
import ClosedFriend from '../closeFriend/ClosedFriend';
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>

            <div className="top">
                <ul>
                    <li className='item'>
                        <RssFeed className='icon' />
                        <span>Feed</span>
                    </li>
                    <Link to="/messenger" style={{ textDecoration: 'none' }}>
                        <li className='item'>
                            <Chat className='icon' />
                            <span>Chats</span>
                        </li>
                    </Link>

                    <li className='item'>
                        <PlayCircleFilledOutlined className='icon' />
                        <span>Videos</span>
                    </li>
                    <li className='item'>
                        <Group className='icon' />
                        <span>Groups</span>
                    </li>
                    <li className='item'>
                        <Bookmark className='icon' />
                        <span>Bookmarks</span>
                    </li>
                    <li className='item'>
                        <HelpOutline className='icon' />
                        <span>Questions</span>
                    </li>
                    <li className='item'>
                        <WorkOutline className='icon' />
                        <span>Jobs</span>
                    </li>
                    <li className='item'>
                        <Event className='icon' />
                        <span>Events</span>
                    </li>
                    <li className='item'>
                        <School className='icon' />
                        <span>Courses</span>
                    </li>
                </ul>
            </div>
            <div className="center">
                <button>Show More</button>
                <hr />
            </div>
            <div className="bottom">
                <ul>
                    {Users.map((u) => (
                        <ClosedFriend key={u.id} user={u} />
                    ))}

                </ul>
            </div>


        </div>
    )
}

export default Sidebar