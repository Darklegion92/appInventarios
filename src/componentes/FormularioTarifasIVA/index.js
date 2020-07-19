import React, { useState, useEffect } from "react";
import { Input } from "antd";

const FormularioTarifasIVA = (props) => {
  const { datos } = props;
  const [tarifa, setTarifa] = useState();
  const [nombre, setNombre] = useState();

  useEffect(() => {
    if (datos) {
      setTarifa(datos.tarifa);
    }
  }, [datos.tarifa]);

  useEffect(() => {
    if (datos) {
      setNombre(datos.nombre);
    }
  }, [datos.nombre]);

  const onChangeTarifa = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      datos.tarifa = value;
      setTarifa(value);
    }
  };
  const onChangeNombre = (e) => {
    const { value } = e.target;
    datos.nombre = value.toUpperCase();
    setNombre(value.toUpperCase());
  };
  return (
    <>
      <Input
        value={nombre}
        placeholder="Nombre Tarifa IVA"
        maxLength={20}
        onChange={onChangeNombre}
      />

      <Input
        onChange={onChangeTarifa}
        placeholder="Valor Tarifa IVA"
        maxLength={11}
        value={tarifa}
      />
    </>
  );
};

export default FormularioTarifasIVA;
