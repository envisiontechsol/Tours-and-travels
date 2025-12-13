import { useState } from "react";

import HLoader from "../../components/loaders/hLoader";

export default function Dashboard() {
  const [loading, setloading] = useState(false);

  if (loading) {
    return <HLoader />;
  }

  return <div className="bg-gray-100 p-8"></div>;
}
