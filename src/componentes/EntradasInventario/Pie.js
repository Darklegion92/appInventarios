import React, { useState, useEffect } from "react";
import { Typography, Button, Row, Col, Input } from "antd";

const { Text } = Typography;
const { TextArea } = Input;
const styleTextos = {
  fontSize: "20px",
};
function Pie({ datosEntrada, setOnClick, limpiarCampos }) {
  const [total, setTotal] = useState(0);
  const [observacion, setObservacion] = useState("");

  useEffect(() => {
    let cant = 0;
    datosEntrada.forEach((dato) => {
      cant += dato.valortotal;
    });
    setTotal(cant);
  }, [datosEntrada]);

  const onChange = (e) => {
    setObservacion(e.target.value);
  };

  const onClick = () => {
    setOnClick(observacion);
  };
  return (
    <Row align="middle" justify="center" gutter={10}>
      <Col span={8}>
        <Row gutter={16} align="middle" justify="center">
          <Col span={16}>
            <Text style={styleTextos} strong>
              Cantidad Items:
            </Text>
          </Col>
          <Col span={8}>
            <Text style={styleTextos} strong>
              {datosEntrada.length}
            </Text>
          </Col>
        </Row>
        <Row gutter={16} align="middle" justify="center">
          <Col span={16}>
            <Text style={styleTextos} strong>
              Total Entrada:
            </Text>
          </Col>
          <Col span={8}>
            <Text style={styleTextos} strong>
              {total}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <img src="img/logo.png" alt="logo" />
      </Col>
      <Col span={4}>
        <Row>
          <Text>Observación:</Text>
        </Row>
        <Row>
          <TextArea onChange={onChange} value={observacion} />
        </Row>
      </Col>
      <Col span={4}>
        <Row gutter={10} align="top" justify="center">
          <Button type="primary" shape="round" onClick={onClick}>
            GUARDAR
          </Button>
        </Row>
        <Row gutter={10} align="bottom" justify="center">
          <Button
            type="primary"
            shape="round"
            danger
            style={{ marginTop: "10px" }}
            onClick={limpiarCampos}
          >
            CANCELAR
          </Button>
        </Row>
      </Col>
    </Row>
  );
}

export default Pie;
