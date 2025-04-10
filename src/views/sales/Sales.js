import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { fetchSales } from "../../store/salesSlice";
import { FaUser, FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/table/GenericTable";

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

  const columns = [
    { accessor: "date", Header: "Fecha", align: "center" },
    { accessor: "client", Header: "Cliente", align: "left" },
    { accessor: "description", Header: "Descripción", align: "left" },
    { accessor: "total", Header: "Total ($)", align: "center" },
    { accessor: "status", Header: "Estado", align: "center" },
  ];

  const columnStyle = {
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#00e66f",
    border: "1px solid #e0e0e0",
  };

  const rowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? "#e6fff2" : "#fff",
    border: "1px solid #e0e0e0",
    padding: "8px",
    textAlign: "left",
  });

  const onSearch = (row) => {
    alert(`Searching for: ${row.client}`);
  };

  const actions = {
    title: "Acciones",
    record: [{ icon: FaSearch, onClick: onSearch }],
  };

  const mainAction = {
    title: "ORDENES DE COMPRA",
    record: { icon: FaPlus, onClick: () => navigate("/sales/add") },
  };

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

      {loading && <p>Cargando ventas...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <GenericTable
        columns={columns}
        rows={sales}
        columnStyle={columnStyle}
        rowStyle={rowStyle}
        mainAction={mainAction}
        actions={actions}
      />
    </>
  );
};

export default Sales;
