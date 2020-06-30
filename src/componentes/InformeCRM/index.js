import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import "./styles.css";

const { Title } = Typography;

export default function InformeCRM() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
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
    <div className="informe-compras">
      <Title>INFORMES CRM</Title>
      <div className="encabezado">
        <Encabezado />
      </div>
      <div className="cuerpo">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 20,
          }}
        />
      </div>
    </div>
  );
}
