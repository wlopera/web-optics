/**
 * SERVICIOS ORDENES (DUMMY)
 */

// Simula una llamada a la API que devuelve las ordenes
export const getOrderAll = async () => {
  return Promise.resolve([
    {
      id: 1,
      date: "24/04/2024",
      client: "Santiago Pérez",
      description: "Gotas para lentes",
      total: "20.00",
      status: "CANCELADO",
    },
    {
      id: 2,
      date: "10/08/2024",
      client: "María García",
      total: "220.00",
      description: "Compra de lentes de contacto",
      status: "ABONADO",
    },
    {
      id: 3,
      date: "02/02/2025",
      client: "Juan López",
      total: "20.00",
      description: "Lentes multifocales",
      status: "PAGADO",
    },
    {
      id: 4,
      date: "18/02/2025",
      client: "Laura Torres",
      total: "20.00",
      description: "Compra de lenetes de sol",
      status: "PENDIENTE",
    },
    {
      id: 5,
      date: "07/03/2025",
      client: "Pedro Ramos",
      total: "175.00",
      description: "Compras varias",
      status: "ABONADO",
    },
  ]);
};

// Simula una llamada a la API que agrega una nueva orden
export const postOrder = async (newSale) => {
  // Simulamos que el servicio responde con la venta agregada
  return Promise.resolve({
    id: newSale.id,
    date: newSale.date,
    client: newSale.client,
    description: newSale.description,
    total: newSale.total,
    status: newSale.status,
  });
};
