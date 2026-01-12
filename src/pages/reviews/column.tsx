// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteReviewReq } from "../../services/api/reviews/reviewApi";
import { editReviewAction, viewReviewAction } from "../../store/editMgmtStore";
import { ReviewResType } from "../../types/reviewsTypes";

export const reviewColumns: ColumnDef<ReviewResType>[] = [
  {
    header: "Sl #",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.options.meta as {
        pageIndex: number;
        pageSize: number;
      };

      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Rating",
    accessorKey: "rating",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Feedback",
    accessorKey: "feedback",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<ReviewResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewReviewAction,
          onEdit: editReviewAction,
          onDelete: (data) => deleteReviewReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
