import React from 'react'; 

function Comment(comment) {
    return(
        <div>
            <p>{comment.comment.fname}</p>
            <p>{comment.comment.lname}</p>
            <p>{comment.comment.comment}</p>
        </div>
    );
}

export default Comment;