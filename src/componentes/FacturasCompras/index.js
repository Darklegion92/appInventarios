import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import { SaveOutlined, FileOutlined } from "@ant-design/icons";
import Boton from "../Boton";
import "./styles.css";
const { Title, Text } = Typography;

export default function FacturasCompras() {
  return (
    <div className="facturas-compras">
      <Title>Factura de Compra</Title>
      <div className="encabezado">
        <Encabezado />
      </div>
      <div className="cuerpo">
        <Table />
      </div>
      <div className="pie">
        <div>
          <div>
            <Text>SubTotal:</Text>
            <Text>5000</Text>
          </div>
          <div>
            <Text>IVA:</Text>
            <Text>5000</Text>
          </div>
          <div>
            <Text>Total:</Text>
            <Text>5000</Text>
          </div>
        </div>
        <Boton icon={<SaveOutlined />} text="Guardar" />
        <Boton icon={<FileOutlined />} text="Nuevo" />
      </div>
    </div>
  );
}
