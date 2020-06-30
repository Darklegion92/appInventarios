import React from "react";
import { Input, Col, Row, Typography } from "antd";

const { Text } = Typography;
const { Search } = Input;

export default function Encabezado() {
  return (
    <div>
      <Input.Group>
        <Row gutter={10}>
          <Col span={6}>
            <Text>Factura</Text>
            <Search
              placeholder="Factura"
              onSearch={(value) => console.log(value)}
            />
          </Col>
          <Col span={4}>
            <Text>Documento</Text>
            <Input defaultValue="" disabled />
          </Col>
          <Col span={14}>
            <Text>Nombre</Text>
            <Input defaultValue="" disabled />
          </Col>
        </Row>
      </Input.Group>
    </div>
  );
}
