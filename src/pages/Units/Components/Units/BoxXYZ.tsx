import { useEffect } from 'react';

import './BoxXYZ.css';

interface BoxXYZProps {
    width: number;
    height: number;
    depth: number;
}

function BoxXYZ({ width, height, depth }: BoxXYZProps) {
    useEffect(() => { }, [width, height, depth]);
    return (
        <div className="w-fit justify-center flex-items-center flex-col p-8 pl-12 pb-12 border rounded-md">
            <div className="flex flex-col items-center text-xs relative top-12 right-16  z-10 rotate-180 mr-4 rounded-lg ">
                <span className="rotate-180">{depth}</span>
                <span className="rotate-180">عمق</span>
            </div>
            <div className="flex justify-center items-end border-l-2 border-b-2 border-sc-blue-normal parallelogram bg-sc-purple-normal">
                <div className="flex flex-col items-center text-xs">
                    <span className="ml-1">طول</span>
                    <span>{width}</span>
                </div>
            </div>
            <div className="rectangle flex justify-end items-center border-l-2 border-sc-blue-normal bg-sc-purple-normal ml-2 ">
                <div className="flex flex-col items-end text-xs">
                    <span className="ml-1">عرض</span>
                    <span className="ml-1"> {height}</span>
                </div>
            </div>
        </div>
    );
}

export default BoxXYZ;
