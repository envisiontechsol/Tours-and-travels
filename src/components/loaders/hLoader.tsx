import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const HLoader = () => {
  return (
    <div className=" p-6 rounded-lg  mb-6 py-6 sm:px-6 lg:px-8 flex flex-col items-center">
      <Spin indicator={<LoadingOutlined spin />} /> Loading...
    </div>
  );
};

export default HLoader;
