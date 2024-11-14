import React, { useContext } from "react";
import "./topbar.scss";
import { Person, Search, Chat, Notifications, List } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">The Yadav World</span>
        </Link>
      </div>
      <div className="center">
        <div className="searchBar">
          <Search className="icon" />
          <input type="text" className="Input" placeholder="Search ..."></input>
        </div>
      </div>
      <div className="right">
        <div className="tobarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
          <div className="item">
            <Person className="icon" />
            <span className="iconBadge">1</span>
          </div>
          <div className="item">
            <Chat className="icon" />
            <span className="iconBadge">2</span>
          </div>
          <div className="item">
            <Notifications className="icon" />
            <span className="iconBadge">1</span>
          </div>
          <div className="item">
            <List className="icon" />
          </div>
        </div>
        {/* <Link to={`/profile/${user.username}`}>
          <div className="avatar">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Topbar;
