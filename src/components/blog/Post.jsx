import React, { useState, useEffect, Fragment } from "react";
import { Jumbotron, Container, Button, Image } from "react-bootstrap";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import { heart } from "../../images/indexImages";
import "../../styles/blog.css";
import config from "../../config";

function Post({ match, comment, credentials }) {

  const [post, setPost] = useState({
    title: "",
    categoryName: "",
    eventDate: "",
    eventName: "",
    picture: "",
    punctuaction: "",
    content: "",
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${config.baseUrl}/posts/${match.params.id}`)
      .then((response) => response.json())
      .then((post) => {
        setPost(post);
      });
  }, [setPost, match]);

  useEffect(() => {
    fetch(`${config.baseUrl}/posts/${match.params.id}/comments`)
      .then((response) => response.json())
      .then((comments) => {
        setComments(comments);
      });
  }, [setComments, match]);

  return (
    <Jumbotron fluid>
      <Container id="postPage">
        <div className="row">
          <h2 className="postTitle">{post.title}</h2>
        </div>
        <br />
        <div className="row">
          <img
            src={`data:image/jpeg;base64,${post.picture}`}
            height="200px"
            width="100%"
            alt="Imagen del Post"
          />
        </div>
        <br></br>
        <div className="row">
          <Button variant="success">{post.categoryName.toUpperCase()}</Button>
        </div>
        <br />
        <div className="row">
          <div className="col-md-9">
            <h6 className="changeText">
              Posted by: {post.userAlias} | {post.createDate}
            </h6>
          </div>
          <div className="col-md-3">
            <h6 className="changeText">
              {credentials.isLogged ? (
                <Fragment>{post.punctuaction}
                  <Button className="likes" variant="link"> Likes </Button>
                  <Image src={heart} />
                </Fragment>
              ) : (
                <p>{post.punctuaction} Likes</p>
              )}
            </h6>
          </div>
        </div>
        <br />
        {/* Para establecer contenido html directamente desde React usamos el atributo dangerouslySetInnerHTML
                (reemplaza el uso de innerHTML) se hace de este modo para evitar así ataques XSS(cross-site scripting) */}
        <div className="row">
          <p
            dangerouslySetInnerHTML={{
              __html: post.content.replace("\n", "<br />"),
            }}
          />
        </div>
      </Container>
      <br /><br />
      <Container id="commentsPost">
        <div className="row">
          <h5 className="changeText">COMENTARIOS: </h5>
        </div>
        <br />
        {comments.map((comment, i) => (
          <CommentCard
            key={`comment_${i}`}
            comment={comment}
            credentials={credentials}
          />
        ))}
      </Container>
      <br /><br />
      <Container id="addComments">
        <div className="row">
          <h5 className="changeText">Dejanos tu Comentario:</h5>
        </div>
        <br />
        <AddComment
          credentials={credentials}
          comment={comment}
          postId={post.id}
          addComment={(c) => setComments(comments.concat(c))}
        />
      </Container>
    </Jumbotron>
  );
}

export default Post;
