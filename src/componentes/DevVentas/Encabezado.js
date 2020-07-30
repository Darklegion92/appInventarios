import React from "react";
import { Input, Col, Row, Typography } from "antd";

const { Text } = Typography;
const { Search } = Input;

function Encabezado({ onSearch, onChange, nombre, documento, disabledNumero }) {
  return (
    <div>
      <Input.Group>
        <Row gutter={10}>
          <Col span={6}>
            <Text>Factura</Text>
            <Search
              placeholder="Factura"
              onSearch={onSearch}
              onChange={onChange}
              disabled={disabledNumero}
            />
          </Col>
          <Col span={4}>
            <Text>Documento</Text>
            <Input value={documento} disabled />
          </Col>
          <Col span={14}>
            <Text>Nombre</Text>
            <Input value={nombre} disabled />
          </Col>
        </Row>
      </Input.Group>
    </div>
  );
}

export default Encabezado;
