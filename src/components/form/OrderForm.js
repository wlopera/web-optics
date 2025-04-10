import FormInput from "./FormInput";

const OrderForm = ({ data, onChange }) => {
  return (
    <>
      <FormInput
        controlId="formClient"
        placeholder="Nombre del cliente"
        value={data.client}
        onChange={(e) => onChange("client", e.target.value)}
        required
      />
      <FormInput
        controlId="formDescription"
        placeholder="Descripción"
        value={data.description}
        onChange={(e) => onChange("description", e.target.value)}
      />
      <FormInput
        controlId="formTotal"
        type="number"
        placeholder="Precio total"
        value={data.total}
        onChange={(e) => onChange("total", e.target.value)}
        required
      />
      <FormInput
        controlId="formStatus"
        as="select"
        value={data.status}
        onChange={(e) => onChange("status", e.target.value)}
      >
        <option>ABONADO</option>
        <option>PAGADO</option>
        <option>PENDIENTE</option>
        <option>CANCELADO</option>
        <option>RETIRADO</option>
      </FormInput>
    </>
  );
};

export default OrderForm;
