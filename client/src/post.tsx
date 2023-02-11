import { useEffect, useState } from "react";
import axios from "axios";

export const Post = ({ post, addCommentToPost }: any) => {
    const [comments, setComments] = useState({});

    async function fetchComments() {
        const { data } = await axios.get(`http://localhost:4001/posts/${post.id}/comments`);

        setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (<div >
        <h3>{post.title}</h3>
        <form onSubmit={addCommentToPost}>
            <label htmlFor={`${post.id}`}>New Comment</label>
            <input id={`${post.id}`} type="text" />
            <button type="submit">Submit comment</button>
        </form>
        <pre>{JSON.stringify(comments)}</pre>
    </div>)

}