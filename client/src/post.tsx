import { useEffect, useState } from "react";
import axios from "axios";

export const Post = ({ post, addCommentToPost }: any) => {

    return (<div >
        <h3>{post.title}</h3>
        <form onSubmit={addCommentToPost}>
            <label htmlFor={`${post.id}`}>New Comment</label>
            <input id={`${post.id}`} type="text" />
            <button type="submit">Submit comment</button>
        </form>
        <pre>{JSON.stringify(post.comments)}</pre>
    </div>)

}