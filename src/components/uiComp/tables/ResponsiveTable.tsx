import { useEffect, useState } from 'react';
import FlexTable from './FlexTable';
import CustomTable from './CustomTable';

const ResponsiveTable = ({ data, addIndex = false }: ResponsiveTableProps) => {
    const [isMobile, setIsMobile] = useState(false);

    const breakpoint = 1200;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // Initial check on mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {}, [data]);
    return (
        <>
            {data.headers.length > 0 && data.rows.length > 0 ? (
                isMobile ? (
                    <FlexTable
                        data={data}
                        addIndex={addIndex}
                    />
                ) : (
                    <CustomTable
                        data={data}
                        addIndex={addIndex}
                    />
                )
            ) : (
                <div className="flex items-center justify-center bg-white rounded-lg font-peyda w-full py-4">هنوز اطلاعاتی برای نمایش وجود ندارد</div>
            )}
        </>
    );
};

export default ResponsiveTable;
