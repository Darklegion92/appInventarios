import React, { useState, useEffect } from "react";
import { Input, Typography } from "antd";

import "./styles.css";

const { Text } = Typography;
const FormularioSucursal = (props) => {
  const { setDatos, datos } = props;
  const [sucursal, setSucursal] = useState();

  useEffect(() => {
    setSucursal(datos.nombre);
  }, [datos]);

  const onChangeNombre = (e) => {
    setSucursal(e.target.value);
    let data = datos;
    data.nombre = e.target.value;
    setDatos(data);
  };

  return (
    <div className="formulario-grupos">
      <Text>Bodega</Text>
      <Input
        value={sucursal}
        placeholder="Nombre Bodega"
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  );
};

export default FormularioSucursal;
