import React, {useState} from "react";
import {dbService} from "../fBase";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";

const Nweet = ({nweetObj, isOwner}) => {
    const NweetRef = doc(dbService, "nweets", `${nweetObj.id}`);
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            deleteDoc(NweetRef);
            // delete
        }
    }
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(NweetRef, {
            text : newNweet,
        })
        setEditing(false);
    }
    const onChange = (e) => {
        const {
            target: {value},
        } = e;
        setNewNweet(value);
    }
    return (
        <div>
            <h2>{nweetObj.text}</h2>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text"
                                   placeholder="edit your nweet"
                                   value={newNweet}
                                   required
                                   onChange={onChange}/>
                            <input type="submit" value="Update Nweet"/>
                        </form>
                        <button onClick={toggleEditing}>cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && (
                            <>
                                <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>
                            </>
                        )}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>delete</button>
                                <button onClick={toggleEditing}>edit</button>
                            </>
                        )}
                    </>
                )

            }
        </div>
    );
};

export default Nweet;