import React from 'react'

const Comment = ({comment,date,typerName,cheminImage}) => {
    /*"./icons/983249.jpg"*/
    return (
        <div className="commentCard">
                <img src={cheminImage} className="photoUser" alt="user photo profil"/>
                <h2 className="typerName">{typerName}</h2>
                <p className="datePost">{date}</p>
                <p className="txtComment">{comment}</p>
        </div>
    )
}

export default Comment
