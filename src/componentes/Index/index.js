import React from "react";
import { Typography } from "antd";
import "./styles.css";

const { Title } = Typography;
export default function index() {
  return (
    <div className="index">
      <img src="img/logo.png" alt="logoGrande" />
      <Title>Tecnología y Desarrollo</Title>
      <a href="##">www.tecnologiaydesarrollo.com.co</a>
    </div>
  );
}
