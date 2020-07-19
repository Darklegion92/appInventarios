import React,{useState} from "react";
import { Typography, Button } from "antd";
import InputNumber from "../InputNumber";

const { Text } = Typography;

function Pie(props) {
  const [valorUni,setValorUni] = useState();
  const [vuelto,setVuelto] = useState();

  const {
    cantidadItems,
    valorTotal,
    totalIva,
    onClickok,
    onClickCancel,
     } = props;

  const onChangeValorUni = (e) => {
    setValorUni(e);
    setVuelto(e-valorTotal);
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
              onChange={onChangeValorUni}
              value={valorUni}
              text="Recibido"
              size={{ width: "100%" }}
              disabled={false}
            />
        <div>
          <Text>Vueltos</Text>
          <Text>{vuelto}</Text>
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

export default Pie