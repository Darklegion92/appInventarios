import React, { useState } from "react";
import { Typography, Button } from "antd";
import InputNumber from "../InputNumber";

const { Text } = Typography;

function Pie(props) {

  const {
    cantidadItems,
    valorTotal,
    totalIva,
    onClickok,
    onClickCancel,
    cambio,
    setCambio,
    recibido, 
    setRecibido
  } = props;

  const onChangeRecibido = (e) => {
    setRecibido(e);
    setCambio(e - valorTotal);
  };

  return (
    <>
      <div>
        <div>
          <Text>Cantidad Items:</Text>
          <Text>{cantidadItems}</Text>
        </div>
        <div>
          <Text>Total Factura:</Text>
          <Text>{valorTotal}</Text>
        </div>
        <div>
          <Text>Total IVA:</Text>
          <Text>{totalIva}</Text>
        </div>
      </div>
      <div>
        <img src="img/logo.png" alt="logo" />
      </div>
      <div>
        <InputNumber
          onChange={onChangeRecibido}
          value={recibido}
          text="Recibido"
          size={{ width: "100%" }}
          disabled={false}
        />
        <div>
          <Text>Cambio</Text>
          <Text>{cambio}</Text>
        </div>
      </div>
      <div>
        <Button type="primary" shape="round" onClick={onClickok}>
          GUARDAR
        </Button>
        <Button type="primary" shape="round" danger onClick={onClickCancel}>
          CANCELAR
        </Button>
      </div>
    </>
  );
}

export default Pie;
