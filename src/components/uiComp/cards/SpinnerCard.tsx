import Spinner from '../spinner/Spinner';

interface SpinnerCardProps {
    text: string;
}

const SpinnerCard = ({ text }: SpinnerCardProps) => {
    return (
        <div className="flex flex-col justify-center items-center bg-white border border-gray-50 shadow-lg w-fit h-fit gap-8 py-10 px-20 sm:px24 rounded-lg">
            <div className="relative">
                <div className="flex justify-center items-center h-16 w-16 sm:h-24 sm:w-24 rounded-full text-sc-blue-normal "></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <div className="rounded-full  border-sc-purple-normal border-dotted  border-t-4 sm:border-t-6 border-t-sc-blue-normal h-16 w-16 sm:h-24 sm:w-24 animate-spin-slow duration-300"></div>
                </div>
            </div>

            <p className="font-peyda text-lg sm:text-xl font-semibold antialiased text-sc-blue-normal whitespace-nowrap">{text}</p>
        </div>
    );
};

export default SpinnerCard;
