import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { keyBy } from "lodash";
import config from "../../config";

function AddPost({ credentials }) {

  const [post, setPost] = useState({
    title: "",
    categoryId: "",
    eventDate: "",
    eventName: "",
    picture: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [isSaved, setSaved] = useState(false);

  const onFileSelect = useCallback(
    (file) => {
      console.log(post);
      console.log(post.picture);
      setPost({
        ...post,
        picture: file,
      });
    },
    [post]
  );

  const onFileInputChanged = useCallback(
    (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        //Método .btoa() para pasar de binario a ascii codificado en base64
        onFileSelect(btoa(reader.result));
      };
      //.readAsBinaryString() método de la clase FileReader
      //que se usa para leer el contenido del archivo especificado
      reader.readAsBinaryString(e.target.files[0]);
    },
    [onFileSelect]
  );

  useEffect(() => {
    fetch(`${config.baseUrl}/categories/list`, {
      headers: {
        Authorization: credentials.header,
      },
    })
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      });
  }, [credentials]);

  //Función que coloca los nuevos elementos en el state de Post
  const onChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${config.baseUrl}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json",
        Authorization: credentials.header,
      },
    });
    let data = await response.json();
    if (response.ok) {
      console.log(data);
      setSaved(true);
    } else {
      let newErrors = keyBy(data, (error) => error.field);
      console.log(newErrors);
      setErrors(newErrors);
    }
  };

  if (credentials.role === "ADMIN") {
    if (!isSaved) {
      return (
        <div className="addPost container-fluid">
          <div className="addPost row">
            <div className="addPost col-md-12">
              <div className="addPostTitle">
                <h2 className="title">Añadiendo nuevo Post:</h2>
              </div>
            </div>
          </div>
          <div className="addPost row">
            <div className="addPost col-md-1"></div>
            <div className="addPost col-md-10">
              <Form className="addPostForm" onSubmit={onSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="8">
                    <Form.Label> Título: </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      size="sm"
                      placeholder="Título del nuevo Post"
                      value={post.title}
                      onChange={onChange}
                      isInvalid={errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title?.defaultMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="categorySelect">
                    <Form.Label> Categoría: </Form.Label>
                    <Form.Control
                      as="select"
                      name="categoryId"
                      size="sm"
                      onChange={onChange}
                      isInvalid={errors.categoryId}
                    >
                      <option value="">Selecciona una categoría </option>
                      {categories.map((category, i) => (
                        <option key={i} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.categoryId?.defaultMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="8">
                    <Form.Label> Evento: </Form.Label>
                    <Form.Control
                      type="text"
                      name="eventName"
                      size="sm"
                      placeholder="Evento al que se refiere"
                      value={post.eventName}
                      onChange={onChange}
                      isInvalid={errors.eventName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.eventName?.defaultMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label> Fecha del Evento: </Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      name="eventDate"
                      value={post.eventDate}
                      onChange={onChange}
                      isInvalid={errors.eventDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.eventDate?.defaultMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="12">
                    <Form.Label> Contenido: </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="10"
                      size="sm"
                      name="content"
                      placeholder="Escribe tu nuevo Post..."
                      value={post.content}
                      onChange={onChange}
                      isInvalid={errors.content}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.content?.defaultMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="12">
                    <Form.Label> Añadir imagen: </Form.Label>
                    <Form.Control
                      type="file"
                      name="picture"
                      size="sm"
                      onChange={onFileInputChanged}
                    />
                  </Form.Group>
                </Form.Row>
                <Button type="submit" variant="outline-success">
                  Guardar Post
                </Button>
                <br />
                <br />
              </Form>
            </div>
            <div className="addPost col-md-1"></div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/administrador" />;
    }
  } else {
    return <Redirect to="/" />;
  }
}

export default AddPost;
