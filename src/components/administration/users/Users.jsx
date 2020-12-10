import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UsersTable from "./UsersTable";
import Pagination from "../../funcionalities/Pagination";
import "../../../styles/pagination.css";
import config from "../../../config";

function Users({ credentials }) {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch(`${config.baseUrl}/users?page=${page}`, {
      headers: {
        "Authorization": credentials.header
      },
    })
      .then((response) => {
        if (response.status !== 200)
          throw new Error(
            `Error en petición HTTP: ${response.status} - ${response.statusText}`
          );
        return response.json();
      })
      .then((usersPage) => {
        setUsers(usersPage.content);
        setPages(usersPage.totalPages);
      });
  }, [setUsers, page, credentials]);

  if (credentials.role === "ADMIN") {
    return (
      <Fragment>
        <UsersTable
          users={users}
          setUsers={setUsers}
          credentials={credentials}
        />
        <Pagination page={page} pages={pages} setPage={setPage} />
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Users;
