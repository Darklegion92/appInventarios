import React, { useEffect, useState } from "react";
import Combo from "../Combo";
import DatePicker from "../DatePickerMult";
import { Button } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";

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
  datosTabla,
}) {
  const [datosTipos, setDatosTipos] = useState([]);
  const [datosGrupos, setDatosGrupos] = useState([{ id: 0, dato: "TODOS" }]);
  const [datosSubgrupos, setDatosSubgrupos] = useState([
    { id: 0, dato: "TODOS" },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (datosSubgrupo) {
      let datos = datosSubgrupos;
      datosSubgrupo.forEach((dato) => {
        datos = [...datos, { id: dato.idsubgrupo, dato: dato.nombre }];
      });
      setDatosSubgrupos(datos);
    }
  }, [datosGrupo, datosSubgrupo]);

  useEffect(() => {
    let total = 0;
    datosTabla.forEach((dato) => {
      total += dato.valor;
    });
    setTotal(parseFloat(total));
  }, [datosTabla]);

  useEffect(() => {
    if (datosGrupo) {
      let datos = datosGrupos;
      datosGrupo.forEach((dato) => {
        datos = [...datos, { id: dato.idgrupo, dato: dato.nombre }];
      });
      setDatosGrupos(datos);
    }
  }, [datosGrupo]);

  useEffect(() => {
    if (datosTipo) {
      let datos = datosTipos;
      datosTipo.forEach((dato) => {
        datos = [...datos, { id: dato.idtipo_informe, dato: dato.nombre }];
      });
      setDatosTipos(datos);
    }
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
      <div>
        <div className="total">
          Total:{" "}
          <NumberFormat
            value={total}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />{" "}
        </div>
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
