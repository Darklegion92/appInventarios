import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import { SaveOutlined, FileOutlined } from "@ant-design/icons";

import "./styles.css";
const { Title } = Typography;

export default function DevCompras() {
  return (
    <div className="dev-compras">
      <Title>Devolución de Compras</Title>
      <div className="encabezado">
        <Encabezado />
      </div>
      <div className="cuerpo">
        <Table />
      </div>
      <div className="pie">
        
      </div>
    </div>
  );
}
