import React from "react";
import Combo from "../Combo";
import InputNumber from "../InputNumber";

function Precios(props) {
  const { datos, valor, setValor, setLista, lista } = props;

  const onChangeValor = (value) => {
    setValor(value);
  };
  const onChangePrecio = (e) => {
    setLista(e);
  };
  const datosCombo = [];
  datos.map((dato) => {
    datosCombo.push({ id: dato.idlistaprecios, dato: dato.nombre });
  });

  return (
    <div className="precios">
      <InputNumber
        text="Precio"
        size={{ width: 220 }}
        onChange={onChangeValor}
        value={valor}
      />
      <Combo
        titulo="Lista"
        datos={datosCombo}
        size={{ width: 220 }}
        onChange={onChangePrecio}
        valor={lista}
      />
    </div>
  );
}
export default Precios;
