import React from 'react'

const BookIconPost = ({cheminImage,name,username,like,dislike,nbrCommentaire}) => {
    return (
        <React.Fragment>
                <img src={cheminImage} className="selectedBookImage" alt={name + " image"}/>
                <div className="part1">
                    <h3 className="selectedBookName">{name}</h3>
                    <h4 className="selectedBookCreator">{username}</h4>
                </div>
                <div className="part2">
                    <div className="like">
                        <img src="./icons/like.png" className="reactImage" />
                        {like!="0"&&<p>{like}</p>}
                    </div>
                    <div className="dislike">
                        <img src="./icons/dislike.png" className="reactImage" />
                        {dislike!="0"&&<p>{dislike}</p>}
                    </div>
                    <div className="commentaire">
                        <p>{nbrCommentaire!="0"&&nbrCommentaire+" Comments"||"No Comments"} </p>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default BookIconPost
