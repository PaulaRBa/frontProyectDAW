import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import BottomNavItemsList from "./BottomNavItemsList";
import config from "../../../config";

function BottomNav({ history }) {

  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${config.baseUrl}/categories/list`)
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      });
  }, [setCategories]);

  
  return (
    <Navbar className="bottomNav" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="basic-navbar-nav">
        <Nav className="bottomNav mr-auto">
          {categories.map((category, i) => (
            <BottomNavItemsList key={`category_${i}`} category={category} />
          ))}
          {/* NO IMPLEMENTADO: <Link className="nav-item" to={"/calendar"}>CALENDARIO EVENTOS</Link> */}
        </Nav>
      </Navbar.Collapse>

      <Form
        className="form-inline my-2 my-lg-0"
        //Capturo el evento que se ha enviado en el formulario,
        //Anulo el comportamiento por defecto de refrescar la pagina
        //Hago lo mismo con el intro que cuando pulso el botón
        onSubmit={(ev) => {
          ev.preventDefault();
          history.push(`/allPosts?q=${query}`);
        }}
      >
        <FormControl
          type="search"
          placeholder="Buscar"
          className="mr-sm-2"
          onChange={(ev) => setQuery(ev.target.value)}
        />
        <Button
          variant="outline-success"
          onClick={() => history.push(`/allPosts?q=${query}`)}
        >
          Buscar
        </Button>
      </Form>
    </Navbar>
  );
}
//Necesito el router para que me inyecte el history del navegador
export default withRouter(BottomNav);
