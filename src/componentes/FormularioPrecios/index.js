import React, { useState, useEffect } from "react";
import { Input } from "antd";

const FormularioTarifasIVA = (props) => {
  const { datos } = props;
  const [nombre, setNombre] = useState();

  useEffect(() => {
    if (datos) {
      setNombre(datos.nombre);
    }
  }, [datos.nombre]);

  const onChangeNombre = (e) => {
    const { value } = e.target;
    datos.nombre = value;
    setNombre(value);
  };
  return (
    <Input
      onChange={onChangeNombre}
      placeholder="Nombre Lista Precios"
      maxLength={45}
      value={nombre}
    />
  );
};

export default FormularioTarifasIVA;
