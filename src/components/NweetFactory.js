import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {dbService, storageService} from "../fBase";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        let attachmentUrl = '';
        if (attachment !== "") {
            const attachmentRef =
                ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }

        const nweetObj = {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await addDoc(collection(dbService, "nweets"),nweetObj);
        setNweet("");
        setAttachment( "");
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

    const onClearAttachment = () => setAttachment("");

    return (
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
    )
}

export default NweetFactory;