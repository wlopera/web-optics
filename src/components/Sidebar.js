import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // useLocation para detectar la ruta activa
import {
  FaGlasses,
  FaUserFriends,
  FaBoxOpen,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation(); // Obtiene la ruta activa

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
      <div className="mb-4 d-flex align-items-center">
        <FaGlasses size={28} className="me-2" />
        <h5 className="mb-0">Óptica</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/sales"
          className={`text-white ${
            location.pathname === "/sales" ? "bg-primary" : ""
          } py-2 px-3 mb-2 rounded`}
        >
          <FaChartBar className="me-2" />
          Ventas
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/products"
          className={`text-white ${
            location.pathname === "/products" ? "bg-primary" : ""
          } py-2 px-3 mb-2 rounded`}
        >
          <FaBoxOpen className="me-2" />
          Productos
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/clients"
          className={`text-white ${
            location.pathname === "/clients" ? "bg-primary" : ""
          } py-2 px-3 mb-2 rounded`}
        >
          <FaUserFriends className="me-2" />
          Clientes
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/reports"
          className={`text-white ${
            location.pathname === "/reports" ? "bg-primary" : ""
          } py-2 px-3 mb-2 rounded`}
        >
          <FaChartBar className="me-2" />
          Informes
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
