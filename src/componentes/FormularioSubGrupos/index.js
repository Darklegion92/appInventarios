import React, { useState, useEffect } from "react";
import { Input, Select, Typography } from "antd";

import "./styles.css";
const { Option } = Select;
const { Text } = Typography;

const FormularioGrupos = (props) => {
  const { datos, setDatos, grupos } = props;
  const [subgrupo, setSubgrupo] = useState({});

  useEffect(() => {
    setSubgrupo(datos.nombre);
  }, [datos]);

  const onChangeNombre = (e) => {
    setSubgrupo(e.target.value);
    let data = datos;
    data.nombre = e.target.value;
    setDatos(data);
  };
  const onChangeGrupo = (e) => {
    let data = datos;
    data.idgrupo = e;
    setDatos(data);
  };

  return (
    <div className="formulario-grupos">
      <Text>Grupo</Text>
      <Select
        value={datos.nombregrupo}
        onChange={onChangeGrupo}
        placeholder="Nombre Grupo"
        maxLength={20}
        disabled={datos.nombre ? true : false}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {grupos &&
          grupos.map((grupo) => {
            return <Option key={grupo.idgrupo}>{grupo.nombre}</Option>;
          })}
      </Select>
      <Text>Nombre Subgrupo</Text>
      <Input
        value={subgrupo}
        placeholder="Nombre Grupo"
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  );
};

export default FormularioGrupos;
