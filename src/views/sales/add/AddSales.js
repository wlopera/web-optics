import React, { useState } from "react";
import { Button, Form, Table, Tabs, Tab } from "react-bootstrap";
import { nanoid } from "nanoid";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addSales } from "../../../store/salesSlice";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../../../components/modal/PaymentModal";
import OrderForm from "../../../components/form/OrderForm";

import "./AddSales.css";
import ProductsForm from "../../../components/form/ProductsForm";

const AddSales = () => {
  const [orderData, setOrderData] = useState({
    client: "",
    description: "",
    total: 0.0,
    status: "PENDIENTE",
  });

  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSale = {
      id: nanoid(),
      date: new Date().toLocaleDateString(),
      ...orderData,
    };

    dispatch(addSales(newSale)); // Dispatch de la acción para agregar la venta
    navigate("/sales"); // Reegresar a la vista ventas
  };

  const handleAddPayment = (newPayment) => {
    setPayments([...payments, newPayment]);
    setShowPaymentModal(false);
  };

  const handleOrderChange = (key, value) => {
    setOrderData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-0 bg-success text-white px-2 py-1">
        <h3 className="mb-1">Agregar Venta</h3>
      </div>

      <Form onSubmit={handleSubmit}>
        <Tabs defaultActiveKey="datos" className="mb-3 custom-tabs">
          <Tab eventKey="datos" title="Orden">
            <OrderForm data={orderData} onChange={handleOrderChange} />
          </Tab>

          {/* TAB: Productos */}
          <Tab eventKey="productos" title="Productos">
            <ProductsForm products={products} setProducts={setProducts} />
          </Tab>

          {/* TAB: Pagos */}
          <Tab eventKey="pagos" title="Pagos">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Pagos Realizados</h6>
              <Button
                variant="success"
                size="sm"
                onClick={() => setShowPaymentModal(true)}
              >
                <FaPlus size={12} />
              </Button>
            </div>

            <Table striped bordered hover responsive>
              <thead className="table-secondary">
                <tr>
                  <th>Fecha</th>
                  <th>Monto ($)</th>
                  <th>Método</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.date}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.method}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        <div className="d-flex justify-content-evenly mt-4">
          <Button
            variant="danger"
            className="w-25"
            onClick={() => navigate("/sales")}
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit" className="w-25">
            Agregar
          </Button>
        </div>
      </Form>

      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onAddPayment={handleAddPayment}
      />
    </div>
  );
};

export default AddSales;
