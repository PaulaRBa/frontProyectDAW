import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { keyBy } from "lodash";
import { Redirect } from "react-router-dom";
import "./../../styles/blog.css";
import config from "../../config";

function ReportForm({ match, credentials }) {
  
  const [report, setReport] = useState({
    text: "",
    userAlias: credentials.alias,
  });
  const [completado, setCompletado] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${config.baseUrl}/reports/${match.params.id}`, {
      method: "POST",
      body: JSON.stringify(report),
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
    return <Redirect to={`/post/${match.params.id}`} />;
  } else {
    return (
      <div className="reportsForm container-fluid">
        <div className="reportsForm row">
          <div className="col-md-12">
            <div className="formTitle">
              <h1>Formulario de Denuncias</h1>
            </div>
          </div>
        </div>
        <div className="reportsForm row">
          <div className="reportsForm col-md-12">
            <Form id="reportForm" onSubmit={onSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="6"
                  name="text"
                  placeholder="Escribe el texto de tu Denuncia..."
                  value={report.text}
                  onChange={onChange}
                  isInvalid={errors.text}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.text?.defaultMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button type="submit" variant="outline-success">
                ENVIAR DENUNCIA
              </Button>
              <br />
              <br />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportForm;
