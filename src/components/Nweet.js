import React, {useState} from "react";
import {dbService, storageService} from "../fBase";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {deleteObject, ref} from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Nweet = ({nweetObj, isOwner}) => {
    const NweetRef = doc(dbService, "nweets", `${nweetObj.id}`);
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            // delete nweet
            await deleteDoc(NweetRef);
            // delete storage
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
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
        <div className="nweet">
            <h2>{nweetObj.text}</h2>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input type="text"
                                   placeholder="edit your nweet"
                                   value={newNweet}
                                   required
                                   autoFocus
                                   onChange={onChange}
                                   className="formInput"
                            />
                            <input type="submit"
                                   value="Update Nweet"
                                   className="formBtn"
                            />
                        </form>
                        <span onClick={toggleEditing}
                              className="formBtn cancelBtn">
                            Cancle
                        </span>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                        {isOwner && (
                            <div className="nweet_actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </span>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Nweet;