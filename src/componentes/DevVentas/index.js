import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import { SaveOutlined, FileOutlined } from "@ant-design/icons";
import Boton from "../Boton";
import "./styles.css";
const { Title } = Typography;

export default function DevVentas() {
  return (
    <div className="dev-ventas">
      <Title>Devolución de Ventas</Title>
      <div className="encabezado">
        <Encabezado />
      </div>
      <div className="cuerpo">
        <Table />
      </div>
      <div className="pie">
        <Boton icon={<SaveOutlined />} text="Guardar" />
        <Boton icon={<FileOutlined />} text="Nuevo" />
      </div>
    </div>
  );
}