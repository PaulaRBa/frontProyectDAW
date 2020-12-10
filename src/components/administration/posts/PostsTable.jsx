import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import { truncate } from "lodash";
import { photo } from "../../../images/indexImages";
import config from "../../../config";

function PostsTable({ posts, setPosts, credentials }) {
  function deletePost(id) {
    fetch(`${config.baseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: credentials.header },
    }).then((response) => {
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Error al borrar un Post");
      }
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Table bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Titulo</th>
                <th>Imagen</th>
                <th>Contenido</th>
                <th>Usuario</th>
                <th>Puntuación</th>
                <th>Fecha Evento</th>
                <th>Evento</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post, i) => (
                  <tr key={`post_${i}`}>
                    <td>{post.createDate}</td>
                    <td>{post.categoryName}</td>
                    <td>{post.title}</td>
                    <td className="text-center">
                      {post.picture ? (
                        <div className="icon_image col-2">
                          <Image src={photo} />
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {truncate(post.content, {
                        length: 50,
                        separator: " ",
                      })}
                    </td>
                    <td>{post.userAlias}</td>
                    <td className="text-center">{post.punctuaction}</td>
                    <td>{post.eventDate}</td>
                    <td>{post.eventName}</td>
                    <td className="text-center">
                      <Button
                        //onClick={() => { editPost(post); }}
                        variant="outline-secondary"
                        size="sm"
                      >
                        Modificar
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        onClick={() => {
                          deletePost(post.id);
                        }}
                        variant="outline-secondary"
                        size="sm"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11}>No hay Posts</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PostsTable;
