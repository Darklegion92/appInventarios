import React from "react";
import Combo from "../Combo";
import DatePicker from "../DatePickerMult";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Boton from "../Boton";

export default function Encabezado() {
  return (
    <>
      <div>
        <Combo datos={["dato1", "dato2"]} titulo="Tipo Informe" />
        <DatePicker titulo="Rango Fechas" />
      </div>
      <div>
        <Combo datos={["dato1", "dato2"]} titulo="Grupo" />
        <Combo datos={["dato1", "dato2"]} titulo="SubGrupo" />
      </div>
      <div className="botones">
        <Boton icon={<SearchOutlined />} text="Consultar" />
        <Boton icon={<DownloadOutlined />} text="Descargar" />
      </div>
    </>
  );
}
