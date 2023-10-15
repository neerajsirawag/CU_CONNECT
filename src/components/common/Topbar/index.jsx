import React, { useEffect, useState } from "react";
import cuLogo from "../../../assets/CU.png";
import user from "../../../assets/user.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";

import { FiSearch } from "react-icons/Fi";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { HiUsers } from "react-icons/Hi2";
import { BsBriefcaseFill , BsBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/Fa";

import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="cuconnect-Logo" src={cuLogo} alt="cuconnectlogo" />
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <FiSearch
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiFillHome
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <HiUsers
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/connections")}
          />
          <BsBriefcaseFill size={30} className="react-icon" />
          <AiFillMessage size={30} className="react-icon" />
          <BsBellFill size={30} className="react-icon" />
        </div>
      )}
      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
