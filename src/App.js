import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import CookiesPolicy from "./components/footer/CookiesPolicy";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import Header from "./layouts/Header";
import HeaderAdmin from "./layouts/HeaderAdmin";

import UserProfileLayout from "./layouts/UserProfileLayout";
import UserProfile from "./components/userProfile/UserProfile";
import MyInformationGet from "./components/userProfile/MyInformationGet";
import MyInformationUpdate from "./components/userProfile/MyInformationUpdate";
import MyComments from "./components/userProfile/MyComments";

import AddPost from "./components/blog/AddPost";
import AllPosts from "./components/blog/AllPosts";
import Post from "./components/blog/Post";

import EditCategory from "./components/administration/categories/EditCategory";
import EditAdvertiser from "./components/administration/advertisers/EditAdvertiser";
import EditRole from "./components/administration/roles/EditRole";

import ReportForm from "./components/blog/ReportForm";
import Contact from "./components/contact/Contact";
import Login from "./components/auth/Login";
import Logout from './components/auth/Logout';
import Registry from "././components/auth/Registry";

import CategoryPosts from "./components/blog/CategoryPosts";
import AddAdvertiser from "./components/administration/advertisers/AddAdvertiser";
import AddCategory from "./components/administration/categories/AddCategory";
import AddRole from "./components/administration/roles/AddRole";

import AdministrationHome from "./components/administration/AdministrationHome";
import Users from "./components/administration/users/Users";
import Roles from "./components/administration/roles/Roles";
import Posts from "./components/administration/posts/Posts";
import Categories from "./components/administration/categories/Categories";
import Comments from "./components/administration/comments/Comments";
import Reports from "./components/administration/reports/Reports";
import Advertisers from "./components/administration/advertisers/Advertisers";

import "./App.css";
//import "./styles/header.css";
//import "./styles/footer.css";
import "./styles/home.css";
import "./styles/contact.css";
import "./styles/auth.css";
import "./styles/blog.css";
import "bootstrap/dist/css/bootstrap.min.css";

import config from './config';

const titleWeb = "EspAcioAbierto";

function RouteUserProfileLayout({ component: Component, credentials, ...resto }) {
  console.log(credentials);
  return (
    <Route
      {...resto}
      render={(props) => (
        <UserProfileLayout titleWeb={titleWeb} credentials={credentials}>
          <Component {...props} credentials={credentials}/>
        </UserProfileLayout>
      )}
    />
  );
}

function RouteHeader({ component: Component, credentials, ...resto }) {
  //console.log(credentials);
  return (
    <Route
      {...resto}
      render={(props) => (
        <Header titleWeb={titleWeb} credentials={credentials}>
          <Component {...props} credentials={credentials} />
        </Header>
      )}
    />
  );
}

function RouteHeaderAdmin({ component: Component, credentials, ...resto }) {
  //console.log(credentials);
  return (
    <Route
      {...resto}
      render={(props) => (
        <HeaderAdmin titleWeb={titleWeb} credentials={credentials}>
          <Component {...props} credentials={credentials} />
        </HeaderAdmin>
      )}
    />
  );
}


function App() {
  
  const email = "espAcioAbierto.Asturias@gmail.com ";
  const phone = "653039101";
  const date = new Date().getFullYear();

  const [credentials, setCredentials] = useState({
    header: '',
    role: 'ANONYMOUS', 
    isLogged: false,
    alias: '',
    profilePicture: '',
  });

  
  return (
    
    <Router basename={config.hostingProjectName} id="prueba">

      <Switch>
        
        <RouteHeader exact path="/" component={Home} credentials={credentials} />
        <RouteHeader exact path="/login" credentials={credentials} component={() => <Login setCredentials={setCredentials} credentials={credentials} />}/>
        <RouteHeader exact path="/logout" component={Logout} credentials={credentials}/>
        <RouteHeader exact path="/registry" component={Registry} credentials={credentials} setCredentials={setCredentials}/>
        <RouteHeader exact path="/contact" component={Contact} credentials={credentials}/>
        <RouteHeader exact path="/allPosts" component={AllPosts} credentials={credentials}/>
        <RouteHeader exact strict path="/post/:id" component={Post} credentials={credentials}/>
        <RouteHeader exact strict path="/report/:id" component={ReportForm} credentials={credentials}/>
        <RouteHeader exact path="/category/:id" component={CategoryPosts} credentials={credentials}/>
        <RouteHeader exact path="/administrador/addPost" component={AddPost} credentials={credentials}/>
        <RouteUserProfileLayout exact path="/userProfile" component={UserProfile} credentials={credentials}/>
        <RouteUserProfileLayout exact path="/myInformationGet" component={MyInformationGet} credentials={credentials}/>
        <RouteUserProfileLayout exact path="/myInformationUpdate" component={MyInformationUpdate} credentials={credentials}/>
        <RouteUserProfileLayout exact path="/myComments" component={MyComments} credentials={credentials}/>

        {/* Rutas Administrador */}
        <RouteHeaderAdmin exact path="/administrador" component={AdministrationHome} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/usuarios" component={Users} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/roles" component={Roles} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/roles/nuevo-rol" component={AddRole} credentials={credentials}/>
        <RouteHeaderAdmin exact strict path="/administrador/roles/editar-rol/:id" component={EditRole} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/posts" component={Posts} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/categorias" component={Categories} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/categorias/nueva-categoria" component={AddCategory} credentials={credentials}/>
        <RouteHeaderAdmin exact strict path="/administrador/categorias/editar-categoria/:id" component={EditCategory} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/comentarios" component={Comments} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/denuncias" component={Reports} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/anunciantes" component={Advertisers} credentials={credentials}/>
        <RouteHeaderAdmin exact path="/administrador/anunciantes/nuevo-anunciante" component={AddAdvertiser} credentials={credentials}/>
        <RouteHeaderAdmin exact strict path="/administrador/anunciantes/editar-anunciante/:id" component={EditAdvertiser} credentials={credentials}/>
        <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
        <Route exact path="/cookiesPolicy" component={CookiesPolicy} />

      </Switch>

      <Footer email={email} phone={phone} date={date} />

    </Router>
  );
}

export default App;
