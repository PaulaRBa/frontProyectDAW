import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import { photo } from "../../../images/indexImages";
import config from "../../../config";

function UsersTable({ users, setUsers, credentials }) {

  function deleteUser(id) {
    fetch(`${config.baseUrl}/users/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': credentials.header },
    }).then((response) => {
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Error al borrar un Usuario");
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
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Alias</th>
                <th>Email</th>
                <th>Fecha Creación</th>
                <th>Fecha Modificación</th>
                <th>Rol</th>
                {/* FUNCIONALIDAD NO IMPLEMENTADA: <th>Modificar Rol</th> */}
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr key={`user_${i}`}>
                    <td className="text-center">
                      {user.profilePicture ? (
                        <div className="icon_image col-2">
                          <Image src={photo} />
                        </div>
                      ) : null}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.surnames}</td>
                    <td>{user.alias}</td>
                    <td>{user.email}</td>
                    <td className="text-center">{user.registrationDate}</td>
                    <td className="text-center">{user.updateDate}</td>
                    <td className="text-center">{user.role.name}</td>
                    {/* FUNCIONALIDAD NO IMPLEMENTADA 
                    <td className="text-center">
                      <Button
                        onClick={() => { changeRole(user.id); }}
                        variant="outline-secondary"
                      >Modificar Rol</Button>
                    </td> */}
                    <td className="text-center">
                      <Button
                        onClick={() => {
                          deleteUser(user.id);
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
                  <td colSpan={9}>No hay Usuarios</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
