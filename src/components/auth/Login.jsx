import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import config from "../../config";

function Login({ setCredentials, credentials }) {

  const [user, loginUser] = useState({
    alias: "",
    password: "",
  });

  //Función que coloca los nuevos elementos en el estado de user
  const onChange = (e) => {
    loginUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  
  //Función que se ejecuta cuando el usuario quiere loguearse
  const onSubmit = async (e) => {
    e.preventDefault();
    fetch(`${config.baseUrl}/users/login`, {
      headers: {
        Authorization: `BASIC ${btoa(user.alias + ":" + user.password)}`,
      },
    })
      .then((response) => {
        if (response.status !== 200)
          throw new Error(
            `Error en petición HTTP: ${response.status} - ${response.statusText}`
          );
        return response.json();
      })
      .then((userSrv) => {
        setCredentials({
          header: `BASIC ${btoa(user.alias + ":" + user.password)}`,
          role: userSrv.role.name,
          isLogged: true,
          alias: user.alias,
          profilePicture: user.profilePicture,
        });
      });
  };

  if (credentials.role === "ANONYMOUS") {
    return (
      <div className="login container-fluid">
        <div className="login row">
          <div className="login col-md-12">
            <div className="loginFormTitle">
              <h1 className="title">Inicia Sesión</h1>
            </div>
          </div>
        </div>
        <div className="login row">
          <div className="login col-md-12">
            <Form className="loginForm" onSubmit={onSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="formGroupAlias">
                  <Form.Control
                    type="text"
                    name="alias"
                    placeholder="Alias: "
                    value={user.alias}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="formGroupPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Contraseña: "
                    value={user.password}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form.Row>
              <Button type="submit" variant="outline-success">
                Iniciar Sesión
              </Button>
            </Form>
          </div>
        </div>
        <div className="login row">
          <div className="login col-md-12">
            <p>
              Si aún no estás registrado, puedes registrarte{" "}
              <Link to={"/registry"} className="registrationLink">
                AQUÍ
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    if (credentials.role === "USER") {
      return <Redirect to="/" />;
    } else {
      if (credentials.role === "ADMIN") {
        return <Redirect to="/administrador" />;
      } else {
        return <Redirect to="/registry" />;
      }
    }
  }
}

export default Login;
