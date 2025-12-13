import { useCallback, useEffect, useState } from "react";
import HLoader from "../../components/loaders/hLoader";
import DataTable from "../../components/tables/dataTable";

import { fetchDestinationReq } from "../../services/api/locations/destinationApi";
import { DestinationResType } from "../../types/locationTypes";
import destinationColumns from "./column";

const TableList = () => {
  const [data, setData] = useState<DestinationResType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    hasPrev: false,
    hasNext: false,
  });

  const fetchData = useCallback(async (page: number, pageSize: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchDestinationReq(page, pageSize);

      setData(res?.data);
      setPagination({
        pageIndex: res?.config?.page,
        pageSize: res?.config?.pageSize,
        total: res?.config?.total,
        totalPages: res?.config?.totalPages,
        hasPrev: res?.config?.hasPrev,
        hasNext: res?.config?.hasNext,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log("rendering;");

  useEffect(() => {
    fetchData(1, pagination.pageSize);
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="p-6">
        <HLoader />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className=" p-6 rounded-lg  mb-6 py-6 sm:px-6 lg:px-8 flex flex-col items-center">
        <p>-:No data :-</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable
        columns={destinationColumns}
        data={data}
        pageIndex={pagination?.pageIndex}
        pageSize={pagination?.pageSize}
        totalPages={pagination?.totalPages}
        hasPrev={pagination?.hasPrev}
        hasNext={pagination?.hasNext}
        onPageChange={(p) => {
          fetchData(p, pagination?.pageSize);
        }}
        onPageSizeChange={(size) => {
          fetchData(pagination?.pageIndex, size);
        }}
      />
    </div>
  );
};

export default TableList;
