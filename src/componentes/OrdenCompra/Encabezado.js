import React from "react";
import { Input, Col, Row, Typography } from "antd";

const { Text } = Typography;

export default function Encabezado() {
  return (
    <div>
      <Input.Group>
        <Row gutter={10}>
          <Col span={2}>
            <Text>Prefijo</Text>
            <Input defaultValue="FV" disabled />
          </Col>
          <Col span={3}>
            <Text>Número</Text>
            <Input defaultValue="000000" disabled />
          </Col>
          <Col span={4}>
            <Text>Documento</Text>
            <Input defaultValue="000000" />
          </Col>
          <Col span={14}>
            <Text>Nombre</Text>
            <Input defaultValue="" disabled />
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={3}>
            <Text>Código</Text>
            <Input defaultValue="" />
          </Col>
          <Col span={10}>
            <Text>Descripción</Text>
            <Input defaultValue="" />
          </Col>
          <Col span={2}>
            <Text>Valor Un.</Text>
            <Input defaultValue="" disabled />
          </Col>
          <Col span={2}>
            <Text>Cantidad</Text>
            <Input defaultValue="0"/>
          </Col>
          <Col span={3}>
            <Text>Total</Text>
            <Input defaultValue="" disabled />
          </Col>
        </Row>
      </Input.Group>
    </div>
  );
}
