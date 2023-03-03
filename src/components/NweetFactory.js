import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {dbService, storageService} from "../fBase";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        if (nweet === "") {
          return;
        }

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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input type="text"
                       value={nweet}
                       onChange={onChange}
                       placeholder="what's on you maid?"
                       maxLength={120}
                       className="factoryInput__input"
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                  opacity: 0,
                }}
            />
            {attachment &&
                <div className="factoryForm__attachment">
                    <img src={attachment}
                         style={{
                          backgroundImage: attachment,
                        }}
                         alt="img"
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            }
        </form>
    )
}

export default NweetFactory;