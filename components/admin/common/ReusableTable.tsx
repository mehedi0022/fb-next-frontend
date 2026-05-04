import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ReusableTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
}

export function ReusableTable<T extends { id: number }>({
  columns,
  data,
  loading,
}: ReusableTableProps<T>) {
  return (
    <div className="table-wrapper">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        // className="rounded-lg overflow-hidden"
                size="middle"

      />
    </div>
  );
}
