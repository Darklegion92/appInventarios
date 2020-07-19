import React, { useState, useEffect } from "react";
import { Typography, Table, Button, Modal } from "antd";
import { EditOutlined, FileOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

import Encabezado from "./Encabezado";
import FormularioProveedor from "../FormularioProveedor";
import { API } from "../../config/keys";
import "./styles.css";
const { Title } = Typography;

export default function Proveedores() {
  const [titulo, setTitulo] = useState("NUEVO PROVEEDOR");
  const [modal, setModal] = useState(false);
  const [tiposDocumento, setTiposDocumento] = useState();
  const [regimenes, setRegimenes] = useState();
  const [datosEnvio, setDatosEnvio] = useState();
  const [datosEditar, setDatosEditar] = useState();
  const [datosTabla, setDatosTabla] = useState();
  const [editar, setEditar] = useState(false);

  const cargarDatos = async () => {
    try {
      const datosTipoDocumento = await axios.get(
        API + "parametros/tiposdocumento",
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );
      if (datosTipoDocumento.status === 200) {
        let datos = [];
        datosTipoDocumento.data.map((dato) => {
          datos.push({ id: dato.idtipo_documento, dato: dato.prefijo });
        });

        setTiposDocumento(datos);
      }
      const datosRegimenes = await axios.get(API + "parametros/regimenes", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      if (datosRegimenes.status === 200) {
        let datos = [];
        datosRegimenes.data.map((dato) => {
          datos.push({ id: dato.idregimen, dato: dato.nombre });
        });
        setRegimenes(datos);
      }

      const datosProveedores = await axios.get(API + "proveedores/", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      if (datosProveedores.status === 200) {
        setDatosTabla(datosProveedores.data);
      }
    } catch (e) {
      localStorage.clear();
      sessionStorage.clear();
    }
  };
  useEffect(() => {
    cargarDatos();
  }, [datosEnvio]);

  const onClickNuevo = (e) => {
    setTitulo("NUEVO PROVEEDOR");
    setEditar(false);
    setModal(true);
  };
  const handleOk = (e) => {
    datosEnvio.idproveedor = datosEditar.idproveedor;
    if (editar) {
      const res = axios.put(API + "proveedores/editar", datosEnvio, {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      if (res.status === 200) {
        setDatosTabla(res.data);
      }
    } else {
      const res = axios.post(
        API + "proveedores/crear",
        {
          idtipo_documento: datosEnvio.idtipo_documento,
          documento: datosEnvio.documento,
          razonsocial: datosEnvio.razonsocial,
          nombres: datosEnvio.nombres,
          apellidos: datosEnvio.apellidos,
          direccion: datosEnvio.direccion,
          telefono: datosEnvio.telefono,
          correo: datosEnvio.correo,
          idregimen: datosEnvio.idregimen,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );
      if (res.status === 200) {
        setDatosTabla(res.data);
        setDatosEditar([]);
      }
    }

    setModal(false);
  };
  const handleCancel = (e) => {
    setModal(false);
  };
  const columns = [
    {
      title: "Tipo Doc",
      dataIndex: "documento",
      key: "documento",
    },
    {
      title: "Nombres",
      dataIndex: "nombres",
      key: "nombres",
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Régimen",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  return (
    <div className="proveedores">
      <Title>Proveedores</Title>
      <div className="encabezado">
        <Encabezado setDatosTabla={setDatosTabla} />
      </div>
      <div className="cuerpo">
        <Table
          dataSource={datosTabla}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setTitulo("EDITAR PROVEEDOR");
                setDatosEditar(record);
                setEditar(true);
                setModal(true);
              }, // click row
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        />
      </div>
      <div className="pie">
        <Button
          type="primary"
          shape="round"
          icon={<FileOutlined />}
          size={"large"}
          onClick={onClickNuevo}
        >
          NUEVO
        </Button>
      </div>
      <Modal
        title={titulo}
        visible={modal}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ width: 1000 }}
      >
        <FormularioProveedor
          regimenes={regimenes}
          tiposDocumento={tiposDocumento}
          setDatos={setDatosEnvio}
          datos={datosEditar}
        />
      </Modal>
    </div>
  );
}
