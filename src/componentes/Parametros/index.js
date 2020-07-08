import React, { useState, useEffect } from "react";
import TablaParametros from "../TablaParametros";
import { Typography } from "antd";
import axios from "axios";
import { API } from "../../config/keys";
import "./styles.css";

const { Title } = Typography;

export default function Parametros() {
  const [parametros, setParametros] = useState([]);
  const cargarDatos = async () => {
    try {
      const datostarifasiva = await axios.get(API + "parametros/tarifasiva", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      const datoslistasprecios = await axios.get(
        API + "parametros/listasprecios",
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );
      const datosnumeracion = await axios.get(API + "parametros/numeracion", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      setParametros({
        tarifasiva: datostarifasiva.data,
        listasprecios: datoslistasprecios.data,
        numeracion: datosnumeracion.data,
      });
    } catch (e) {
      console.log("alerta error " + e);
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
          datos={parametros.tarifasiva}
          columnas={coltarifasiva}
          paginacion={5}
          tipo="tarifas"
        />
        <TablaParametros
          titulo="LISTA PRECIOS"
          datos={parametros.listasprecios}
          columnas={collistaprecios}
          paginacion={5}
          tipo="precios"
        />
      </div>
      <TablaParametros
        titulo="NUMERACION"
        datos={parametros.numeracion}
        columnas={colnumeracion}
        paginacion={15}
        tipo="numeracion"
      />
    </div>
  );
}
