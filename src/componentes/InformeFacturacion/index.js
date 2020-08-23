import React, { useState, useEffect } from "react";
import { Typography, Table } from "antd";
import axios from "axios";
import Encabezado from "./Encabezado";
import { API } from "../../config/keys";

import "./styles.css";

const { Title } = Typography;

function InformeFacturacion({ setLogin }) {
  const [datosTipo, setDatosTipo] = useState([]);
  const [datosGrupo, setDatosGrupo] = useState([]);
  const [datosSubgrupo, setDatosSubgrupo] = useState([]);
  const [tipoSeleccion, setTipoSeleccion] = useState();
  const [grupoSeleccion, setGrupoSeleccion] = useState();
  const [subgrupoSeleccion, setSubgrupoSeleccion] = useState();
  const [fechainicial, setFechainicial] = useState(new Date());
  const [fechafinal, setFechafinal] = useState(new Date());
  const [data, setData] = useState([]);

  const cargarParametros = async () => {
    const res = await axios.get(API + "parametros/informes/facturacion", {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });

    if (res.status === 200) {
      setDatosTipo(res.data.datosTipos);
      setDatosGrupo(res.data.datosGrupos);
    } else if (res.status === 401) {
      localStorage.removeItem("Token");
      sessionStorage.removeItem("Token");
      setLogin(true);
    }
  };

  const onChangeFechas = (value) => {
    if (value) {
      if (value[0]) setFechainicial(value[0]._d);
      if (value[1]) setFechafinal(value[1]._d);
    }
  };

  const onChangeSubgrupo = ({ value }) => {
    setSubgrupoSeleccion(value);
  };

  const onChangeTipo = ({ value }) => {
    setTipoSeleccion(value);
  };

  const onChangeGrupo = async ({ value }) => {
    setGrupoSeleccion(value);
    if (value > 0) {
      const res = await axios.get(API + "agrupaciones/subgrupos/" + value, {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });

      if (res.status === 200) {
        setDatosSubgrupo(res.data);
      } else if (res.status === 401) {
        localStorage.removeItem("Token");
        sessionStorage.removeItem("Token");
        setLogin(true);
      }
    }
  };

  const cargarDatos = async () => {
    const res = await axios.get(API + "informes/" + tipoSeleccion, {
      params: {
        idgrupo: grupoSeleccion,
        idsubgrupo: subgrupoSeleccion,
        fechainicial,
        fechafinal,
      },
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });
    console.log(res);
    setData(res.data);
  };

  useEffect(() => {
    cargarParametros();
  }, []);

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
    {
      title: "Grupo",
      dataIndex: "grupo",
      key: "grupo",
    },
    {
      title: "Subgrupo",
      dataIndex: "subgrupo",
      key: "subgrupo",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
    },
    {
      title: "Registro",
      dataIndex: "registro",
      key: "registro",
    },
  ];

  return (
    <div className="informe-facturacion">
      <Title>INFORMES FACTURACION</Title>
      <div className="encabezado">
        <Encabezado
          datosTipo={datosTipo}
          datosGrupo={datosGrupo}
          datosSubgrupo={datosSubgrupo}
          onChangeGrupo={onChangeGrupo}
          onChangeSubgrupo={onChangeSubgrupo}
          onChangeTipo={onChangeTipo}
          onChangeFechas={onChangeFechas}
          onClickCargar={cargarDatos}
          datosTabla={data}
        />
      </div>
      <div className="cuerpo">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 20,
          }}
        />
      </div>
    </div>
  );
}
export default InformeFacturacion;
