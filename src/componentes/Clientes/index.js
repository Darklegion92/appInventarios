import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import { EditOutlined, FileOutlined, DeleteOutlined } from "@ant-design/icons";
import Boton from "../Boton";
import "./styles.css";
const { Title } = Typography;

export default function Clientes() {
  return (
    <div className="clientes">
      <Title>Clientes</Title>
      <div className="encabezado">
        <Encabezado />
      </div>
      <div className="cuerpo">
        <Table />
      </div>
      <div className="pie">
        <Boton icon={<EditOutlined />} text="Editar" />
        <Boton icon={<DeleteOutlined />} text="Inactivar" />
        <Boton icon={<FileOutlined />} text="Nuevo" />
      </div>
    </div>
  );
}
