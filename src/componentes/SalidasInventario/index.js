import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import { SaveOutlined, FileOutlined } from "@ant-design/icons";
import "./styles.css";
const { Title } = Typography;

export default function SalidasInventario() {
  return (
    <div className="salidas-inventario">
      <Title>Salidas Inventario</Title>
      <div className="encabezado">
        <Encabezado />
      </div>
      <div className="cuerpo">
        <Table />
      </div>
      <div className="pie"></div>
    </div>
  );
}
