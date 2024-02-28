import { useEffect } from 'react';

const CustomTable = ({ data, addIndex = false, label }: ResponsiveTableProps) => {
    useEffect(() => {}, [data]);
    return (
        <div className="bg-white flex flex-col rounded-lg font-peyda w-full h-auto py-2 gap-4">
            {label && <h4 className="text-right px-4 font-bold pt-2">{label}</h4>}

            <table className="divide-y divide-sc-gray-normal  bg-sc-purple-normal first:divide-y-0 w-full r2l">
                {/* Table Header */}
                <thead className=" rounded-lg">
                    <tr>
                        {addIndex && <th className="text-center px-2 py-4">#</th>}
                        {data.headers.map((header, index) => (
                            <th
                                key={index}
                                className="text-center text-gray-400 font-light px-2 py-4">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                    {data.rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="bg-white p-4">
                            {addIndex && <td className="text-center overscroll-auto p-4 w-20">{rowIndex + 1}</td>}
                            {row.map((item, itemIndex) => (
                                <td
                                    key={itemIndex}
                                    className="text-center overscroll-auto p-4 w-20">
                                    {item}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <div className="flex justify-between w-full">
        <p>test</p>
        <p>test</p>
      </div> */}
        </div>
    );
};

export default CustomTable;
