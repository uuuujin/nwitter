import React, {useEffect, useState} from "react";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    getFirestore
} from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(
            collection(getFirestore(), "nweets"),
            orderBy("createdAt")
        );
        onSnapshot(q, snapshot => {
            const arr = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setNweets(arr);
        });
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home;
