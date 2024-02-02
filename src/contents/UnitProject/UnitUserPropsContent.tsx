const UnitUserPropsContent = ({ data }: { data: UnitProjectPropsModel[] }) => {
    return (
        <div className="flex flex-col gap-2 justify-center w-full md:w-[700px] p-2">
            {data.map((p, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between border rounded-lg p-2 r2l text-xs sm:text-sm md:text-base hover:bg-sc-purple-normal ">
                    <p>{p.title}</p>
                    <p>{p.valueString === 'true' || p.valueString === 'false' ? (p.valueString === 'true' ? 'بله' : 'خیر') : p.valueString}</p>
                </div>
            ))}
        </div>
    );
};

export default UnitUserPropsContent;
