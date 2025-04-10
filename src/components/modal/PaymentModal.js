import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PaymentModal = ({ show, onClose, onAddPayment }) => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const handleSubmit = () => {
    onAddPayment({
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      amount,
      method,
    });
    setAmount("");
    setMethod("");
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Método de pago</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. Efectivo, Tarjeta"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Agregar Pago
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
