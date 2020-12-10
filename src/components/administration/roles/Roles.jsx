import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import RolesTable from "./RolesTable";
import Pagination from "../../funcionalities/Pagination";

import "../../../styles/pagination.css";
import config from "../../../config";

function Roles({ credentials }) {
  
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch(`${config.baseUrl}/roles?page=${page}`, {
      headers: {
        'Authorization': credentials.header,
      },
    })
      .then((response) => {
        if (response.status !== 200)
          throw new Error(
            `Error en petición HTTP: ${response.status} - ${response.statusText}`
          );
        return response.json();
      })
      .then((rolesPage) => {
        setRoles(rolesPage.content);
        setPages(rolesPage.totalPages);
      });
  }, [setRoles, page, credentials]);

  if (credentials.role === "ADMIN") {
    return (
      <Fragment>
        <RolesTable
          roles={roles}
          setRoles={setRoles}
          credentials={credentials}
        />
        <Link className="addItem" to={"/administrador/roles/nuevo-rol"}>
          <Button className="buttonAdd" variant="link" size="sm">
            Nuevo Rol
          </Button>
        </Link>
        <Pagination page={page} pages={pages} setPage={setPage} />
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Roles;
