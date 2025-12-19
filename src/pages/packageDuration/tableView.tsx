import React, { useState, useEffect, useCallback } from "react";
import DataTable from "../../components/tables/dataTable";
import { fetchPackageTypesReq } from "../../services/api/packages/packageTypeApi";
import { PackageDurationResType, PackageType } from "../../types/packageType";
import HLoader from "../../components/loaders/hLoader";
import packageDurationColumns from "./column";
import { fetchPackageDurationReq } from "../../services/api/packages/packageDurationApi";
import { useTableRefreshStore } from "../../store/tableRefreshStore";

const TableList = () => {
  const { refreshKey } = useTableRefreshStore();

  const [data, setData] = useState<PackageDurationResType[]>([]);
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

  const fetchData = useCallback(
    async (page: number, pageSize: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetchPackageDurationReq(page, pageSize);

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
    },
    [refreshKey]
  );

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
        columns={packageDurationColumns}
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
