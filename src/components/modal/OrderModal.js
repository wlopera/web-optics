import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { nanoid } from "nanoid";
import { FaCaretDown, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa"; // Icono de dropdown y +
import "./OrderModal.css"; // Importa los estilos personalizados
import ProductModal from "./ProductModal";

const OrderModal = ({ show, onClose, onAddSale }) => {
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("Pendiente");
  const [items, setItems] = useState([]); // Estado para los items de la tabla
  const [showProductModal, setShowProductModal] = useState(false);

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
    onAddSale(newSale);
  };

  const handleAddProduct = (newProduct) => {
    setItems([...items, newProduct]);
    setShowProductModal(false);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg" // Hacer la modal más grande
      className={showProductModal ? "modal-blurred" : ""}
      centered
    >
      <Modal.Header closeButton className="bg-success">
        <Modal.Title className="d-flex justify-content-between align-items-center mb-1 text-white w-100">
          Agregar Venta
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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

          {/* Tabla con los items agregados */}
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-0 bg-success text-white px-2 py-1">
              <h6 className="mb-1">Productos</h6>
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

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Agregar
            </Button>
          </div>
        </Form>
      </Modal.Body>

      {/* Modal para agregar un item */}
      <ProductModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddProduct={handleAddProduct}
      />
    </Modal>
  );
};

export default OrderModal;
