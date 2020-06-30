import React from "react";
import { Table, Typography, Button } from "antd";

import "./styles.css";

const { Title } = Typography;

export default function tabla(props) {
  const { titulo, datos, columnas, paginacion } = props;

  return (
    <div className="tabla-datos">
      <Title>{titulo}</Title>
      <Table
        columns={columnas}
        dataSource={datos}
        pagination={{ position: ["bottomCenter"], defaultPageSize: paginacion }}
      />
      <Button shape="round" type="primary">
        Guardar
      </Button>
      <Button shape="round" type="primary" danger>
        Cancelar
      </Button>
    </div>
  );
}
