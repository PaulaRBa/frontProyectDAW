import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Pagination from "../../components/funcionalities/Pagination";
import "../../styles/blog.css";
import "../../styles/pagination.css";
import { useLocation } from "react-router-dom";
import config from "../../config";

function AllPosts({ credentials }) {

  const location = useLocation();

  //URLSearchParams me permite parsear la cadena buscada
  const query = new URLSearchParams(location.search).get("q");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    let url = `${config.baseUrl}/posts?page=${page}`;
    if (query) {
      url += `&q=${query}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((postsPage) => {
        setPosts(postsPage.content);
        setPages(postsPage.totalPages);
      });
  }, [setPosts, page, query]);

  return (
    <div className="blog container-fluid">
      <div className="titleBlog row">
        <div className="titleBlog col-md-12">
          {query ? (
            <h3>
              <span className="changeText">Espacio Abierto /</span> Resultados
              de tu Búsqueda / {query}{" "}
            </h3>
          ) : (
            <h1 className="changeText">EspacioAbierto</h1>
          )}
        </div>
      </div>

      <div className="blogCard row">
        <div className="blogCard col-md-12">
          {posts.map((post, i) => (
            <PostCard key={`post_${i}`} post={post} credentials={credentials} />
          ))}
        </div>
      </div>

      <div className="blogPagination row">
        <div className="blogPagination col-md-12">
          <Pagination page={page} pages={pages} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
