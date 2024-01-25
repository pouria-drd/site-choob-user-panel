const FlexTable = ({ data, addIndex = false }: ResponsiveTableProps) => {
  return (
    <div className="flex flex-col rounded-lg font-peyda overflow-auto mx-auto w-full h-auto pr-1 gap-4 ">
      {data.rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="bg-white flex flex-col border rounded-lg divide-y w-full p-4 "
        >
          {addIndex && (
            <div className="flex items-center justify-between hover:bg-gray-50 transition-all px-4 py-4">
              <div className="text-xs sm:text-sm font-yekanX ss02">
                {rowIndex + 1}
              </div>
              <h3 className="font-bold text-xs sm:text-sm">#</h3>
            </div>
          )}
          {data.headers.map((header, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-gray-50 transition-all px-4 py-4"
            >
              <div className="text-xs sm:text-sm font-yekanX ss02">
                {row[index]}
              </div>
              <h3 className="font-bold text-xs sm:text-sm">{header}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlexTable;
