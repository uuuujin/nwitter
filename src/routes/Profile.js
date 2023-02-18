import React, {useEffect, useState} from "react";
import {dbService, authService} from "../fBase";
import {useHistory} from "react-router-dom";
import {collection, query, getDocs, where, orderBy} from "firebase/firestore";
import {updateProfile} from 'firebase/auth';

export default ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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

    const onChange = (e) => {
        const {
            target : {value},
        } = e;
        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        /*아무것도 변경하지 않았을땐 submit 안되게*/
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser,
                {displayName: newDisplayName}
            );
            refreshUser();
        }
    };
    return (
        <>
            <div className="container">
                <form onSubmit={onSubmit} className="profileForm">
                    <input
                        onChange={onChange}
                        type="text"
                        autoFocus
                        placeholder="Display name"
                        value={newDisplayName}
                        className="formInput"
                    />
                    <input type="submit"
                           value="Update Profile"
                           className="formBtn"
                           style={{
                               marginTop: 10,
                           }}
                    />
                </form>
                <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
                    Log Out
                </span>
            </div>
        </>
    )
};
