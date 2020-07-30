import React, { useState } from "react";
import { Table, Typography, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./styles.css";

function Tabla(props) {
  const { datos, onDoubleClick } = props;
  const [modal, setModal] = useState(false);

  const handleOk = async () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const columnas = [
    {
      title: "Código",
      dataIndex: "codigoarticulo",
      key: "codigoarticulo",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcionarticulo",
      key: "descripcionarticulo",
    },
    {
      title: "Cant.",
      dataIndex: "cantidadarticulo",
      key: "cantidadarticulo",
    },
    {
      title: "Valor Unt.",
      dataIndex: "valorarticulo",
      key: "valorarticulo",
    },
    {
      title: "Valor Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div className="tabla-datos">
      <Table
        columns={columnas}
        dataSource={datos}
        pagination={{ position: ["bottomCenter"], defaultPageSize: 5 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {}, // click row
            onDoubleClick: (event) => {
              onDoubleClick(rowIndex,record);
            }, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      />
      <Modal
        title="Agregar Artículo"
        visible={modal}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
}
export default Tabla;
