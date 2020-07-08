import React from "react";
import { Typography, Switch } from "antd";
import Tabla from "../Tabla";
import InputText from "../InputText";
import Combo from "../Combo";
import Precios from "./Precios";

import "./styles.css";
const { Title } = Typography;
function FormularioArticulos(props) {
  const {
    codigo,
    setCodigo,
    datosTarifa,
    setDescripcion,
    descripcion,
    datosGrupo,
    datosSubgrupo,
    datosMarca,
    onChangeGrupo,
    onChangeMarca,
    onChangeSubgrupo,
    onChangeTarifas,
    datosListas,
    onChangeEstado,
    valor,
    setValor,
    okButton,
    setLista,
    datosPrecios,
    lista,
    editarPrecio,
    grupo,
    subgrupo,
    marca,
    tarifa,
    estado,
  } = props;

  const colnprecios = [
    {
      title: "Nombre Lista",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
  ];

  return (
    <div className="form-articulos">
      <div>
        <InputText
          text="Código"
          size
          onChange={(e) => {
            setCodigo(e.target.value);
          }}
          value={codigo}
          size={{ width: 150 }}
        />
        <InputText
          text="Descripción"
          size
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          value={descripcion}
          size={{ width: 300 }}
        />
      </div>
      <div>
        <Combo
          datos={datosMarca}
          onChange={onChangeMarca}
          valor={marca}
          titulo="Marca"
          size={{ width: 140 }}
        />

        <Combo
          datos={datosGrupo}
          titulo="Grupo"
          size={{ width: 140 }}
          onChange={onChangeGrupo}
          valor={grupo}
        />
        <Combo
          datos={datosSubgrupo}
          onChange={onChangeSubgrupo}
          titulo="SubGrupo"
          size={{ width: 140 }}
          valor={subgrupo}
        />
      </div>
      <div>
        <Combo
          datos={datosTarifa}
          onChange={onChangeTarifas}
          titulo="Tarifas IVA"
          size={{ width: 250 }}
          valor={tarifa}
        />
        <Switch
          checkedChildren="Activo"
          unCheckedChildren="Inactivo"
          onChange={onChangeEstado}
          checked={estado}
        />
      </div>

      <Title level={4}>Precios</Title>
      <div className="tabla">
        <Tabla
          columnas={colnprecios}
          paginacion={4}
          datos={datosPrecios}
          Componente={
            <Precios
              datos={datosListas}
              valor={valor}
              setValor={setValor}
              setLista={setLista}
              lista={lista}
            />
          }
          okButton={okButton}
          edicion={editarPrecio}
        />
      </div>
    </div>
  );
}
export default FormularioArticulos;
