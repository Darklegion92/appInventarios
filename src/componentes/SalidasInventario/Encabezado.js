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
            <Input defaultValue="INV" disabled />
          </Col>
          <Col span={3}>
            <Text>Número</Text>
            <Input defaultValue="000000" disabled />
          </Col>
          <Col span={14}>
            <Text>Observación</Text>
            <Input defaultValue="" />
          </Col>
        </Row>
      </Input.Group>
    </div>
  );
}
