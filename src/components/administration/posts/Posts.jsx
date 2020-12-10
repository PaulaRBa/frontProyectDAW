import React, { Fragment, useState, useEffect } from "react";
import PostsTable from "./PostsTable";
import { Redirect } from "react-router-dom";
import Pagination from "../../funcionalities/Pagination";
import "../../../styles/pagination.css";
import config from "../../../config";

function Posts({ credentials }) {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  //Llamada al servicio
  useEffect(() => {
    fetch(`${config.baseUrl}/posts?page=${page}`, {
      headers: { 'Authorization': credentials.header },
    })
      .then((response) => response.json())
      .then((postsPage) => {
        setPosts(postsPage.content);
        setPages(postsPage.totalPages);
      });
  }, [setPosts, page, credentials]);

  if (credentials.role === "ADMIN") {
    return (
      <Fragment>
        <PostsTable
          posts={posts}
          setPosts={setPosts}
          credentials={credentials}
        />
        <Pagination
          className="adminPagination"
          page={page}
          pages={pages}
          setPage={setPage}
        />
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Posts;
