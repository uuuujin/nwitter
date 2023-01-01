import React, {useState} from "react";
import {collection, addDoc, serverTimestamp} from "firebase/firestore"
import {dbService} from "../fBase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt:serverTimestamp(),
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
    /*event 로 부터 라는 의미, 즉 event안에 있는 target 안에 있는
     value를 달라고 하는 것.
    * */
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
        </div>
    )
}
export default Home;
