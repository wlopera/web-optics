import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogProducts } from "../../store/catalogSlide";

import "./ProductModal.css";

const ProductModal = ({ show, onClose, onAddProduct }) => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catalog.products);

  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    dispatch(fetchCatalogProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: nanoid(),
      quantity: quantity,
      product: product,
      price: price,
      description: details,
    };
    onAddProduct(newItem);
    setQuantity("");
    setProduct("");
    setPrice("");
    setDetails("");
  };

  const renderProductOptions = () => {
    const options = [];

    for (const category in catalog) {
      options.push(
        <optgroup label={category} key={category}>
          {catalog[category].map((item, index) => (
            <option key={`${category}-${index}`} value={item.name}>
              {item.name} - ${item.price}
            </option>
          ))}
        </optgroup>
      );
    }

    return options;
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);

    // Buscar el precio del producto seleccionado en el catálogo
    let selectedPrice = "";
    for (const category in catalog) {
      const item = catalog[category].find(
        (product) => product.name === selectedProduct
      );
      if (item) {
        selectedPrice = item.price;
        break;
      }
    }
    setPrice(selectedPrice); // Actualiza el precio
  };

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton className="bg-success">
        <Modal.Title className="d-flex justify-content-between align-items-center mb-1 text-white w-100">
          Agregar Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formItemQuantity" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Cantidad"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formItemProduct" className="mb-3">
            <Form.Select
              value={product}
              onChange={handleProductChange}
              required
            >
              <option value="">Seleccione un producto</option>
              {renderProductOptions()}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formItemPrice" className="mb-3">
            <Form.Control
              type="text"
              value={price}
              readOnly
              placeholder="Precio"
              style={{
                backgroundColor: "#f0f0f0", // Gris claro de fondo
                color: "#888", // Gris oscuro para el texto
                borderColor: "#ccc", // Gris en los bordes
              }}

              // className="label-disabled"
            />
          </Form.Group>
          <Form.Group controlId="formItemDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Descripción"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Agregar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
