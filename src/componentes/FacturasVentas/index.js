﻿import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Typography } from "antd";
import axios from "axios";
import { Modal, Button } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Tabla from "./Tabla";
import Encabezado from "./Encabezado";
import FormatoFactura from "./FormatoFactura";
import Pie from "./Pie";
import { API } from "../../config/keys";

import "./styles.css";
const { Title } = Typography;

function FacturasVentas() {
  const [codigo, setCodigo] = useState();
  const [documento, setDocumento] = useState();
  const [descripcion, setDescripcion] = useState();
  const [cantidad, setCantidad] = useState(0);
  const [numero, setNumero] = useState();
  const [nombre, setNombre] = useState();
  const [valorUni, setValorUni] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [cliente, setCliente] = useState();
  const [articulo, setArticulo] = useState();
  const [datosNombre, setDatosNombre] = useState([]);
  const [datosDescripcion, setDatosDescripcion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [datosTabla, setDatosTabla] = useState([]);
  const [articulos, setArticulos] = useState();
  const [totalIVA, setTotalIVA] = useState(0);
  const [totalFactura, settotalFactura] = useState(0);
  const [disabledNombre, setdisabledNombre] = useState(false);
  const [disabledDescripcion, setdisabledDescripcion] = useState(true);
  const [disabledCodigo, setdisabledCodigo] = useState(true);
  const [disabledDocumento, setdisabledDocumento] = useState(false);
  const [disabledCantidad, setdisabledCantidad] = useState(true);
  const [tituloAlerta, setTituloAlerta] = useState("TITULO INICIAL");
  const [tituloConfirmacion, setTituloConformacion] = useState(true);
  const [iconoAlerta, setIconoAlerta] = useState();
  const [iconoConfirmacion, setIconoConfirmacion] = useState();
  const [msgAlerta, setMsgAlerta] = useState();
  const [msgConfirmacion, setMsgConfirmacion] = useState();
  const [modalConfirmacion, setModalConformacion] = useState(false);
  const [modalAlerta, setModalAlerta] = useState(false);
  const [prefijo, setPrefijo] = useState();
  const [disableok, setDisableok] = useState(false);

  const formato = new Intl.NumberFormat("es-Es");

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const grabarFactura = async () => {
    if (totalFactura > 0) {
      setModalConformacion(true);
      setDisableok(false);
      setIconoConfirmacion(
        <ExclamationCircleOutlined
          style={{
            fontSize: "70px",
            color: "orange",
            "margin-right": "10px",
          }}
        />
      );
      setTituloConformacion("GUARDAR FACTURA DE VENTA");
      setMsgConfirmacion("¿Estas Seguro De Continuar?");
    } else {
      setTituloAlerta("ERROR");
      setIconoAlerta(
        <CloseCircleOutlined
          style={{
            fontSize: "70px",
            color: "red",
            "margin-right": "10px",
          }}
        />
      );
      setMsgAlerta("La factura no puede estar en 0");
      setModalAlerta(true);
    }
  };

  /*Handles ok*/
  const handleOkConfirmacion = async () => {
    const resp = await enviar();
    if (resp.res) {
      setTituloAlerta("FACTURA DE VENTA");
      setIconoAlerta(
        <CheckCircleOutlined
          style={{
            fontSize: "70px",
            color: "green",
            "margin-right": "10px",
          }}
        />
      );
      setMsgAlerta("Factura De Venta Guardada Correctamente");
      setModalAlerta(true);
      setModalConformacion(false);
    } else {
    }
  };

  const handleCancelConfirmacion = () => {
    setModalConformacion(false);
  };

  const handleOkAlerta = () => {
    setModalAlerta(false);
    imprimir(datosTabla,totalFactura,totalIVA, prefijo, numero);
    cancelar();
    cargarDatos();
  };

  const handledCancelAlerta = () => {
    setModalAlerta(false);
  };

  /*fin handle ok */

  const imprimir = (datos,total,iva,prefijo,numero) => {
    setDisableok(true);
    setIconoAlerta(
      <div>
        <div style={{ display: "none" }}>
          <FormatoFactura ref={componentRef} prefijo= {prefijo} numero={numero} datos={datos} total={total} iva ={iva}/>
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

  const enviar = async () => {
    try {
      const res = await axios.post(
        API + "facturasventa",
        {
          idcliente: cliente.idcliente,
          prefijo: prefijo,
          numero: numero,
          articulos: datosTabla,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );
      if (res.status === 200) {
        return { res: true, mensaje: res.mensaje };
      } else {
        return { res: false, mensaje: res.mensaje };
      }
    } catch (e) {
      console.log(e);

      return { res: false, mensaje: e };
    }
  };

  const cancelar = () => {
    setCodigo();
    setDocumento();
    setDescripcion();
    setCantidad(1);
    setNumero();
    setNombre();
    setValorUni(0);
    setValorTotal(0);
    setCliente();
    setArticulo();
    setDatosNombre([]);
    setDatosDescripcion([]);
    setCargando(false);
    setDatosTabla([]);
    setTotalIVA(0);
    settotalFactura(0);
    setArticulos();
    cargarDatos();

    setdisabledNombre(false);
    setdisabledDescripcion(true);
    setdisabledCodigo(true);
    setdisabledDocumento(false);
    setdisabledCantidad(true);
  };

   const eliminarArray =(arr,item)=>{
     return arr.filter((e)=>{
	return e !== item;
})
   }

  const onDoubleClick = (e,record) => {
    const elim = datosTabla.splice(e, 1); 
    const d = eliminarArray(datosTabla,record)
    setDatosTabla(d);
    let iva =0;
    let valor = 0;
    d.forEach((dato)=>{
      iva = parsefloat(iva)+parsefloat(dato.ivaarticulo)
      valor = parsefloat(valor)+parsefloat(dato.valortotal)
    })
    setTotalIVA(iva);
    settotalFactura(valor);
  };

  const cargarDatos = async () => {
    const datos = await axios.get(API + "parametros/facturasventa/numero", {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });

    if (datos.status === 200) {
      setNumero(datos.data.numero);
      setPrefijo(datos.data.prefijo);
    }
  };

  const asignarCodigo = (id) => {
    articulos.forEach((dato) => {
      if (dato.idarticulo == id) {
        console.log(dato);
        setValorUni(dato.valor);
        setCodigo(dato.codigo);
        setArticulo(dato);
        return true;
      }
    });
  };

  const asignarDocumento = (id) => {
    datosNombre.forEach((dato) => {
      if (dato.id == id) {
        setDocumento(dato.value);
        return true;
      }
    });
  };

  const cargarClientes = async (nombre) => {
    setCargando(true);
    if (nombre) {
      const datosCliente = await axios.get(
        API + "clientes/filtros/nombre/" + nombre,
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );

      if (datosCliente.status === 200) {
        let datos = [];
        datosCliente.data.forEach((dato) => {
          datos.push({
            id: dato.documento,
            dato: dato.nombres + " " + dato.apellidos,
            value: dato.documento,
          });
        });

        setDatosNombre(datos);
      } else {
        setDatosNombre([]);
      }
      setCargando(false);
    } else {
      setDatosNombre([]);
    }
  };

  const cargarArticulos = async (descripcion) => {
    setCargando(true);
    if (descripcion) {
      const datosArticulos = await axios.get(
        API +
          "articulos/descripcion/" +
          descripcion +
          "/" +
          cliente.idlistaprecios,
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );

      if (datosArticulos.status === 200) {
        let datos = [];
        setArticulos(datosArticulos.data);
        datosArticulos.data.map((dato) => {
          datos.push({
            id: dato.idarticulo,
            dato: dato.descripcion,
            value: dato.codigo,
          });
        });

        setDatosDescripcion(datos);
        setCargando(false);
        return true;
      } else {
        setDatosDescripcion([]);
      }
      setCargando(false);
    } else {
      setDatosDescripcion([]);
    }
    setCargando(false);
    return false;
  };

  const guardarTabla = async () => {
    try {
      setDatosTabla([
        ...datosTabla,
        {
          codigoarticulo: articulo.codigo,
          descripcionarticulo: articulo.descripcion,
          cantidadarticulo: cantidad,
          valorarticulo: formato.format(valorUni),
          ivaarticulo: formato.format(
            cantidad * valorUni -
              (cantidad * valorUni) / (1 + articulo.tarifa / 100)
          ),
          idtarifaiva: articulo.idtarifaiva,
          valortotal: formato.format(valorTotal),
        },
      ]);
      settotalFactura(totalFactura + valorTotal);
      setTotalIVA(
        formato.format(
          parseFloat(totalIVA) +
            (cantidad * valorUni -
              (cantidad * valorUni) / (1 + articulo.tarifa / 100))
        )
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const traerCliente = async (documento) => {
    const datos = await axios.get(API + "clientes/" + documento, {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });
    if (datos.status === 200) {
      setCliente(datos.data);
      setNombre({
        id: datos.data.idcliente,
        value: datos.data.nombres + " " + datos.data.apellidos,
      });
      return true;
    }
    return false;
  };

  const traerArticulo = async (codigo) => {
    const datos = await axios.get(
      API + "articulos/codigo/" + codigo + "/" + cliente.idlistaprecios,
      {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      }
    );
    if (datos.status === 200) {
      setArticulo(datos.data[0]);
      setDescripcion({
        id: datos.data[0].idarticulo,
        value: datos.data[0].descripcion,
      });
      setValorUni(datos.data[0].valor);
      return true;
    }
    return false;
  };

  return (
    <div className="facturas-ventas">
      <Title>Factura de Venta</Title>
      <div className="encabezado">
        <Encabezado
          codigo={codigo}
          setCodigo={setCodigo}
          documento={documento}
          setDocumento={setDocumento}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          cantidad={cantidad}
          setCantidad={setCantidad}
          numero={numero}
          nombre={nombre}
          prefijo={prefijo}
          valorUni={valorUni}
          setValorUni={setValorUni}
          valorTotal={valorTotal}
          traerCliente={traerCliente}
          datosNombre={datosNombre}
          cargarClientes={cargarClientes}
          datosDescripcion={datosDescripcion}
          cargando={cargando}
          traerArticulo={traerArticulo}
          cargarArticulos={cargarArticulos}
          setValorTotal={setValorTotal}
          guardarTabla={guardarTabla}
          asignarDocumento={asignarDocumento}
          setNombre={setNombre}
          asignarCodigo={asignarCodigo}
          setdisabledNombre={setdisabledNombre}
          setdisabledDescripcion={setdisabledDescripcion}
          setdisabledCodigo={setdisabledCodigo}
          setdisabledDocumento={setdisabledDocumento}
          setdisabledCantidad={setdisabledCantidad}
          disabledDescripcion={disabledDescripcion}
          disabledCodigo={disabledCodigo}
          disabledDocumento={disabledDocumento}
          disabledCantidad={disabledCantidad}
          disabledNombre={disabledNombre}
        />
      </div>
      <div className="cuerpo">
        <Tabla datos={datosTabla} onDoubleClick={onDoubleClick} />
      </div>
      <div className="pie">
        <Pie
          cantidadItems={datosTabla.length}
          valorTotal={totalFactura}
          totalIva={totalIVA}
          onClickok={grabarFactura}
          onClickCancel={cancelar}
        />
      </div>
      <Modal
        title={tituloConfirmacion}
        visible={modalConfirmacion}
        onOk={handleOkConfirmacion}
        onCancel={handleCancelConfirmacion}
        bodyStyle={{
          display: "flex",
          "align-items": "center",
          "justify-content": "space-evenly",
          "font-size": "25px",
        }}
      >
        {iconoConfirmacion}
        {msgConfirmacion}
      </Modal>
      <Modal
        title={tituloAlerta}
        visible={modalAlerta}
        onOk={handleOkAlerta}
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

export default FacturasVentas;
