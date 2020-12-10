import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TopNav from './../components/header/topNav/TopNav';
import BottomNav from './../components/header/bottomNav/BottomNav';
import { ocio } from "../images/indexImages";
import './../styles/header.css';

function Header({ children, titleWeb, credentials }) {

  return (
    <Fragment>
      <header className="header">
        <div className="header container-fluid">
          <div className="header row">
            <div className="header col-md-12">
              <div className="headerTitle">
                <h1><Link className="title decorationItem" to={'/'} >{titleWeb}</Link></h1>
                <TopNav credentials={credentials}/>
              </div>
              <div className="headerImage">
                <img
                  src={ocio}
                  className="ocio_asturias"
                  alt="Imagen Representativa del Ocio en Asturias"
                />
              </div>
              <div>
                <BottomNav />
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
    </Fragment>
  );
};

export default Header;