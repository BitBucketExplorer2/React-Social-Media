import React, { useContext } from 'react'
import './messenger.scss'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { useRef } from 'react'
import { io } from 'socket.io-client'
const Messenger = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useContext(AuthContext);

    const scrolRef = useRef();


    useEffect(() => {
        setSocket(io("ws://localhost:8900"))
    }, [])

    /**
     * Get Conversation
     */
    useEffect(() => {

        const getConversation = async () => {
            try {
                const res = await axios.get('/conversation/' + user._id)
                setConversations(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getConversation()
    }, [user._id])

    /**
     * Get Messages
     */
    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get("/message/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getMessage()
    }, [currentChat])


    /**
     * Add New Message
     */
    const handleClick = async (e) => {
        e.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage
        }

        try {
            const res = await axios.post("/message", message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrolRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])



    return (
        <>
            <Topbar />
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="wraper">
                        <div className='top'>
                            <input type="text" className='searchInput' placeholder='Search for friends...' />
                        </div>
                        <div className="convContainer">
                            {conversations.map((conv) => (
                                <div onClick={() => setCurrentChat(conv)}>
                                    <Conversation conversation={conv} currentUser={user} key={conv._id} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="chatBox">
                    <div className="wraper">
                        {
                            currentChat ? (<>

                                <div className="top">
                                    {messages.map((m) => (
                                        <div ref={scrolRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="bottom">
                                    <textarea placeholder='write somthing here....' className='textMsg' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                    <button className='sendBtn' onClick={handleClick}>Send</button>
                                </div>

                            </>) : (
                                <spna className="noCoversation">Open a conversation to start a chat ...</spna>
                            )}
                    </div>
                </div>
                <div className="chatOnlineBox">
                    <div className="wraper">
                        <ChatOnline />

                    </div>
                </div>
            </div>
        </>

    )
}

export default Messenger