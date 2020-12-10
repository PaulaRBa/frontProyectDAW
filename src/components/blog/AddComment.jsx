import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { keyBy } from "lodash";
import config from "../../config";

function AddComment({ postId, addComment, credentials }) {

  const [comment, setComment] = useState({
    content: "",
  });
  const [errors, setErrors] = useState({});

  //Función que coloca los nuevos elementos en el state de comments
  const onChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setComment({
      content: "",
    });
    let response = await fetch(`${config.baseUrl}/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        Authorization: credentials.header,
      },
    });
    let data = await response.json();
    if (response.ok) {
      console.log(data);
      addComment(data);
    } else {
      let newErrors = keyBy(data, (error) => error.field);
      console.log(newErrors);
      setErrors(newErrors);
    }
  };

  if (credentials.role === "USER" || credentials.role === "ADMIN") {
    return (
      <Form id="commentForm" onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="10"
            name="content"
            placeholder="Escribe aquí tu Comentario..."
            value={comment.content}
            onChange={onChange}
            isInvalid={errors.content}
          />
          <Form.Control.Feedback type="invalid">
            {errors.content?.defaultMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-success">
          PUBLICAR COMENTARIO
        </Button>
        <br />
        <br />
      </Form>
    );
  } else {
    return (
      <p>
        Registrate en nuestro Blog y podrás valorar y comentar nuestros Posts.
      </p>
    );
  }
}

export default AddComment;
