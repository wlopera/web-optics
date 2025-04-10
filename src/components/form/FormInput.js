// components/FormInput.js
import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

const FormInput = ({
  controlId,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  as, // Para admitir "select" u otros
  children, // Para opciones de un select
  className = "mb-3",
  ...rest
}) => {
  const inputRef = useRef();

  // Validación personalizada
  useEffect(() => {
    if (required && inputRef.current) {
      inputRef.current.setCustomValidity("");
      if (!inputRef.current.validity.valid) {
        inputRef.current.setCustomValidity("Este campo es obligatorio");
      }
    }
  }, [required, value]);

  return (
    <Form.Group controlId={controlId} className={className}>
      <Form.Control
        ref={inputRef}
        type={type}
        as={as}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...rest}
      >
        {children}
      </Form.Control>
    </Form.Group>
  );
};

export default FormInput;
