import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Navbar, Container, Nav } from "react-bootstrap";
import { fetchSales } from "../../store/salesSlice";
import { FaUser, FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.data);
  const loading = useSelector((state) => state.sales.loading);
  const error = useSelector((state) => state.sales.error);

  const navigate = useNavigate();

  useEffect(() => {
    // Solo hacer fetch si no hay datos cargados
    if (sales.length === 0) {
      dispatch(fetchSales());
    }
  }, [dispatch, sales.length]);

  console.log(123, sales);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">LOICrud</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light">
              <FaUser />
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-0 bg-success text-white px-2 py-1">
          <h3 className="mb-1">ORDENES DE COMPRA</h3>
          <Button variant="success" onClick={() => navigate("/sales/add")}>
            <FaPlus size={14} />
          </Button>
        </div>

        {loading && <p>Cargando ventas...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr className="text-center">
              {/* <th>ID</th> */}
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Descripción</th>
              <th>Total ($)</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                {/* <td className="text-center">{sale.id}</td> */}
                <td className="text-center">{sale.date}</td>
                <td>{sale.client}</td>
                <td>{sale.description}</td>
                <td className="text-center">{sale.total}</td>
                <td className="text-center">{sale.status}</td>
                <td className="text-center">
                  <Button variant="outline-primary" size="sm">
                    <FaSearch />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Sales;
