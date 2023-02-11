import React, {useEffect} from "react";
import {dbService, authService} from "../fBase";
import {useHistory} from "react-router-dom";
import {collection, query, getDocs, where, orderBy} from "firebase/firestore";

export default ({userObj}) => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        // const nweets = await dbService
        //     .collection("nweets")
        //     .where("creatorId",  "==", userObj.uid)
        //     .get();

        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", `${userObj.uid}`),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });

    };

    useEffect(() => {
        getMyNweets();
    },[]);
    return (
        <>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    )
};
