import React, {useEffect, useState} from "react";
import {collection, addDoc, getDocs, query, serverTimestamp} from "firebase/firestore"
import {dbService} from "../fBase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const q = query(collection(dbService,"nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObject = {
                ...doc.data(),// spread attribute 기능 doc.data()를 가져와서 풀어내는 것
                id : doc.id,
            };
            // 모든 이전 nweets에 대해, 배열을 리턴 할 것인데,
            // 그 배열은 새로 작성한 트윗과 그 이전것들이다.
            setNweets(prev => [nweetObject, ...prev]);
            // 가끔 set이 붙는 함수를 쓸 때,
            // 값 대신에 함수를 전달 할수 있음.
            // 그리고 만약 함수를 전달하면 리액트는 이전 값에 접근 할 수 있게 해줌.
            // dbNweets안에 있는 모든 document 에 대해
            // (setNweet 에서 ) 함수를 사용하고 있는데,
            // 리턴하는 것은 배열임. (=> implicit return)
            // [doc.data(), ...prev] 요 배열에서 첫 번째 요소는 가장 최근 document이고
            // 그 뒤로 이전 document를 붙임 -> ...prev
        });
    }
    useEffect(() => {
        getNweets();
    }, []);

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
    console.log(nweets)
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
            <div>
                {nweets.map(nweet => (
                    <div key={nweet.id}>
                        <h2>{nweet.nweet}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home;
