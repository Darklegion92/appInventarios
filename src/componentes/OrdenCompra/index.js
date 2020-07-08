import React from "react";
import { Typography, Table } from "antd";
import Encabezado from "./Encabezado";
import { SaveOutlined, FileOutlined } from "@ant-design/icons";
import "./styles.css";
const { Title, Text } = Typography;

export default function OrdenCompras() {
  return (
    <div className="orden-compras">
      <Title>Orden de Pedido</Title>
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
       
      </div>
    </div>
  );
}
