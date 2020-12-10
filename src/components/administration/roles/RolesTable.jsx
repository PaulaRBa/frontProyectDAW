import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../config";

function RolesTable({ roles, setRoles, credentials }) {
  function deleteRole(id) {
    fetch(`${config.baseUrl}/roles/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': credentials.header },
    }).then((response) => {
      if (response.ok) {
        setRoles(roles.filter((r) => r.id !== id));
      } else {
        alert("Error al borrar un Rol");
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
                <th>Rol</th>
                <th>Modificar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role, i) => (
                  <tr key={`role_${i}`}>
                    <td>{role.name}</td>
                    <td className="text-center">
                      <Link
                        to={`/administrador/roles/editar-rol/${role.id}`}
                        variant="outline-secondary"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Modificar
                      </Link>
                    </td>
                    <td className="text-center">
                      <Button
                        onClick={() => {
                          deleteRole(role.id);
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
                  <td colSpan={3}>No hay Roles Registrados</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default RolesTable;
