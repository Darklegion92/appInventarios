import React from "react";
import "./styles.css";

export default class FormatoFactura extends React.Component {
  render() {
    const { ventas, cuadre, recaudo } = this.props;
    return (
      <div className="formato-cierre">
        <div className="encabezado">
          <div>PREMIUN SHOP CARNICERIA Y CHARCUTERIA</div>
          <div>NIT. 88215368</div>
          <div>Calle 35 #3-50 SABANA, PATIOS</div>
          <div>Telf. 3125920184</div>
          <div>CIERRE DE VENTAS</div>
        </div>
        <div className="cuerpo">
          <div style={{ width: "100%" }}>Total Ventas: {ventas}</div>
          <div style={{ width: "100%" }}>Total Recaudo: {recaudo}</div>
          <div style={{ width: "100%" }}>
            Total Sobrante: {(cuadre >= 0 && cuadre) || 0}
          </div>
          <div style={{ width: "100%" }}>
            Total Faltante: {(cuadre <= 0 && -cuadre) || 0}
          </div>
        </div>
        <div className="pie">
          <div style={{ fontSize: "10px", "font-weight": "bold" }}>
            SOLTEC-Tecnología y Desarrollo
          </div>
        </div>
      </div>
    );
  }
}
