import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TopNav({ credentials }) {

  return (

    <Navbar className="topNav" expand="lg" variant="dark" role="navigation">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="responsive-navbar-nav">
        <Nav className="topNav mr-auto">

          {credentials.isLogged
            ? <Link className="nav-item nav-link" to={"/userProfile"} >Hola {credentials.role} {credentials.alias}</Link>
            : null
          }
          {credentials.role === "ADMIN"
            ? <Link className="nav-item nav-link" to={"/administrador/addPost"} >NUEVO POST</Link>
            : null
          }
          <Link className="nav-item nav-link" to={"/allPosts"} >BLOG</Link>
          <Link className="nav-item nav-link" to={"/contact"} >CONTACTO</Link>
          {!credentials.isLogged
            ? <Link className="nav-item nav-link" to={"/registry"} >REGISTRO</Link>
            : null
          }
          {!credentials.isLogged
            ? <Link className="nav-item nav-link" to={"/login"} >LOGIN</Link>
            : <Link className="nav-item nav-link" to={"/logout"} >LOGOUT</Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;