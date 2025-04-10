import React from "react";
import { FaSearch, FaTrash } from "react-icons/fa"; // Importando los iconos

import "./GenericTable.css";

const GenericTable = ({
  columns,
  rows,
  columnStyle,
  rowStyle,
  onSearch,
  onDelete,
}) => {
  return (
    <div>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} style={columnStyle}>
                {column.Header}
              </th>
            ))}
            <th style={columnStyle}>Actions</th>{" "}
            {/* Columna para los íconos de acciones */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={rowStyle(rowIndex)}
              className="table-row" // Clase para el hover de la fila completa
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  style={{ padding: "8px", cursor: "pointer" }} // Añadir cursor pointer a todas las celdas
                >
                  {row[column.accessor]}
                </td>
              ))}
              <td style={{ padding: "8px", textAlign: "center" }}>
                {/* Iconos para acciones */}
                <button
                  onClick={() => onSearch(row)}
                  style={{
                    marginRight: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                  className="action-icon"
                >
                  <FaSearch size={20} /> {/* Icono de búsqueda */}
                </button>
                <button
                  onClick={() => onDelete(row)}
                  style={{
                    marginLeft: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                  className="action-icon"
                >
                  <FaTrash size={20} /> {/* Icono de eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
