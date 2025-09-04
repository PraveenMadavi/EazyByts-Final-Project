import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { User, ChevronDown, LogOut, Mail } from "lucide-react";
import { useNews } from "./NewsContext";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

function UserProfile() {
    const { user_name, userEmail, setUser_Name, setUserEmail } = useNews();
    const BaseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!user_name || user_name.trim() === "") {
            navigate("/");
        }
    }, [user_name, navigate]);


    console.log("User_name >> ", user_name)
    const handleLogOut = async () => {
        try {
            const res = await axios.post(`${BaseURL}/user/logout`, {
                withCredentials: true,
            });
            console.log("User Logged out >> ");
            setUserEmail('');
            setUser_Name('');
            setIsDropdownOpen(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Get user initials for avatar
    const getUserInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            : 'U';
    };

    return (
        <div className="user-profile-container" ref={dropdownRef}>
            {/* Profile Toggle Button */}
            <button
                className="profile-toggle-btn"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
            >
                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar">
                        {getUserInitials(user_name)}
                    </div>
                    {/* <div className="online-status-dot"></div> */}
                </div>

                <span className="profile-username">
                    {user_name || "User"}
                </span>

                <ChevronDown
                    className={`profile-chevron ${isDropdownOpen ? 'rotated' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            <div className={`profile-dropdown ${isDropdownOpen ? 'open' : 'closed'}`}>
                {/* User Information Header */}
                <div className="profile-header">
                    <div className="profile-info-wrapper">
                        <div className="profile-large-avatar">
                            {getUserInitials(user_name)}
                        </div>

                        <div className="profile-user-details">
                            <div className="profile-name-section">
                                <User className="profile-icon-sm" />
                                <h3 className="profile-display-name">
                                    {user_name || "User"}
                                </h3>
                            </div>
                            <div className="profile-email-section">
                                <Mail className="profile-icon-sm" />
                                <p className="profile-email-text">
                                    {userEmail || "user@example.com"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Actions */}
                <div className="profile-menu-actions">
                    <button
                        className="profile-menu-item"
                        onClick={() => {
                            setIsDropdownOpen(false);
                            // Add your profile view navigation here
                            // navigate("/profile");
                        }}
                    >
                        <User className="profile-menu-icon" />
                        <span className="profile-menu-text">View Profile</span>
                    </button>

                    <button
                        className="profile-menu-item logout-menu-item"
                        onClick={handleLogOut}
                    >
                        <LogOut className="profile-menu-icon logout-icon" />
                        <span className="profile-menu-text logout-text">Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;