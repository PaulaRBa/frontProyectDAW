import React from "react";
import { Nav } from "react-bootstrap";

function Links() {
  
  return (
    <div className="asideContent row">
      <div className="asideContent col-md-12">
        <div className="asideTitle"><h5 className="asideTitle">ENLACES DE INTERÉS</h5></div>
        <div className="linksContent">
          <Nav defaultActiveKey="/" className="links flex-column">
            <Nav.Link eventKey="link-1" href="/" >Link 1</Nav.Link>
            <Nav.Link eventKey="link-2" href="/" >Link 2</Nav.Link>
            <Nav.Link eventKey="link-3" href="/" >Link 3</Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default Links;