import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogProducts } from "../../store/catalogSlide";

import "./ProductModal.css";
import FormInput from "../form/FormInput";

const ProductModal = ({ show, onClose, onAddProduct, selectedProduct }) => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catalog.products);

  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    dispatch(fetchCatalogProducts());

    if (selectedProduct) {
      setProduct(selectedProduct.product);
      setQuantity(selectedProduct.quantity);
      setPrice(selectedProduct.price);
      setDetails(selectedProduct.description);
    } else {
      setProduct("");
      setQuantity("");
      setPrice("");
      setDetails("");
    }
  }, [show, selectedProduct, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newItem = {
      id: selectedProduct ? selectedProduct.id : nanoid(),
      quantity: quantity,
      product: product,
      price: price,
      description: details,
    };
    onAddProduct(newItem);
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
          {selectedProduct ? "Editar Producto" : "Agregar Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormInput
            controlId="formItemProduct"
            as="select"
            value={product}
            onChange={handleProductChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {renderProductOptions()}
          </FormInput>

          <FormInput
            controlId="formItemPrice"
            type="text"
            value={price}
            readOnly
            placeholder="Precio"
            style={{
              backgroundColor: "#f0f0f0",
              color: "#888",
              borderColor: "#ccc",
            }}
          />

          <FormInput
            controlId="formItemQuantity"
            type="number"
            placeholder="Introduzca la Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <FormInput
            controlId="formItemDescription"
            type="text"
            placeholder="Descripción"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Agregar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
