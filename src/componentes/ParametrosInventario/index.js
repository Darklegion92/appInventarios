import React, { useState, useEffect, useContext } from "react";
import { Typography } from "antd";
import axios from "axios";
import TablaParametros from "../Tabla";
import FormularioBodegas from "../FormularioBodega";
import FormularioSucursales from "../FormularioSucursal";
import { GlobalContext } from "../../context/GlobalContext";
import { API } from "../../config/keys";

import "./styles.css";
const { Title } = Typography;

export default function Parametros() {
  const { sucursales, setSucursales } = useContext(GlobalContext);
  const [datosBodega, setDatosBodega] = useState();
  const [bodega, setBodega] = useState({});
  const [sucursal, setSucursal] = useState({});

  const okBodega = async (editar) => {
    try {
      if (editar) {
        const res = await axios.put(
          API + "parametros/bodegas",
          {
            id: bodega.id,
            nombre: bodega.nombre,
            idsucursal: bodega.idsucursal,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosBodega(res.data);
        }
      } else {
        const res = await axios.post(
          API + "parametros/bodegas",
          {
            nombre: bodega.nombre,
            idsucursal: bodega.idsucursal,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosBodega(res.data);
        }
      }
      setBodega({});
    } catch (e) {
      console.log(e);
    }
  };

  const okSucursal = async (editar) => {
    try {
      if (editar) {
        const res = await axios.put(
          API + "parametros/sucursales",
          {
            id: sucursal.id,
            nombre: sucursal.nombre,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setSucursales(res.data);
        }
      } else {
        const res = await axios.post(
          API + "parametros/sucursales",
          {
            nombre: sucursal.nombre,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setSucursales(res.data);
        }
      }
      setSucursal({});
    } catch (e) {
      console.log(e);
    }
  };

  const cargarBodega = (record) => {
    setBodega(record);
  };

  const cargarSucursal = (record) => {
    console.log(record);
    setSucursal(record);
  };

  const cargarDatos = async () => {
    try {
      const grupos = await axios.get(API + "parametros/bodegas", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      if (grupos.status === 200) {
        setDatosBodega(grupos.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const collistabodegas = [
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Sucursal",
      dataIndex: "nombresucursal",
      key: "nombresucursal",
    },
  ];

  const collistasucursales = [
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  return (
    <div className="agrupaciones">
      <Title>PARÁMETROS INVENTARIOS</Title>
      <div className="dos">
        <TablaParametros
          titulo="SUCURSALES"
          datos={sucursales}
          columnas={collistasucursales}
          paginacion={5}
          okButton={okSucursal}
          edicion={cargarSucursal}
          setBodega={setSucursal}
          Componente={
            <FormularioSucursales datos={sucursal} setDatos={setSucursal} />
          }
        />
        <TablaParametros
          titulo="BODEGAS"
          datos={datosBodega}
          columnas={collistabodegas}
          paginacion={5}
          okButton={okBodega}
          edicion={cargarBodega}
          setBodega={setBodega}
          Componente={
            <FormularioBodegas
              datos={bodega}
              setDatos={setBodega}
              sucursales={sucursales}
            />
          }
        />
      </div>
    </div>
  );
}
