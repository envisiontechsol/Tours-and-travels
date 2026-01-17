import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";

import DataTable from "../../components/tables/dataTable";
import HLoader from "../../components/loaders/hLoader";

import { TagResType, TopLevelTagResType } from "../../types/packageType";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";

import { tagsColumns } from "./column";
import { useTableRefreshStore } from "../../store/tableRefreshStore";
import { fetchTopLevelMenusReq } from "../../services/api/topLevelMenu/topLevelMenuApi";
import RenderIf from "../../components/renderIf";

interface OptionType {
  label: string;
  value: string;
}

const TableList = () => {
  const { refreshKey } = useTableRefreshStore();

  const [data, setData] = useState<TagResType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [topLevelTagsOpts, settopLevelTagsOpts] = useState<OptionType[]>([]);
  const [selectedTopLevel, setSelectedTopLevel] = useState<OptionType | null>(
    null
  );

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    hasPrev: false,
    hasNext: false,
  });

  const getTopLevelTagsList = async () => {
    try {
      const res = await fetchTopLevelMenusReq(1, 100);

      const tagsOpts =
        res?.data?.map((i: TopLevelTagResType) => ({
          label: i.name,
          value: i.id,
        })) || [];

      settopLevelTagsOpts([{ label: "All", value: "" }, ...tagsOpts]);
    } catch (error) {
      settopLevelTagsOpts([{ label: "All", value: "" }]);
    }
  };

  const fetchData = useCallback(
    async (page: number, pageSize: number, topLevelId?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetchTagsReq(page, pageSize, topLevelId);

        setData(res?.data || []);
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
    getTopLevelTagsList();
  }, []);

  useEffect(() => {
    fetchData(1, pagination.pageSize);
  }, [fetchData]);

  if (isLoading && !selectedTopLevel) {
    return (
      <div className="p-6">
        <HLoader />
      </div>
    );
  }

  if (!data?.length && !selectedTopLevel) {
    return (
      <div className="p-6 rounded-lg mb-6 py-6 sm:px-6 lg:px-8 flex flex-col items-center">
        <p>-: No data :-</p>
      </div>
    );
  }

  return (
    <div className="px-6 space-y-4 min-h-96">
      {/* Top Level Menu Filter */}
      <div className="max-w-xs">
        <Select
          options={topLevelTagsOpts}
          value={selectedTopLevel}
          placeholder="Select Top Level Menu"
          isClearable
          onChange={(opt) => {
            setSelectedTopLevel(opt);
            fetchData(1, pagination.pageSize, opt?.value);
          }}
        />
      </div>

      <RenderIf isShown={isLoading}>
        <HLoader />
      </RenderIf>

      <RenderIf isShown={!data?.length && !isLoading}>
        <div className="p-6 rounded-lg mb-6 py-6 sm:px-6 lg:px-8 flex flex-col items-center">
          <p>-: No data :-</p>
        </div>
      </RenderIf>

      {/* Data Table */}
      <RenderIf isShown={!!data?.length && !isLoading}>
        <DataTable
          columns={tagsColumns}
          data={data}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalPages={pagination.totalPages}
          hasPrev={pagination.hasPrev}
          hasNext={pagination.hasNext}
          onPageChange={(p) => {
            fetchData(p, pagination.pageSize, selectedTopLevel?.value);
          }}
          onPageSizeChange={(size) => {
            fetchData(1, size, selectedTopLevel?.value);
          }}
        />
      </RenderIf>
    </div>
  );
};

export default TableList;
