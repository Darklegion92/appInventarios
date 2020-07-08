import React from "react";
import { Table } from "antd";

function Tabla(props) {
  const { datos, onClick } = props;
  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Grupo",
      dataIndex: "nombregrupo",
      key: "nombregrupo",
    },
    {
      title: "Sub-Grupo",
      dataIndex: "nombresubgrupo",
      key: "nombresubgrupo",
    },
    {
      title: "Marca",
      dataIndex: "nombremarca",
      key: "nombremarca",
    },
    {
      title: "Lista 1",
      dataIndex: "valor",
      key: "valor",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={datos}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            onClick(record);
          }, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => {}, // mouse enter row
          onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
    />
  );
}
export default Tabla;
