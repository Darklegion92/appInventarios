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
    <div className="agrupaciones">
    <Title>AGRUPACIONES ARTÍCULOS</Title>
      <div className="dos">
        <TablaParametros
          titulo="GRUPO"
          datos={dataSource}
          columnas={columns}
          paginacion={5}
        />
        <TablaParametros
          titulo="SUB GRUPO"
          datos={dataSource}
          columnas={columns}
          paginacion={5}
        />
      </div>
      <TablaParametros
        titulo="MARCA"
        datos={dataSource}
        columnas={columns}
        paginacion={15}
      />
    </div>
  );
}
