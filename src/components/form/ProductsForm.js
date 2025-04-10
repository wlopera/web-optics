import React, { useState } from "react";
import { FaSearch, FaTrashAlt, FaPlus } from "react-icons/fa";
import GenericTable from "../table/GenericTable";
import ProductModal from "../modal/ProductModal";

const ProductsForm = ({ products, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const columns = [
    { accessor: "product", Header: "Producto", align: "left" },
    { accessor: "price", Header: "Precio", align: "left" },
    { accessor: "quantity", Header: "Cantidad", align: "center" },
    { accessor: "description", Header: "Descripción", align: "center" },
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
    padding: "2px",
    textAlign: "left",
  });

  const onSearch = (row) => {
    setSelectedProduct(row); // Establece el producto a editar
    setShowModal(true);
  };

  const onDelete = (row) => {
    const filter = products.filter((item) => item.id !== row.id);
    setProducts(filter);
  };

  const actions = {
    title: "Acciones",
    record: [
      { icon: FaSearch, onClick: onSearch },
      { icon: FaTrashAlt, onClick: onDelete },
    ],
  };

  const mainAction = {
    title: "Artículos de la compra",
    record: {
      icon: FaPlus,
      onClick: () => setShowModal(true),
    },
  };

  const resetModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = (newProduct) => {
    if (selectedProduct) {
      // Si hay un producto seleccionado, actualizamos el producto
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? newProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // Si no hay producto seleccionado, lo agregamos a la lista
      setProducts([...products, newProduct]);
    }
    resetModal();
  };

  const totalPrice = products
    .reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    )
    .toFixed(2);

  return (
    <>
      <GenericTable
        columns={columns}
        rows={products}
        columnStyle={columnStyle}
        rowStyle={rowStyle}
        mainAction={mainAction}
        actions={actions}
      />
      {totalPrice > 0 && (
        <div
          className="bg-success text-white px-3 py-1 mt-1"
          style={{
            textAlign: "right",
            width: "98%",
            margin: "auto",
          }}
        >
          Total: ${totalPrice}
        </div>
      )}

      <ProductModal
        show={showModal}
        onClose={resetModal}
        onAddProduct={handleAddProduct}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default ProductsForm;
