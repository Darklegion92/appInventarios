import React, { useState, useEffect } from "react";
import { Input } from "antd";

import "./styles.css";

const FormularioGrupos = (props) => {
  const { datos, setDatos } = props;
  const [grupo, setGrupo] = useState();
  useEffect(() => {
    setGrupo(datos.nombre);
  }, [datos]);

  const onChangeNombre = (e) => {
    const { value } = e.target;
    setGrupo(value);
    let data = datos;
    data.nombre = e.target.value;
    setDatos(data);
  };
  return (
    <div className="formulario-grupos">
      <Input
        value={grupo}
        placeholder="Nombre Grupo"
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  );
};

export default FormularioGrupos;
