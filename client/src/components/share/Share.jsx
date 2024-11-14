import React, { useContext, useRef } from 'react'
import './share.scss'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
const axios = require('axios');

const Share = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);


    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData();
            // const fileName = Date.now() + '_' + file.name;
            const fileName = file.name;

            data.append("file", file);
            data.append("name", fileName)
            newPost.img = fileName;
            try {

                await axios.post("/upload", data)
            } catch (error) {
                console.log(error)
            }
        }

        try {

            await axios.post("post", newPost);
            window.location.reload()
        } catch (error) {

        }
    }



    return (
        <div className='share'>
            <div className="wraper" >
                <div className="top">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className='Img' />
                    <input type="text" placeholder={"What's in your mind " + user.username + " ? "} className='txtInput' ref={desc} />
                </div>
                <hr />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" />
                        <Cancel className='icon' onClick={() => setFile(null)} />
                    </div>
                )}

                <form className="bottom" onSubmit={submitHandler}>
                    <div className="options">
                        <label htmlFor='file' className="option">
                            <PermMedia htmlColor='tomato' className='icon' />
                            <span className="optionText">Photos or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />

                        </label>
                        <div className="option">
                            <Label htmlColor='blue' className='icon' />
                            <span className="optionText">Tag</span>
                        </div>
                        <div className="option">
                            <Room htmlColor='green' className='icon' />
                            <span className="optionText">Location</span>
                        </div>
                        <div className="option">
                            <EmojiEmotions htmlColor='goldenrod' className='icon' />
                            <span className="optionText">Feelings</span>
                        </div>
                    </div>


                    <button className='shareButton' type='submit'>share</button>

                </form>
            </div>
        </div>

    )
}

export default Share