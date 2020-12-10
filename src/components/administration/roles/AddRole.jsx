import React, { useState, Fragment } from "react";
import RolesForm from "./RolesForm";
import { keyBy } from "lodash";
import { Redirect } from "react-router-dom";
import config from "../../../config";

function AddRole({ credentials }) {
  
  const role = useState({ name: "" });
  const [completado, setCompletado] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (value) => {
    let response = await fetch(`${config.baseUrl}/roles`, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json",
        Authorization: credentials.header,
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
                <h2>Añadiendo un nuevo Rol</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RolesForm value={role} onSubmit={onSubmit} errors={errors} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddRole;
