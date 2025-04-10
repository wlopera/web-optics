// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Sales from "./views/sales/Sales";
import AddSales from "./views/sales/add/AddSales";
import Products from "./views/products/Products";
import Clients from "./views/clients/Clients";
import Reports from "./views/reports/Reports";

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/add" element={<AddSales />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
