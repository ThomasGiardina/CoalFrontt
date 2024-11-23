import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Profilepicture = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileImage = useSelector((state) => state.auth.profileImage);
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="profile"
                        src={profileImage || "https://www.vecteezy.com/free-vector/default-user"} 
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[9999] mt-3 w-52 p-2 shadow"
            >
                <li>
                    <Link to="/Settings">Settings</Link>
                </li>
                <li>
                    <a onClick={handleLogout}>Logout</a>
                </li>
            </ul>
        </div>
    );
};

export default Profilepicture;
