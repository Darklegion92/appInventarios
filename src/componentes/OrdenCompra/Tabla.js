import React from "react";
import { Table } from "antd";

function Tabla(props) {
  const { datos, onDoubleClick } = props;

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigoarticulo",
      key: "codigoarticulo",
    },
    {
      title: "Descripción",
      dataIndex: "descripcionarticulo",
      key: "descripcionarticulo",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidadarticulo",
      key: "cantidadarticulo",
    },
    {
      title: "Valor Uni.",
      dataIndex: "valorarticulo",
      key: "valorarticulo",
      className: "column-money",
    },
    {
      title: "IVA",
      dataIndex: "ivaarticulo",
      key: "ivaarticulo",
      className: "column-money",
    },
    {
      title: "Valor Total",
      dataIndex: "valortotal",
      key: "valortotal",
      className: "column-money",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={datos}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {}, // click row
          onDoubleClick: (event) => {
            onDoubleClick(rowIndex);
          }, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => {}, // mouse enter row
          onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
    />
  );
}
export default Tabla;
