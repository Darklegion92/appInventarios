import React from "react";
import TablaParametros from "../TablaParametros";
import { Typography } from "antd";
import "./styles.css";
const { Title } = Typography;
export default function Parametros() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="parametros">
      <Title>PARAMETROS FACTURACIÓN</Title>
      <div className="dos">
        <TablaParametros
          titulo="TARIFAS IVA"
          datos={dataSource}
          columnas={columns}
          paginacion={5}
        />
        <TablaParametros
          titulo="LISTA PRECIOS"
          datos={dataSource}
          columnas={columns}
          paginacion={5}
        />
      </div>
      <TablaParametros
        titulo="NUMERACION"
        datos={dataSource}
        columnas={columns}
        paginacion={15}
      />
    </div>
  );
}
