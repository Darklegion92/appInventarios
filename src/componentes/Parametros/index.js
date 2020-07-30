import React, { useState, useEffect } from "react";
import TablaParametros from "../TablaParametros";
import { Typography, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../config/keys";
import "./styles.css";

const { Title } = Typography;

export default function Parametros() {
  const [tarifasiva, setTarifasiva] = useState();
  const [listasprecios, setListasprecios] = useState();
  const [numeracion, setNumeracion] = useState();
  const [tituloAlerta, setTituloAlerta] = useState();
  const [modalAlerta, setModalAlerta] = useState(false);
  const [iconoAlerta, setIconoAlerta] = useState();
  const [msgAlerta, setMsgAlerta] = useState();

  const handleOkAlerta = () => {
    setModalAlerta(false);
  };

  const cargarDatos = async () => {
    let datostarifasiva;
    let datoslistasprecios;
    let datosnumeracion;
    try {
      datostarifasiva = await axios.get(API + "parametros/tarifasiva", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      datoslistasprecios = await axios.get(API + "parametros/listasprecios", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      datosnumeracion = await axios.get(API + "parametros/numeracion", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });

      if (datostarifasiva.data.length > 0) setTarifasiva(datostarifasiva.data);
      if (datoslistasprecios.data.length > 0)
        setListasprecios(datoslistasprecios.data);
      if (datosnumeracion.data.length > 0) setNumeracion(datosnumeracion.data);
    } catch (e) {
      if (datostarifasiva && datostarifasiva.status === 201) {
        setTituloAlerta("SIN DATOS");
        setMsgAlerta("Tarifas de IVA no creadas");
        setIconoAlerta(
          <ExclamationCircleOutlined
            style={{
              fontSize: "70px",
              color: "orange",
              "margin-right": "10px",
            }}
          />
        );
        setModalAlerta(true);
      } else {
        setTituloAlerta("ERROR IMPORTANTE");
        setMsgAlerta("Se ha presentado un error favor ingresar neuvamente");
        setIconoAlerta(
          <ExclamationCircleOutlined
            style={{
              fontSize: "70px",
              color: "red",
              "margin-right": "10px",
            }}
          />
        );
        setModalAlerta(true);
      }

      console.log("ERROR INTERNO" + e);
    }
  };
  useEffect(() => {
    cargarDatos();
  }, []);

  const coltarifasiva = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Tarifa",
      dataIndex: "tarifa",
      key: "tarifa",
    },
  ];

  const collistaprecios = [
    {
      title: "Número",
      dataIndex: "idlistaprecios",
      key: "numero",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  const colnumeracion = [
    {
      title: "Prefijo",
      dataIndex: "prefijo",
      key: "prefijo",
    },
    {
      title: "Número",
      dataIndex: "numero",
      key: "numero",
    },
    {
      title: "Autorización",
      dataIndex: "autorizacion",
      key: "autorizacion",
    },
    {
      title: "Fecha Inicial",
      dataIndex: "fechaautorizacion",
      key: "fechainicial",
    },
    {
      title: "Fecha Final",
      dataIndex: "fechavencimiento",
      key: "fechafinal",
    },
  ];

  return (
    <div className="parametros">
      <Title>PARAMETROS FACTURACIÓN</Title>
      <div className="dos">
        <TablaParametros
          titulo="TARIFAS IVA"
          datos={tarifasiva}
          setDatos={setTarifasiva}
          columnas={coltarifasiva}
          paginacion={5}
          tipo="tarifas"
        />
        <TablaParametros
          titulo="LISTA PRECIOS"
          datos={listasprecios}
          setDatos={setListasprecios}
          columnas={collistaprecios}
          paginacion={5}
          tipo="precios"
        />
      </div>
      <TablaParametros
        titulo="NUMERACION"
        datos={numeracion}
        columnas={colnumeracion}
        setDatos={setNumeracion}
        paginacion={15}
        tipo="numeracion"
      />
      <Modal
        title={tituloAlerta}
        visible={modalAlerta}
        onOk={handleOkAlerta}
        cancelButtonProps={{ disabled: true }}
        bodyStyle={{
          display: "flex",
          "align-items": "center",
          "justify-content": "space-evenly",
          "font-size": "25px",
        }}
      >
        {iconoAlerta}
        {msgAlerta}
      </Modal>
    </div>
  );
}
