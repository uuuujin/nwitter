import React, {useEffect} from "react";
import {authService} from "../fBase";
import {useHistory} from "react-router-dom";

export default ({userObj}) => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        //const nweets = await
    };

    useEffect(() => {

    });
    return (
        <>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    )
};
