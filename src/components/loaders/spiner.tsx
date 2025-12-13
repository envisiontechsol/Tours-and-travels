import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type SpinnerPropType = {
  color?: string;
  size?: "small" | "large" | "default";
};

const Spinner = ({ color, size, ...rest }: SpinnerPropType) => {
  return (
    <Spin
      size={size || "default"}
      indicator={<LoadingOutlined spin style={{ color: color || "blue" }} />}
      {...rest}
    />
  );
};

export default Spinner;
