import React from "react";

const RenderIf = ({
  isShown,
  children,
}: {
  isShown: boolean;
  children: any;
}) => {
  return isShown ? <>{children}</> : null;
};

export default RenderIf;
