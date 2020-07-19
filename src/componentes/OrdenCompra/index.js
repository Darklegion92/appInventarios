import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import axios from "axios";
import { Modal } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Tabla from "./Tabla";
import Encabezado from "./Encabezado";
import Pie from "./Pie";
import { API } from "../../config/keys";

import "./styles.css";
const { Title } = Typography;

function OrdenCompras() {
  const [codigo, setCodigo] = useState();
  const [documento, setDocumento] = useState();
  const [descripcion, setDescripcion] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [numero, setNumero] = useState();
  const [nombre, setNombre] = useState();
  const [valorUni, setValorUni] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [proveedor, setProveedor] = useState();
  const [articulo, setArticulo] = useState();
  const [datosNombre, setDatosNombre] = useState([]);
  const [datosDescripcion, setDatosDescripcion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [datosTabla, setDatosTabla] = useState([]);
  const [articulos, setArticulos] = useState();
  const [totalIVA, setTotalIVA] = useState(0);
  const [totalOrden, setTotalOrden] = useState(0);
  const [disabledNombre, setdisabledNombre] = useState(false);
  const [disabledDescripcion, setdisabledDescripcion] = useState(true);
  const [disabledCodigo, setdisabledCodigo] = useState(true);
  const [disabledDocumento, setdisabledDocumento] = useState(false);
  const [disabledCantidad, setdisabledCantidad] = useState(true);
  const [disabledValorUni, setdisabledValorUni] = useState(true);
  const [tituloAlerta, setTituloAlerta] = useState("TITULO INICIAL");
  const [tituloConfirmacion, setTituloConformacion] = useState(true);
  const [iconoAlerta, setIconoAlerta] = useState();
  const [iconoConfirmacion, setIconoConfirmacion] = useState();
  const [msgAlerta, setMsgAlerta] = useState();
  const [msgConfirmacion, setMsgConfirmacion] = useState();
  const [modalConfirmacion, setModalConformacion] = useState(false);
  const [modalAlerta, setModalAlerta] = useState(false);
  const [handleOk, setHandleOk] = useState(() => {});

  const formato = new Intl.NumberFormat("es-Es");

  const grabarOrden = async () => {
    if (totalOrden > 0) {
      setModalConformacion(true);
      setIconoConfirmacion(
        <ExclamationCircleOutlined
          style={{
            fontSize: "70px",
            color: "orange",
            "margin-right": "10px",
          }}
        />
      );
      setTituloConformacion("GUARDAR ORDEN");
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
      setMsgAlerta("La orden no puede estar en 0");
      setModalAlerta(true);
    }
  };

  /*Handles ok*/
  const handleOkConfirmacion = async () => {
    const resp = await enviar();
    if (resp.res) {
      setTituloAlerta("ORDEN");
      setIconoAlerta(
        <CheckCircleOutlined
          style={{
            fontSize: "70px",
            color: "green",
            "margin-right": "10px",
          }}
        />
      );
      setMsgAlerta("Orden Guardada Correctamente");
      setModalAlerta(true);
      setModalConformacion(false);
    } else {
    }
  };

  const handleCancelConfirmacion = () => {
    setModalConformacion(false);
  };

  const handleOkAlerta = () => {
    cancelar();
    cargarDatos();
    setModalAlerta(false);
  };

  /*fin handle ok */
  const enviar = async () => {
    try {
      const res = await axios.post(
        API + "ordenes",
        {
          idproveedor: proveedor.idproveedor,
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
    setProveedor();
    setArticulo();
    setDatosNombre([]);
    setDatosDescripcion([]);
    setCargando(false);
    setDatosTabla([]);
    setTotalIVA(0);
    setTotalOrden(0);
    setArticulos();
    cargarDatos();

    setdisabledNombre(false);
    setdisabledDescripcion(true);
    setdisabledCodigo(true);
    setdisabledDocumento(false);
    setdisabledCantidad(true);
    setdisabledValorUni(true);
  };

  const onDoubleClick = (e) => {
    const elim = datosTabla.splice(e, 1);
    console.log(elim);
    setDatosTabla(datosTabla);
    const iva = parseFloat(totalIVA) - parseFloat(elim[0].ivaarticulo) || 0;
    const valor = parseFloat(totalOrden) - parseFloat(elim[0].valorTotal) || 0;
    setTotalIVA(iva);
    setTotalOrden(valor);
  };

  const cargarDatos = async () => {
    const datos = await axios.get(API + "parametros/ordenes/numero", {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });

    if (datos.status === 200) {
      setNumero(datos.data.numero);
    }
  };

  const asignarCodigo = (id) => {
    articulos.forEach((dato) => {
      if (dato.idarticulo == id) {
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

  const cargarProveedores = async (nombre) => {
    setCargando(true);
    if (nombre) {
      const datosProveedor = await axios.get(
        API + "proveedores/filtros/nombre/" + nombre,
        {
          headers: {
            authorization: sessionStorage.getItem("Token"),
          },
        }
      );

      if (datosProveedor.status === 200) {
        let datos = [];
        datosProveedor.data.forEach((dato) => {
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
        API + "articulos/descripcion/" + descripcion,
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
      setTotalOrden(totalOrden + valorTotal);
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

  const traeProveedor = async (documento) => {
    const datos = await axios.get(API + "proveedores/" + documento, {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });
    if (datos.status === 200) {
      setProveedor(datos.data);
      setNombre({
        id: datos.data.idproveedor,
        value: datos.data.nombres + " " + datos.data.apellidos,
      });
      return true;
    }
    return false;
  };

  const traerArticulo = async (codigo) => {
    const datos = await axios.get(API + "articulos/codigo/" + codigo, {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });
    if (datos.status === 200) {
      setArticulo(datos.data[0]);
      setDescripcion({
        id: datos.data[0].idarticulo,
        value: datos.data[0].descripcion,
      });
      return true;
    }
    return false;
  };

  return (
    <div className="orden-compras">
      <Title>Orden de Pedido</Title>
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
          valorUni={valorUni}
          setValorUni={setValorUni}
          valorTotal={valorTotal}
          traeProveedor={traeProveedor}
          datosNombre={datosNombre}
          cargarProveedores={cargarProveedores}
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
          setdisabledValorUni={setdisabledValorUni}
          disabledDescripcion={disabledDescripcion}
          disabledCodigo={disabledCodigo}
          disabledDocumento={disabledDocumento}
          disabledCantidad={disabledCantidad}
          disabledValorUni={disabledValorUni}
          disabledNombre={disabledNombre}
        />
      </div>
      <div className="cuerpo">
        <Tabla datos={datosTabla} onDoubleClick={onDoubleClick} />
      </div>
      <div className="pie">
        <Pie
          cantidadItems={datosTabla.length}
          valorTotal={totalOrden}
          totalIva={totalIVA}
          onClickok={grabarOrden}
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
        cancelButtonProps={{ disabled: true }}
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
      *
    </div>
  );
}

export default OrdenCompras;
