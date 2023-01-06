import React, {useEffect, useState} from "react";
import {collection,
        onSnapshot,
        addDoc,
        query,
        orderBy,
        serverTimestamp,
        getFirestore
}
from "firebase/firestore";
import {dbService} from "../fBase";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(
            collection(getFirestore(),"nweets"),
            orderBy("createdAt")
        );
        onSnapshot(q, snapshot => {
            const arr = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id : doc.id
            }));
            setNweets(arr);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt:serverTimestamp(),
            createrId : userObj.uid
        });
        setNweet("");
    };

    const onChange = (event) => {
        const {target : {value} } = event;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                       value={nweet}
                       onChange={onChange}
                       placeholder="what's on you maid?"
                       maxLength={120}/>
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <div key={nweet.id}>
                        <h2>{nweet.text}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home;
