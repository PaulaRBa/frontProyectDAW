import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AdvertisersTable from "./AdvertisersTable";
import Pagination from "../../funcionalities/Pagination";
import "../../../styles/pagination.css";
import "../../../styles/administration.css";
import config from "../../../config";

function Advertisers({ credentials }) {
  console.log(credentials);

  const [advertisers, setAdvertisers] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch(`${config.baseUrl}/advertisers?page=${page}`, {
      headers: {
        Authorization: credentials.header,
      },
    })
      .then((response) => response.json())
      .then((advertisersPage) => {
        setAdvertisers(advertisersPage.content);
        setPages(advertisersPage.totalPages);
      });
  }, [setAdvertisers, page, credentials]);

  if (credentials.role === "ADMIN") {
    return (
      <Fragment>
        <AdvertisersTable
          advertisers={advertisers}
          setAdvertisers={setAdvertisers}
          credentials={credentials}
        />
        <Link
          className="addItem"
          to={"/administrador/anunciantes/nuevo-anunciante"}
        >
          <Button className="buttonAdd" variant="link" size="sm">
            Nuevo Anunciante
          </Button>
        </Link>
        <Pagination page={page} pages={pages} setPage={setPage} />
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Advertisers;
