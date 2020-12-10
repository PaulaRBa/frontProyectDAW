import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import CategoriesTable from "./CategoriesTable";
import Pagination from "../../funcionalities/Pagination";
import "../../../styles/pagination.css";
import config from "../../../config";

function Categories({ credentials }) {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch(`${config.baseUrl}/categories?page=${page}`, {
      headers: { 'Authorization': credentials.header },
    })
      .then((response) => response.json())
      .then((categoriesPage) => {
        setCategories(categoriesPage.content);
        setPages(categoriesPage.totalPages);
      });
  }, [setCategories, page, credentials]);

  if (credentials.role === "ADMIN") {
    return (
      <Fragment>
        <CategoriesTable
          categories={categories}
          setCategories={setCategories}
          credentials={credentials}
        />
        <Link
          className="addItem"
          to={"/administrador/categorias/nueva-categoria"}
        >
          <Button className="buttonAdd" variant="link" size="sm">
            Nueva Categoría
          </Button>
        </Link>
        <Pagination page={page} pages={pages} setPage={setPage} />
      </Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default Categories;
