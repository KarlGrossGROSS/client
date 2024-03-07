import { Spinner } from 'components/ui/Spinner';
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "../../helpers/api";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/profile.scss";
import {User} from "types";

const Profile = () => {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching user with userid ", userid);
                const response = await api.get(`/users/${userid}`);
                setUser(response.data);


            } catch (error) {
                console.error(`Error fetching user: ${handleError(error)}`);
                alert("Something went wrong while catching the user! See the console for more details");
            }
        }

        fetchData();
    }, [userid]);

    if (!user) {
        return <Spinner />;
    }
    const gotoEdit = () => {
        console.log("going to /game/profile/" + userid+"/edit");
        navigate(`/game/profile/${userid}/edit`, {state:{userid:userid}} );
    }


    return (
        <BaseContainer>
            <div className="game container">
                <div className="game user-list">
                    <h2>Profile of {user.username}</h2>
                    <div>
                        <div>Username: {user.username}</div>
                        <div>Status: {user.status}</div>
                        <div>Creation date: {user.creation_date}</div>
                        <div>Birthday: {user.birthday}</div>
                    </div>
                    <div className="register button-container">
                        <Button
                            disabled={localStorage.getItem("userId")!== userid}

                            width="100%"
                            onClick={() => gotoEdit()}
                        >
                            Edit
                        </Button>
                        <Button
                            width="100%"
                            onClick={() => navigate("/game")}
                        >
                            Return to Overview
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};
export default Profile;