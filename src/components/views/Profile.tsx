import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import { apiWithAuth, handleError } from "helpers/api";
import User from "models/User";
import PropTypes from "prop-types";


const EditableProfile = ({ user, setUser, setInEditMode }) => {
    const [birthday, setBirthday] = useState(user.birthday);
    const [username, setUsername] = useState(user.username);

    const handleClick = async () => {
        try {
            const requestBody = JSON.stringify({
                username: username,
                birthday: birthday,
            });
            const token = localStorage.getItem("token");
            const response = await apiWithAuth(token).put(
                `/users/${user.id}`,
                requestBody
            );
            setUser(response.data);
            setInEditMode(false);
        } catch (error) {
            alert(`Could not change user Data \n${handleError(error)}`);
        }
    };

    return (
        <div>
            <div className="login field">
                <label className="login label">{"Username"}</label>
                <input
                    className="login input"
                    placeholder="enter here.."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="login field">
                <label className="login label">{"Birthday"}</label>
                <input
                    className="login input"
                    placeholder="enter here.."
                    type="date"
                    value={birthday === null ? "" : birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </div>
            <Button
                disabled={user.username === username && user.birthday === birthday}
                style={{ marginBottom: "5px" }}
                onClick={() => handleClick()}
            >
                Save Changes
            </Button>
        </div>
    );
};