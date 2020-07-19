import React from "react";
import { Typography, Button } from "antd";

const { Text } = Typography;

export default function Pie(props) {
  const {
    cantidadItems,
    valorTotal,
    totalIva,
    onClickok,
    onClickCancel,
     } = props;
  return (
    <>
      <div>
        <div>
          <Text>Cantidad Items:</Text>
          <Text>{cantidadItems}</Text>
        </div>
        <div>
          <Text>Total Orden:</Text>
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
