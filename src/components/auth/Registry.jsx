import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { keyBy } from "lodash";
import config from "../../config";

function Registry() {
  
  const [user, saveUser] = useState({
    name: "",
    surnames: "",
    email: "",
    alias: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isRegistry, setRegistry] = useState(false);

  //Función que coloca los nuevos elementos en el State de User
  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quiere registrarse
  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${config.baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });
    let data = await response.json();
    if (response.ok) {
      console.log(data);
      setRegistry(true);
    } else {
      let newErrors = keyBy(data, (error) => error.field);
      console.log(newErrors);
      setErrors(newErrors);
    }
  };

  if (!isRegistry) {
    return (
      <div className="registry container-fluid">
        <div className="registry row">
          <div className="registry col-md-12">
            <div className="registryFormTitle">
              <h1 className="title">REGISTRO</h1>
            </div>
          </div>
        </div>
        <div className="registryForm row">
          <div className="registry col-md-12">
            <Form className="registration" onSubmit={onSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nombre: "
                  value={user.name}
                  onChange={onChange}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicSurnames">
                <Form.Control
                  type="text"
                  name="surnames"
                  placeholder="Apellidos: "
                  value={user.surnames}
                  onChange={onChange}
                  isInvalid={errors.surnames}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surnames?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email: "
                  value={user.email}
                  onChange={onChange}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicAlias">
                <Form.Control
                  type="text"
                  name="alias"
                  placeholder="Alias: "
                  value={user.alias}
                  onChange={onChange}
                  isInvalid={errors.alias}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.alias?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña: "
                  value={user.password}
                  onChange={onChange}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicConfirm">
                <Form.Control
                  type="password"
                  name="confirm"
                  placeholder="Confirma tu Contraseña: "
                  value={user.confirm}
                  onChange={onChange}
                  isInvalid={errors.confirm}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirm?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-success">
                Registrarse
              </Button>
              <Link to={"/"} className="returLink">
                <Button variant="outline-success">Cancelar</Button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default Registry;
