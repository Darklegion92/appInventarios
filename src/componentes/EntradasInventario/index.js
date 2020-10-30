import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { Typography, Col, Row } from "antd";
import axios from "axios";
import { Modal, Button } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Tabla from "./Tabla";
import Encabezado from "./Encabezado";
import FormatoFactura from "./FormatoFactura";
import Pie from "./Pie";
import { GlobalContext } from "../../context/GlobalContext";
import { API } from "../../config/keys";

import "./styles.css";
const { Title } = Typography;

function FacturasVentas() {
  const {
    bodegas,
    entrada,
    cargarParametros,
    articulos,
    articulosCodigo,
  } = useContext(GlobalContext);
  useEffect(() => {
    cargarParametros();
  }, []);

  return (
    <Row justify="center" gutter={[0, 16]}>
      <Col span={20}>
        <Row justify="center">
          <Title>Entradas Inventarios</Title>
        </Row>
        <Encabezado
          bodegas={bodegas}
          articulos={articulos}
          articulosCodigo={articulosCodigo}
        />
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Tabla datos={entrada.items} />
          </Col>
        </Row>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Pie datosEntrada={entrada.items} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default FacturasVentas;
