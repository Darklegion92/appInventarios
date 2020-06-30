import React, { useState } from "react";
import Login from "./componentes/Login";
import Encabezado from "./componentes/Encabezado";
import {
  ContainerOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingFilled,
} from "@ant-design/icons";
import Parametros from "./componentes/Parametros";
import FacturasVentas from "./componentes/FacturasVentas";
import DevVentas from "./componentes/DevVentas";
import InformeFacturacion from "./componentes/InformeFacturacion";
import FacturasCompras from "./componentes/FacturasCompras";
import DevCompras from "./componentes/DevCompras";
import OrdenCompra from "./componentes/OrdenCompra";
import InformeCompras from "./componentes/InformeCompras";
import Proveedores from "./componentes/Proveedores";
import EntradasInventario from "./componentes/EntradasInventario";
import SalidasInventario from "./componentes/SalidasInventario";
import AjustesInventario from "./componentes/AjustesInventario";
import Agrupaciones from "./componentes/Agrupaciones";
import Articulos from "./componentes/Articulos";
import InformeInventarios from "./componentes/InformeInventarios";
import Clientes from "./componentes/Clientes";
import InformeCRM from "./componentes/InformeCRM";
import Index from "./componentes/Index";

import "./App.css";
import "antd/dist/antd.css";

function App() {
  const [login, setLogin] = useState(true);
  const [seleccion, setSeleccion] = useState(0);
  console.log(seleccion);

  return (
    <>
      {login && <Login ingresar={setLogin} />}
      {!login && (
        <Encabezado
          setSeleccion={setSeleccion}
          datos={[
            {
              titulo: "Facturación",
              lista: ["Facturar", "Devoluciones", "Informes", "Parámetros"],
              icon: <ShoppingCartOutlined />,
            },
            {
              titulo: "Compras",
              lista: [
                "Facturar",
                "Devoluciones",
                "Orden de Pedido",
                "Informes",
                "Proveedores",
              ],
              icon: <ShopOutlined />,
            },
            {
              titulo: "Inventarios",
              lista: [
                "Entradas",
                "Salidas",
                "Ajustes",
                "Agrupaciones",
                "Artículos",
                "Informes",
              ],
              icon: <ContainerOutlined />,
            },
            {
              titulo: "CRM",
              lista: ["Clientes", "Informes"],
              icon: <BarChartOutlined />,
            },
            {
              titulo: "Configuración",
              lista: ["Usuarios"],
              icon: <SettingFilled />,
            },
          ]}
        />
      )}
      {!login && seleccion === 0 && <Index />}
      {!login && seleccion === "Facturación-Facturar" && <FacturasVentas />}
      {!login && seleccion === "Facturación-Devoluciones" && <DevVentas />}
      {!login && seleccion === "Facturación-Informes" && <InformeFacturacion />}
      {!login && seleccion === "Facturación-Parámetros" && <Parametros />}
      {!login && seleccion === "Compras-Facturar" && <FacturasCompras />}
      {!login && seleccion === "Compras-Devoluciones" && <DevCompras />}
      {!login && seleccion === "Compras-Orden de Pedido" && <OrdenCompra />}
      {!login && seleccion === "Compras-Informes" && <InformeCompras />}
      {!login && seleccion === "Compras-Proveedores" && <Proveedores />}
      {!login && seleccion === "Inventarios-Entradas" && <EntradasInventario />}
      {!login && seleccion === "Inventarios-Salidas" && <SalidasInventario />}
      {!login && seleccion === "Inventarios-Ajustes" && <AjustesInventario />}
      {!login && seleccion === "Inventarios-Agrupaciones" && <Agrupaciones />}
      {!login && seleccion === "Inventarios-Artículos" && <Articulos />}
      {!login && seleccion === "Inventarios-Informes" && <InformeInventarios />}
      {!login && seleccion === "CRM-Clientes" && <Clientes />}
      {!login && seleccion === "CRM-Informes" && <InformeCRM />}
    </>
  );
}

export default App;
