import React, { useState } from "react";
import { Button } from "antd";

export default function Boton(props) {
  const { icon, text } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="primary"
      shape="round"
      icon={icon}
      size={"large"}
      loading={loading}
      onClick={() => setLoading(true)}
    >
      {text}
    </Button>
  );
}
