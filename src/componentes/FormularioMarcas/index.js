import React, { useState, useEffect } from "react";
import { Input } from "antd";

import "./styles.css";

const FormularioGrupos = (props) => {
  const { nombre, setNombre } = props;

  const onChangeNombre = (e) => {
    const { value } = e.target;
    setNombre(value);
  };
  return (
    <div className="formulario-grupos">
      <Input
        value={nombre}
        placeholder="Nombre Marca"
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  );
};

export default FormularioGrupos;
