import { Spinner } from 'components/ui/Spinner';
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "../../helpers/api";
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const FormField = props => {
    console.log(props);
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="register input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const EditProfile = () => {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`/users/${userid}`);
                setUser(response.data);
            } catch (error) {
                console.error(`Error fetching user: ${handleError(error)}`);
            }
        }
        fetchData();
    }, [userid]);

    if (!user) {
        return <Spinner />;
    }

    async function save() {
        try {
            const token = localStorage.getItem("token");
            console.log(token)
            console.log(userid)
            const requestBody = JSON.stringify({username, birthday});
            await api.put(`/users/${userid}`, requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(userid);
            navigate(`/game/profile/${userid}`);
        } catch (error) {
            console.error(`Error editing user: ${handleError(error)}`);
        }
    }


    return (
        <BaseContainer className="game container">
            <h1>Profile Page</h1>
            <div className="user-profile">
                <h2>Edit Profile</h2>
                <FormField
                    label="Username"
                    value={username}
                    onChange={(un) => setUsername(un)}
                />
                <FormField
                    label="Birthday (YYYY-MM-DD)"
                    value={birthday}
                    onChange={(un) => setBirthday(un)}
                />
            </div>
            <div className='button-container'>
                <Button
                    width="100%"
                    onClick={() => save()}
                    disabled={!username && !birthday}
                >
                    Save
                </Button>
                <Button
                    width="100%"
                    onClick={() => navigate("/game")}
                >
                    Back to Overview
                </Button>
            </div>
        </BaseContainer>
    );
};

export default EditProfile;
