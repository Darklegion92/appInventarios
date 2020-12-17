import React from "react";
import "./styles.css";

export default class FormatoFactura extends React.Component {
  render() {
    const { datos, nombre, documento } = this.props;
    return (
      <div className="formato-devolucion">
        <div className="encabezado">
          <div>PREMIUN SHOP CARNICERIA Y CHARCUTERIA</div>
          <div>NIT. 88215368</div>
          <div>Calle 35 #3-50 SABANA, PATIOS</div>
          <div>Telf. 3125920184</div>
          <div>DEVOLUCÓN EN VENTA</div>
        </div>
        <div className="cuerpo">
          <div className="columnas">
            <div style={{ width: "15%" }}>Código</div>
            <div style={{ width: "40%" }}>Descripción</div>
            <div style={{ width: "8%" }}>Cant</div>
            <div style={{ width: "12%" }}>V. Un</div>
            <div style={{ width: "15%" }}>V. Total</div>
          </div>
          {datos.map((dato) => {
            return (
              <div className="fila">
                <div style={{ width: "15%" }}>{dato.codigoarticulo}</div>
                <div style={{ width: "40%" }}>{dato.descripcionarticulo}</div>
                <div style={{ width: "8%" }}>{dato.cantidadarticulo}</div>
                <div style={{ width: "12%" }}>{dato.valorarticulo}</div>
                <div style={{ width: "15%" }}>{dato.total}</div>
              </div>
            );
          })}
        </div>
        <div className="pie">
          <div style={{ fontSize: "12px", "text-align": "left" }}>
            ______________________________
          </div>
          <div style={{ fontSize: "12px", "text-align": "left" }}>{nombre}</div>
          <div style={{ fontSize: "12px", "text-align": "left" }}>
            {documento}
          </div>
          <div style={{ fontSize: "12px", "text-align": "left" }}>
            Recibi mi devolucón
          </div>
          <div style={{ fontSize: "15px", "font-weight": "bold" }}>
            GRACIAS POR SU COMPRA
          </div>
          <div style={{ fontSize: "10px", "font-weight": "bold" }}>
            SOLTEC-Tecnología y Desarrollo
          </div>
        </div>
      </div>
    );
  }
}
