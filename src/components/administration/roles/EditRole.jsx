import React, { Fragment, useState, useEffect } from "react";
import { keyBy } from "lodash";
import RolesForm from "./RolesForm";
import { Redirect } from "react-router-dom";
import config from "../../../config";

function EditRole({ match, credentials }) {
  const [role, setRole] = useState(null);
  const [completado, setCompletado] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRole = async () => {
      let response = await fetch(`${config.baseUrl}/roles/${match.params.id}`, {
        headers: { Authorization: credentials.header },
      });
      if (response.ok) {
        var role = await response.json();
        setRole(role);
      } else {
        alert("Ha ocurrido un error");
      }
    };
    loadRole();
  }, [match, credentials]);

  const editRole = async (value) => {
    let response = await fetch(`${config.baseUrl}/roles/${role.id}`, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json",
        'Authorization': credentials.header,
      },
    });
    let data = await response.json();
    if (response.ok) {
      console.log(data);
      setCompletado(true);
    } else {
      let newErrors = keyBy(data, (error) => error.field);
      console.log(newErrors);
      setErrors(newErrors);
    }
  };

  if (completado) {
    return <Redirect to="/administrador/roles" />;
  } else {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="formTitle">
                <h2>Modificando un Rol ya existente</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {!role && <p>Cargando datos del Rol seleccionado</p>}
              {role && (
                <RolesForm value={role} onSubmit={editRole} errors={errors} />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditRole;
