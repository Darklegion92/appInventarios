import React, { useState, useEffect } from "react";
import { Input } from "antd";

import "./styles.css";

const FormularioGrupos = (props) => {
  const { datos, setDatos } = props;
  const [marca, setMarca] = useState();

  useEffect(() => {
    setMarca(datos.nombre);
  }, [datos]);

  const onChangeNombre = (e) => {
    setMarca(e.target.value);
    let data = datos;
    data.nombre = e.target.value;
    setDatos(data);
  };
  return (
    <div className="formulario-grupos">
      <Input
        value={marca}
        placeholder="Nombre Marca"
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  );
};

export default FormularioGrupos;
