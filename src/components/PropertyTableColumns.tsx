"use client";
import { PropertyTableData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import PropertyTableActions from "./PropertyTableActions";

// export type PropertyTableColumnType = {
//   name: string;
//   price: string;
//   type: string;
//   status: string;
// };

const PropertyTableColumns: ColumnDef<PropertyTableData>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right ml-left">PRICE</div>,
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-right ml-left">{data.price}</p>;
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="text-right">TYPE</div>,
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-right">{data.type}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">STATUS</div>,
    cell: ({ row }) => {
      const data = row.original;
      return <p className="text-right">{data.status}</p>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-left w-fit ml-8">ACTIONS</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-fit flex ml-8">
          <PropertyTableActions data={data} />
        </div>
      );
    },
  },
];

export default PropertyTableColumns;
