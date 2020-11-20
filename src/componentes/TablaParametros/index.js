import React, { useState } from "react";
import { Table, Typography, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import FormularioTarifasIVA from "../FormularioTarifasIVA";
import FormularioPrecios from "../FormularioPrecios";
import FormularioNumeracion from "../FormularioNumeracion";
import { API } from "../../config/keys";

import "./styles.css";

const { Title } = Typography;

function TablaParametros(props) {
  const { titulo, tipo, datos, setDatos, columnas, paginacion } = props;
  const [modal, setModal] = useState(false);
  const [datosIva, setDatosIva] = useState();
  const [datosPrecios, setDatosPrecios] = useState();
  const [datosNumeracion, setDatosNumeracion] = useState();
  const [editar, setEditar] = useState(true);

  const handleOk = async () => {
    let res;

    if (tipo == "tarifas") {
      if (editar) {
        res = await axios.put(API + "parametros/tarifasiva/editar", datosIva, {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        });
      } else {
        const data = datosIva;
        res = await axios.post(
          API + "parametros/tarifasiva/crear",
          { nombre: data.nombre, tarifa: data.tarifa },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
      }
      setDatosIva(res.data);
      setDatos(res.data);
    }

    if (tipo == "precios") {
      if (editar) {
        res = await axios.put(
          API + "parametros/listasprecios/editar",
          datosPrecios,
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
      } else {
        res = await axios.post(
          API + "parametros/listasprecios/crear",
          { nombre: datosPrecios.nombre },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );

        setDatosPrecios(res);
        setDatos(res.data);
      }
    }

    if (tipo == "numeracion") {
      if (editar) {
        res = await axios.put(
          API + "parametros/numeracion/editar",
          datosNumeracion,
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
      } else {
        res = await axios.post(
          API + "parametros/numeracion/crear",
          {
            prefijo: datosNumeracion.prefijo,
            numero: datosNumeracion.numero,
            autorizacion: datosNumeracion.autorizacion,
            fechaautorizacion: datosNumeracion.fechaautorizacion,
            fechavencimiento: datosNumeracion.fechavencimiento,
            extension: datosNumeracion.extension,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );

        setDatosNumeracion(res);
        setDatos(res.data);
      }
    }
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleNuevo = async (e) => {
    if (tipo == "tarifas") await setDatosIva([]);
    if (tipo == "precios") await setDatosPrecios([]);
    if (tipo == "numeracion") await setDatosNumeracion([]);
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
              if (tipo == "tarifas") {
                setDatosIva(record);
                setEditar(true);
                setModal(true);
              }
              if (tipo == "precios") {
                setDatosPrecios(record);
                setEditar(true);
                setModal(true);
              }
              if (tipo == "numeracion") {
                setDatosNumeracion(record);
                setEditar(true);
                setModal(true);
              }
            }, // click row
            onDoubleClick: (event) => {}, // double click row
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
        {tipo === "tarifas" && <FormularioTarifasIVA datos={datosIva} />}
        {tipo === "precios" && <FormularioPrecios datos={datosPrecios} />}
        {tipo === "numeracion" && (
          <FormularioNumeracion datos={datosNumeracion} />
        )}
      </Modal>
    </div>
  );
}
export default TablaParametros;
