import React, {useEffect, useState} from "react";
import {collection,
        onSnapshot,
        addDoc,
        getDocs,
        query,
        orderBy,
        serverTimestamp}
from "firebase/firestore";
import {dbService} from "../fBase";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {
    //      const q = query(
    //         collection(dbService,"nweets"),
    //         orderBy("createAt")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObject = {
    //             ...doc.data(),// spread attribute 기능 doc.data()를 가져와서 풀어내는 것
    //             id : doc.id,
    //         };
    //         setNweets(prev => [nweetObject, ...prev]);
    //     });
    //
    // }

    useEffect(() => {
        //getNweets();
        // collection(dbService, "nweets").onSnapshot(q, querySnapshot => {
        //     console.log("something happend -read, update, delete all ")
        // });
        const q = query(
            collection(dbService,"nweets"),
            orderBy("createAt")
        );
        onSnapshot(q, (snapshot) => {
            const arr = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id : doc.id
            }));
            console.log(arr)
            setNweet(arr);
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
        // dbService.collection("nweets").add({
        //     nweet,
        //     createdAt : Date.now()
        // });
    };
    const onChange = (event) => {
        const {target : {value} } = event;
        setNweet(value);
    };
    /*event 로 부터 라는 의미, 즉 event 안에 있는 target 안에 있는
     value를 달라고 하는 것.
    */
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
