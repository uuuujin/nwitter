import React from "react";

const Nweet = ({nweetObj, isOwner}) => (
    <div>
        <h2>{nweetObj.text}</h2>
        {isOwner && (
        <>
            <button>delete</button>
            <button>edit</button>
        </>)}
    </div>
);

export default Nweet;