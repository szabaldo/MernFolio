import React, { useEffect, useContext, useState } from 'react'; 
import Comment from './Comment.js'; 
import { UserContext } from './App.js'; 

function CommentsPane() {
    const {user, setUser} = useContext(UserContext);
    const [comments, setComments] = useState([]); 

    const fetchComments = async () => {
        const status = user?.isadmin ? "pending" : "approved"; 
        // const status = "pending"; 
        
        const response = await fetch("http://localhost:8080/get-comments", {
            body: JSON.stringify({status: status}),
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const res = await response.json();
        console.log(res);
        const c = res.comments.map((comment, index) => <Comment key={index} comment={comment} />);
        setComments(c); 
    };

    useEffect( () => {
        fetchComments(); 
    }, [user]);

    return(
        <div>
            {comments}
        </div>
    );
}

export default CommentsPane;