import React, { useEffect, useState } from "react";
import Combo from "../Combo";
import DatePicker from "../DatePickerMult";
import { Button } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";

function Encabezado({
  datosTipo,
  datosGrupo,
  datosSubgrupo,
  onClickCargar,
  onChangeGrupo,
  onClickExportar,
  onChangeSubgrupo,
  onChangeTipo,
  onChangeFechas,
}) {
  const [datosTipos, setDatosTipos] = useState([]);
  const [datosGrupos, setDatosGrupos] = useState([{ id: 0, dato: "TODOS" }]);
  const [datosSubgrupos, setDatosSubgrupos] = useState([
    { id: 0, dato: "TODOS" },
  ]);

  useEffect(() => {
    if (datosSubgrupo)
      datosSubgrupo.forEach((dato) => {
        setDatosSubgrupos([
          ...datosSubgrupos,
          { id: dato.idsubgrupo, dato: dato.nombre },
        ]);
      });
  }, [datosGrupo, datosSubgrupo]);

  useEffect(() => {
    if (datosGrupo)
      datosGrupo.forEach((dato) => {
        setDatosGrupos([
          ...datosGrupos,
          { id: dato.idgrupo, dato: dato.nombre },
        ]);
      });
  }, [datosGrupo]);

  useEffect(() => {
    if (datosTipo)
      datosTipo.forEach((dato) => {
        setDatosTipos([
          ...datosTipos,
          { id: dato.idtipo_informe, dato: dato.nombre },
        ]);
      });
  }, [datosTipo]);
  return (
    <>
      <div>
        <Combo
          datos={datosTipos}
          titulo="Tipo Informe"
          onChange={onChangeTipo}
        />
        <DatePicker titulo="Rango Fechas" onChange={onChangeFechas} />
      </div>
      <div>
        <Combo datos={datosGrupos} titulo="Grupo" onChange={onChangeGrupo} />
        <Combo
          datos={datosSubgrupos}
          titulo="SubGrupo"
          onChange={onChangeSubgrupo}
        />
      </div>
      <div className="botones">
        <Button onClick={onClickCargar}>
          <SearchOutlined />
          CARGAR
        </Button>
        <Button onClick={onClickExportar}>
          <DownloadOutlined />
          EXPORTAR
        </Button>
      </div>
    </>
  );
}
export default Encabezado;
