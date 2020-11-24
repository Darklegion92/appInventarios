import React, { useRef, useState, useContext, useEffect } from "react";
import { Typography, Button, Input, message } from "antd";
import { useReactToPrint } from "react-to-print";
import InputNumber from "../InputNumber";
import { GlobalContext } from "../../context/GlobalContext";
import FormatoFactura from "./FormatoFactura";

const { Text } = Typography;

const Pie = (props) => {
  const {
    onClickok,
    onClickCancel,
    prefijo,
    recibido,
    setRecibido,
    facturaNumero,
    onChange,
    totalFactura,
  } = props;
  const { consultarFactura } = useContext(GlobalContext);

  const [datos, setDatos] = useState({});
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [nombre, setNombre] = useState();
  const [cambio, setCambio] = useState(0);
  const [documento, setDocumento] = useState();

  const componentRef = useRef();

  useEffect(() => {
    setTotal(totalFactura);
  }, [totalFactura]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onClick = async () => {
    const res = await consultarFactura(prefijo, facturaNumero);

    if (res !== "ERROR") {
      console.log(res);
      setDatos(res.articulos);
      let tot = 0;
      let iv = 0;
      await res.articulos.map((articulo) => {
        tot = tot + articulo.total;
        iv = iv + articulo.ivaarticulo;
      });

      setTotal(tot);
      setIva(iv);
      setRecibido(res.cambio);
      setDocumento(res.documento);
      setNombre(res.nombre);
      setRecibido(res.recibido);
      handlePrint();
    } else {
      message.error("Error al Guardar");
    }
  };

  const onChangeRecibido = (e) => {
    setRecibido(e);
    setCambio(e - total);
  };

  return (
    <>
      <div>
        <div>
          <Text>Cantidad Items:</Text>
          <Text>{datos.lenght}</Text>
        </div>
        <div>
          <Text>Total Factura:</Text>
          <Text>{total}</Text>
        </div>
        <div>
          <Text>Total IVA:</Text>
          <Text>{iva}</Text>
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
        <Text>Factura Imprimir</Text>
        <Input value={facturaNumero} onChange={onChange} />
        <div style={{ display: "none" }}>
          <FormatoFactura
            ref={componentRef}
            prefijo={prefijo}
            numero={facturaNumero}
            datos={datos}
            total={total}
            iva={iva}
            recibido={recibido}
            documento={documento}
            nombre={nombre}
          />
        </div>
        <Button
          onClick={onClick}
          style={{
            color: "white",
            backgroundColor: "orange",
            borderRadius: "10px",
          }}
        >
          IMPRIMIR
        </Button>
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
};

export default Pie;
