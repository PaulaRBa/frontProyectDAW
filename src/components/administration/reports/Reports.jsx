import React, { Fragment, useState, useEffect } from "react";
import ReportsTable from "./ReportsTable";
import { Redirect } from "react-router-dom";
import Pagination from "../../funcionalities/Pagination";
import "../../../styles/pagination.css";
import config from "../../../config";

function Reports({ credentials }) {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch(`${config.baseUrl}/reports?page=${page}`, {
      headers: {
        'Authorization': credentials.header
      },
    })
      .then((response) => {
        if (response.status !== 200)
          throw new Error(
            `Error en petición HTTP: ${response.status} - ${response.statusText}`
          );
        return response.json();
      })
      .then((reportsPage) => {
        setReports(reportsPage.content);
        setPages(reportsPage.totalPages);
      });
  }, [setReports, page, credentials]);

  if (credentials.role === "ADMIN") {
    return (
      <Fragment>
        <ReportsTable
          reports={reports}
          setReports={setReports}
          credentials={credentials}
        />
        <Pagination page={page} pages={pages} setPage={setPage} />
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Reports;
