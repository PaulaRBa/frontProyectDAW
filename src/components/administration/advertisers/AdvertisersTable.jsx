import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../../../styles/administration.css";
import config from "../../../config";

function AdvertisersTable({ advertisers, setAdvertisers, credentials }) {
  
  function deleteAdvertiser(id) {
    fetch(`${config.baseUrl}/advertisers/${id}`, {
      method: "DELETE",
      headers: { Authorization: credentials.header },
    }).then((response) => {
      if (response.ok) {
        setAdvertisers(
          advertisers.filter((advertiser) => advertiser.id !== id)
        );
      } else {
        alert("Error al borrar un Anunciante");
      }
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Table bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Num. Cuenta</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {advertisers.length > 0 ? (
                advertisers.map((advertiser, i) => (
                  <tr key={`advertiser_${i}`}>
                    <td>{advertiser.name}</td>
                    <td>{advertiser.email}</td>
                    <td>{advertiser.accountNumber}</td>
                    <td className="text-center">
                      <Link
                        to={`/administrador/anunciantes/editar-anunciante/${advertiser.id}`}
                        variant="outline-secondary"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        {" "}
                        Modificar{" "}
                      </Link>
                    </td>
                    <td className="text-center">
                      <Button
                        onClick={() => {
                          deleteAdvertiser(advertiser.id);
                        }}
                        variant="outline-secondary"
                        size="sm"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No hay Anunciantes</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12"></div>
      </div>
    </div>
  );
}

export default AdvertisersTable;
