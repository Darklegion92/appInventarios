import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Typography, Modal, Button } from "antd";
import Encabezado from "./Encabezado";
import FormatoDevolucion from "./FormatoDevolucion";
import Tabla from "./Tabla";
import { API } from "../../config/keys";
import "./styles.css";
const { Title } = Typography;

function DevVentas() {
  const [documento, setDocumento] = useState();
  const [nombre, setNombre] = useState();
  const [articulosFactura, setArticulosFactura] = useState();
  const [articulosDevolucion, setArticulosDevolucion] = useState([]);
  const [modal, setModal] = useState(false);
  const [disabledNumero, setdisablesNumero] = useState(false);
  const [titulo, setTitulo] = useState();
  const [msgAlerta, setMsgAlerta] = useState();
  const [modalAlerta, setModalAlerta] = useState(false);
  const [iconoAlerta, setIconoAlerta] = useState();
  const [tituloAlerta, setTituloAlerta] = useState("TITULO INICIAL");
  const [disableok, setDisableok] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCancel = () => {
    setModal(false);
  };

  const handleOkAlerta = () => {
    setModalAlerta(false);
    imprimir(articulosDevolucion, documento, nombre);
    limpiarCampos();
  };

  const handledCancelAlerta = () => {
    setModalAlerta(false);
  };

  const eliminarArray = (arr, item) => {
    return arr.filter((e) => {
      return e !== item;
    });
  };

  const onClickok = async () => {
    let articulos = [];
    articulosDevolucion.forEach((articulo) => {
      articulos = [...articulos, articulo.idfactura_venta_detalle];
    });
    const res = await axios.post(
      API + "facturasventa/devolucion",
      { articulos },
      {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      }
    );

    if (res.status === 200) {
      imprimir(articulosDevolucion, documento, nombre);
      limpiarCampos();
    }
  };
  const imprimir = (datos, documento, nombre) => {
    setDisableok(true);
    setIconoAlerta(
      <div>
        <div style={{ display: "none" }}>
          <FormatoDevolucion
            ref={componentRef}
            datos={datos}
            documento={documento}
            nombre={nombre}
          />
        </div>
        <Button
          onClick={() => {
            handlePrint();
            setModalAlerta(false);
          }}
        >
          IMPRIMIR
        </Button>
      </div>
    );
    setTituloAlerta("Imprimir");
    setMsgAlerta("");
    setModalAlerta(true);
  };

  const limpiarCampos = () => {
    setDocumento();
    setNombre();
    setArticulosFactura();
    setArticulosDevolucion([]);
    setModal(false);
    setdisablesNumero(false);
    setTitulo();
  };

  const onDoubleClick = (e, record) => {
    setdisablesNumero(true);
    const d = eliminarArray(articulosFactura, record);
    setArticulosFactura(d);
    setArticulosDevolucion([...articulosDevolucion, record]);
  };

  const onSearch = async (numero) => {
    const res = await axios.get(API + "facturasventa/" + numero, {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });
    if (res.status === 200) {
      setDocumento(res.data.documento);
      setNombre(res.data.nombre);
      setTitulo("Artículos Factura " + res.data.numero);
      setArticulosFactura(res.data.articulos);
      setModal(true);
    } else if (res.status === 201) {
      setDocumento("");
      setNombre("");
    }
  };

  const onChange = (e) => {
    setDocumento("");
    setNombre("");
  };

  return (
    <div className="dev-ventas">
      <Title>Devolución de Ventas</Title>
      <div className="encabezado">
        <Encabezado
          onSearch={onSearch}
          onChange={onChange}
          documento={documento}
          nombre={nombre}
          disabledNumero={disabledNumero}
        />
      </div>
      <div className="cuerpo">
        <Tabla datos={articulosDevolucion} />
      </div>
      <div className="pie">
        <Button type="primary" shape="round" onClick={onClickok}>
          GUARDAR
        </Button>
      </div>
      <Modal
        title={titulo}
        visible={modal}
        centered
        okButtonProps={{ disabled: true }}
        onCancel={handleCancel}
        style={{ width: 1000 }}
      >
        <Tabla datos={articulosFactura} onDoubleClick={onDoubleClick} />
      </Modal>
      <Modal
        title={tituloAlerta}
        visible={modalAlerta}
        onCancel={handledCancelAlerta}
        cancelButtonProps={{ disabled: !disableok }}
        okButtonProps={{ disabled: disableok }}
        bodyStyle={{
          display: "flex",
          "align-items": "center",
          "justify-content": "space-evenly",
          "font-size": "25px",
        }}
      >
        {iconoAlerta}
        {msgAlerta}
      </Modal>
    </div>
  );
}
export default DevVentas;
