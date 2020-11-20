import React, { useState, useEffect, useRef, useContext } from 'react'
import Login from './componentes/Login'
import { useReactToPrint } from 'react-to-print'
import { Modal, Button } from 'antd'
import axios from 'axios'
import InputNumber from './componentes/InputNumber'
import Encabezado from './componentes/Encabezado'
import FormatoCierre from './FormatoCierre'
import {
  ContainerOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingFilled
} from '@ant-design/icons'
import { GlobalContext } from './context/GlobalContext'
import Parametros from './componentes/Parametros'
import FacturasVentas from './componentes/FacturasVentas'
import DevVentas from './componentes/DevVentas'
import InformeFacturacion from './componentes/InformeFacturacion'
import FacturasCompras from './componentes/FacturasCompras'
import DevCompras from './componentes/DevCompras'
import OrdenCompra from './componentes/OrdenCompra'
import InformeCompras from './componentes/InformeCompras'
import Proveedores from './componentes/Proveedores'
import EntradasInventario from './componentes/EntradasInventario'
import SalidasInventario from './componentes/SalidasInventario'
import AjustesInventario from './componentes/AjustesInventario'
import Agrupaciones from './componentes/Agrupaciones'
import Articulos from './componentes/Articulos'
import InformeInventarios from './componentes/InformeInventarios'
import ParametrosInventario from './componentes/ParametrosInventario'
import Clientes from './componentes/Clientes'
import InformeCRM from './componentes/InformeCRM'
import Index from './componentes/Index'
import { API } from './config/keys'
import './App.css'
import 'antd/dist/antd.css'

function App () {
  const { seleccion, setSeleccion, usuario } = useContext(GlobalContext)
  const [nombre, setNombre] = useState()
  const [modalCierre, setModalCierre] = useState(true)
  const [recaudo, setRecaudo] = useState(0)
  const [ventas, setVentas] = useState(0)
  const [modalAlerta, setModalAlerta] = useState(false)
  const componentRef = useRef()
  console.log(usuario)
  const handleOk = async () => {
    const ventas = await traerVentas()
    setVentas(ventas)
    setModalCierre(false)
    setModalAlerta(true)
  }

  const traerVentas = async () => {
    const ventas = await axios.get(API + 'facturasventa/ventasdia')
    if (ventas.status === 200) {
      return ventas.data[0].total
    } else {
      return 0
    }
  }
  const onChange = e => {
    setRecaudo(e)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const handleCancel = () => {
    setModalCierre(false)
  }

  const validarSesion = async token => {
    try {
      const resp = await axios.get(API, {
        headers: {
          authorization: token
        }
      })

      if (resp.status === 200) {
        return true
      }
    } catch (e) {
      return false
    }
  }
  if (seleccion === 'salir') {
    setSeleccion(0)
    sessionStorage.clear()
    localStorage.clear()
  }
  return (
    <>
      {!usuario && <Login />}
      {usuario && (
        <Encabezado
          nombre={nombre}
          setSeleccion={setSeleccion}
          datos={[
            {
              titulo: 'Facturación',
              lista: [
                'Facturar',
                'Devoluciones',
                'Informes',
                'Parámetros',
                'Cierre Diario'
              ],
              icon: <ShoppingCartOutlined />
            },
            {
              titulo: 'Compras',
              lista: [
                'Facturar',
                'Devoluciones',
                'Orden de Pedido',
                'Informes',
                'Proveedores'
              ],
              icon: <ShopOutlined />
            },
            {
              titulo: 'Inventarios',
              lista: [
                'Entradas',
                'Salidas',
                'Ajustes',
                'Agrupaciones',
                'Artículos',
                'Informes',
                'Párametros'
              ],
              icon: <ContainerOutlined />
            },
            {
              titulo: 'CRM',
              lista: ['Clientes', 'Informes'],
              icon: <BarChartOutlined />
            },
            {
              titulo: 'Configuración',
              lista: ['Usuarios'],
              icon: <SettingFilled />
            }
          ]}
        />
      )}
      {usuario && seleccion === 0 && <Index />}
      {usuario && seleccion === 'Facturación-Facturar' && <FacturasVentas />}
      {usuario && seleccion === 'Facturación-Devoluciones' && <DevVentas />}
      {usuario && seleccion === 'Facturación-Informes' && (
        <InformeFacturacion />
      )}
      {usuario && seleccion === 'Facturación-Parámetros' && <Parametros />}
      {usuario && seleccion === 'Facturación-Cierre Diario' && (
        <Modal
          title='Cierre Facturación'
          visible={modalCierre}
          centered
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ width: 1000 }}
        >
          <InputNumber
            text={'Digite Cantidad De Dinero Recaudado'}
            value={recaudo}
            onChange={onChange}
          />
        </Modal>
      )}
      {usuario && seleccion === 'Compras-Facturar' && <FacturasCompras />}
      {usuario && seleccion === 'Compras-Devoluciones' && <DevCompras />}
      {usuario && seleccion === 'Compras-Orden de Pedido' && <OrdenCompra />}
      {usuario && seleccion === 'Compras-Informes' && <InformeCompras />}
      {usuario && seleccion === 'Compras-Proveedores' && <Proveedores />}
      {usuario && seleccion === 'Inventarios-Entradas' && (
        <EntradasInventario />
      )}
      {usuario && seleccion === 'Inventarios-Salidas' && <SalidasInventario />}
      {usuario && seleccion === 'Inventarios-Ajustes' && <AjustesInventario />}
      {usuario && seleccion === 'Inventarios-Agrupaciones' && <Agrupaciones />}
      {usuario && seleccion === 'Inventarios-Artículos' && <Articulos />}
      {usuario && seleccion === 'Inventarios-Párametros' && (
        <ParametrosInventario />
      )}
      {usuario && seleccion === 'Inventarios-Informes' && (
        <InformeInventarios />
      )}
      {usuario && seleccion === 'CRM-Clientes' && <Clientes />}
      {usuario && seleccion === 'CRM-Informes' && <InformeCRM />}

      <Modal
        title='Imprimir Cierre'
        visible={modalAlerta}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        bodyStyle={{
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'space-evenly',
          'font-size': '25px'
        }}
      >
        <div>
          <div style={{ display: 'none' }}>
            <FormatoCierre
              ref={componentRef}
              ventas={ventas}
              recaudo={recaudo}
              cuadre={recaudo - ventas}
            />
          </div>
          <Button
            onClick={() => {
              handlePrint()
              setModalAlerta(false)
            }}
          >
            IMPRIMIR
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default App
