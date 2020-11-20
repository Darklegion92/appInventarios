import React from "react";
import { Input, Select } from "antd";

import "./styles.css";

const { Option } = Select;

const FormularioBodegas = (props) => {
  const { setDatos, datos, sucursales } = props;

  const onChangeNombre = (e) => {
    const { value } = e.target;
    //setDatos({id});
  };
  console.log(datos);
  return (
    <div className="formulario-grupos">
      <Input
        value={datos.nombre}
        placeholder="Nombre Bodega"
        maxLength={20}
        onChange={onChangeNombre}
      />
      <Select defaultValue={datos.nombresucursal} style={{ width: "100%" }}>
        {sucursales &&
          sucursales.map((sucursal) => {
            return <Option key={sucursal.id}>{sucursal.nombre}</Option>;
          })}
      </Select>
    </div>
  );
};

export default FormularioBodegas;
