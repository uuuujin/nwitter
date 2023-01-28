import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    serverTimestamp,
    getFirestore
}
    from "firebase/firestore";
import {ref, uploadString} from "@firebase/storage";
import {dbService, storageService} from "../fBase";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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

    const onSubmit = async (e) => {
        e.preventDefault();
        /*await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: serverTimestamp(),
            createrId: userObj.uid
        });
        setNweet("");*/
        const fileRef =
            ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        /*
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attachment, "data_url");
        */
        console.log(response);


    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };

    const onFileChange = (e) => {
        const {
            target : {files},
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment(null)

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                       value={nweet}
                       onChange={onChange}
                       placeholder="what's on you maid?"
                       maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment }>Clear</button>
                    </div>
                }
            </form>
            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createrId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home;
