import axios from "axios";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Post } from "./post";

interface Post {
  id: string,
  title: string
}

function App() {

  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState<any>({});


  const renderedPosts = useMemo(() => {
    return Object.values(posts).map((post: any) => (
      <Post key={post.id} post={post} addCommentToPost={addCommentToPost} />
    ))
  }, [posts]);


  async function addCommentToPost(e: any) {
    e.preventDefault();
    const content = e.target.elements[0].value;
    const postId = e.target.elements[0].id;

    try {
      const { data: comments } = await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
      e.target.elements[0].value = '';
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchPosts() {
    const { data } = await axios.get('http://localhost:4000/posts')

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data: newPost } = await axios.post('http://localhost:4000/posts', { title });
      setPosts((oldPosts: any) => ({ ...oldPosts, [newPost.id]: { ...newPost } }))
      setTitle('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <form onSubmit={onSubmit}>
        <label>Title:</label>
        <input value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text" name="title" />
        <button type="submit">Submit</button>
      </form>

      <section>
        {renderedPosts}
      </section>

    </main>
  )
}

export default App
