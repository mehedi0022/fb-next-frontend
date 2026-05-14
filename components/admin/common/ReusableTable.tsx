import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ReusableTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

export function ReusableTable<T extends { id: number }>({
  columns,
  data,
  loading,
  loadingComponent,
}: ReusableTableProps<T>) {
  if (loading && loadingComponent) {
    return <div className="table-wrapper">{loadingComponent}</div>;
  }

  return (
    <div className="table-wrapper">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        size="middle"
      />
    </div>
  );
}
