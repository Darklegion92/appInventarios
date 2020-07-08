import React, { useState } from "react";
import { Table, Typography, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./styles.css";

const { Title } = Typography;

function TablaParametros(props) {
  const {
    titulo,
    datos,
    columnas,
    paginacion,
    onClick,
    okButton,
    Componente,
    edicion,
  } = props;
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);

  const handleOk = async () => {
    okButton(editar);
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleNuevo = async (e) => {
    setEditar(false);
    setModal(true);
  };

  return (
    <div className="tabla-datos">
      <div className="encabezado">
        <Title>{titulo}</Title>
        <Button
          shape="circle"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleNuevo}
        />
      </div>

      <Table
        columns={columnas}
        dataSource={datos}
        pagination={{ position: ["bottomCenter"], defaultPageSize: paginacion }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (onClick) {
                onClick(record);
              }
            }, // click row
            onDoubleClick: (event) => {
              if (edicion) {
                edicion(record);
                setEditar(true);
                setModal(true);
              }
            }, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      />
      <Modal
        title={titulo}
        visible={modal}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {Componente}
      </Modal>
    </div>
  );
}
export default TablaParametros;
