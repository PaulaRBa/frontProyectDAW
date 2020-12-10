import React, { Fragment, useState, useEffect } from "react";
import PostCard from "../../blog/PostCard";
import config from "../../../config";

function PostsContainer({ credentials }) {
  
  const [posts, setPosts] = useState([]);
  //const[page, setPage] = useState(0);
  const page = 0;

  useEffect(() => {
    fetch(`${config.baseUrl}/posts?page=${page}&byPage=${3}`)
      .then((response) => response.json())
      .then((postsPage) => {
        setPosts(postsPage.content);
      });
  }, [setPosts, page]);

  return (
    <Fragment>
      <div className="lastPostsContainer">
        <h2 className="lastPostsTitle">Nuestros Últimos Posts... </h2>
        <br />
        {posts.map((post, i) => (
          <PostCard key={`post_${i}`} post={post} credentials={credentials} />
        ))}
      </div>
    </Fragment>
  );
}

export default PostsContainer;
