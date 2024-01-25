interface TableData {
  headers: string[];
  rows: Array<Array<string | number | React.ReactNode>>;
}

interface ResponsiveTableProps {
  data: TableData;
  addIndex?: boolean;
}
