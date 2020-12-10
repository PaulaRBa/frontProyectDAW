import React from "react";
import { Table, Button, FormCheck } from "react-bootstrap";
import { truncate } from "lodash";
import config from "../../../config";

function ReportsTable({ reports, setReports, credentials }) {
  
  function deleteReport(id) {
    fetch(`${config.baseUrl}/reports/${id}`, {
      method: "DELETE",
      headers: { Authorization: credentials.header },
    }).then((response) => {
      if (response.ok) {
        setReports(reports.filter((a) => a.id !== id));
      } else {
        alert("Error al borrar una Denuncia");
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
                <th>Fecha</th>
                <th>Texto Denuncia</th>
                <th>Denunciante</th>
                <th>Comentario Denunciado</th>
                <th>Gestionar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report, i) => (
                  <tr key={`report_${i}`}>
                    <td className="text-center">{report.createDate}</td>
                    <td>{truncate(report.text, { length: 40 })}</td>
                    <td>{report.userAlias}</td>
                    <td className="text-center">{report.commentId}</td>
                    <td className="text-center">
                      <FormCheck type="checkbox" />
                    </td>
                    <td className="text-center">
                      <Button
                        onClick={() => {
                          deleteReport(report.id);
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
                  <td colSpan={6}>No hay Denuncias</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ReportsTable;
