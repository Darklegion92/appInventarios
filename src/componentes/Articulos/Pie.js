import React from "react";
import { Button } from "antd";

function Pie(props) {
  const { onClick } = props;
  return (
    <div className="articulos-pie">
      <Button type="primary" shape="round" size="large" onClick={onClick}>
        CREAR
      </Button>
    </div>
  );
}
export default Pie;
