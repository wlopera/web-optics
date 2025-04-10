import React from "react";
import { Table, Button } from "react-bootstrap";

const GenericTable = ({
  columns,
  rows,
  actions,
  columnStyle,
  rowStyle,
  mainAction,
}) => {
  const IconMain = mainAction.record.icon;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-0 bg-success text-white px-2">
        <h3 className="mb-1">{mainAction.title}</h3>
        <Button variant="success" onClick={mainAction.record.onClick}>
          <IconMain size={12} />
        </Button>
      </div>
      <Table striped bordered hover responsive className="mb-0">
        <thead>
          <tr className="text-center">
            {columns.map((column) => (
              <th key={column.accessor} style={columnStyle}>
                {column.Header}
              </th>
            ))}
            {actions && actions.record && actions.record.length > 0 && (
              <th style={columnStyle}>{actions.title}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={rowStyle(rowIndex)}
              className={rowIndex % 2 === 0 ? "bg-light" : ""}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  style={{
                    ...rowStyle(rowIndex),
                    textAlign: column.align || "center", // Usar el valor de alineación desde cada columna
                  }}
                >
                  {row[column.accessor]}
                </td>
              ))}
              {actions && actions.record && actions.record.length > 0 && (
                <td className="text-center" style={rowStyle(rowIndex)}>
                  {actions.record.map((action, index) => {
                    const Icon = action.icon;

                    return (
                      <Button
                        key={index}
                        variant="outline-primary"
                        size="sm"
                        onClick={() => action.onClick(row)}
                        className="me-2" // Margen entre botones
                      >
                        <Icon size={12} />
                      </Button>
                    );
                  })}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GenericTable;
