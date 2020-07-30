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
  const [documento, setDocumento] = useState();
  const [idtipo_documento, setIdTipo_documento] = useState();
  const [razonsocial, setRazonSocial] = useState();
  const [nombres, setNombres] = useState();
  const [apellidos, setApellidos] = useState();
  const [direccion, setDireccion] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [idregimen, setidRegimen] = useState();
  const [regimen, setRegimen] = useState({
    key: 0,
    value: "Seleccione...",
  });
  const [documentoTipo, setDocumentoTipo] = useState({
    key: 0,
    value: "",
  });
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
  const handleOk = async (e) => {
    if (editar) {
      datosEnvio.idproveedor = datosEditar.idproveedor;
      const res = await axios.put(API + "proveedores/editar", datosEnvio, {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      if (res.status === 200) {
        setDatosTabla(res.data);
        limpiarDatos();
      }
    } else {
      const res = await axios.post(
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
        limpiarDatos();
      }
    }
  };
  const handleCancel = (e) => {
    limpiarDatos();
  };

  const limpiarDatos = () => {
    setModal(false);
    setRegimenes();
    setDatosEnvio({});
    setDatosEditar({});
    setDocumento();
    setIdTipo_documento();
    setRazonSocial();
    setNombres();
    setApellidos();
    setDireccion();
    setTelefono();
    setCorreo();
    setidRegimen();
    setRegimen({
      key: 0,
      value: "Seleccione...",
    });
    setDocumentoTipo({
      key: 0,
      value: "",
    });
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
          documento={documento}
          idtipo_documento={idtipo_documento}
          razonsocial={razonsocial}
          nombres={nombres}
          apellidos={apellidos}
          direccion={direccion}
          telefono={telefono}
          correo={correo}
          idregimen={idregimen}
          regimen={regimen}
          documentoTipo={documentoTipo}
          setDocumento={setDocumento}
          setRazonSocial={setRazonSocial}
          setNombres={setNombres}
          setTelefono={setTelefono}
          setCorreo={setCorreo}
          setApellidos={setApellidos}
          setDireccion={setDireccion}
          setidRegimen={setidRegimen}
          setIdTipo_documento={setIdTipo_documento}
          setDocumentoTipo={setDocumentoTipo}
          setRegimen={setRegimen}
        />
      </Modal>
    </div>
  );
}
