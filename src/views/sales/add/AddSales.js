import React, { useState } from "react";
import { Button, Form, Table, Tabs, Tab } from "react-bootstrap";
import { nanoid } from "nanoid";
import { FaCaretDown, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addSales } from "../../../store/salesSlice";
import ProductModal from "../../../components/modal/ProductModal";
import { useNavigate } from "react-router-dom";
import "./AddSales.css";
import PaymentModal from "../../../components/modal/PaymentModal";

const AddSales = () => {
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("Pendiente");
  const [items, setItems] = useState([]); // Estado para los items de la tabla
  const [showProductModal, setShowProductModal] = useState(false);
  const [payments, setPayments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSale = {
      id: nanoid(),
      date: new Date().toLocaleDateString(),
      client,
      description,
      total,
      status,
      items,
    };
    dispatch(addSales(newSale)); // Dispatch de la acción para agregar la venta
    navigate("/sales"); // Reegresar a la vista ventas
  };

  const handleAddProduct = (newProduct) => {
    setItems([...items, newProduct]);
    setShowProductModal(false);
  };

  const handleAddPayment = (newPayment) => {
    setPayments([...payments, newPayment]);
    setShowPaymentModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-0 bg-success text-white px-2 py-1">
        <h3 className="mb-1">Agregar Venta</h3>
      </div>

      <Form onSubmit={handleSubmit}>
        <Tabs defaultActiveKey="datos" className="mb-3 custom-tabs">
          {/* TAB: Datos de la venta */}

          <Tab eventKey="datos" title="Datos">
            <Form.Group controlId="formClient" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre del cliente"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTotal" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Precio total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <div className="dropdown-container">
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>ABONADO</option>
                  <option>PAGADO</option>
                  <option>PENDIENTE</option>
                  <option>CANCELADO</option>
                  <option>RETIRADO</option>
                </Form.Control>
                <FaCaretDown className="dropdown-icon" />
              </div>
            </Form.Group>
          </Tab>

          {/* TAB: Productos */}
          <Tab eventKey="productos" title="Productos">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Productos</h6>
              <Button
                variant="success"
                size="sm"
                onClick={() => setShowProductModal(true)}
              >
                <FaPlus size={12} />
              </Button>
            </div>

            <Table striped bordered hover responsive>
              <thead className="table-primary">
                <tr>
                  <th>Cantidad</th>
                  <th>Producto</th>
                  <th>Precio ($)</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.quantity}</td>
                    <td>{item.product}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <FaSearch
                          size={20}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        />
                        <FaTrashAlt size={20} style={{ cursor: "pointer" }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

      <ProductModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddProduct={handleAddProduct}
      />

      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onAddPayment={handleAddPayment}
      />
    </div>
  );
};

export default AddSales;
