import React, { useState, useEffect } from "react";
import { Input } from "antd";

import "./styles.css";

const FormularioGrupos = (props) => {
  const { nombre, setNombre, idGrupo } = props;

  const onChangeNombre = (e) => {
    const { value } = e.target;
    setNombre(value);
  };
  return (
    <div className="formulario-grupos">
    <Input
        value={idGrupo}
        placeholder="Nombre Grupo"
        maxLength={20}
        disabled
      />
      <Input
        value={nombre}
        placeholder="Nombre Grupo"
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  );
};

export default FormularioGrupos;
