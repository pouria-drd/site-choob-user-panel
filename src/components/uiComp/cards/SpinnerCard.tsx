import Spinner from "../spinner/Spinner";

interface SpinnerCardProps {
    text: string;
}

const SpinnerCard = ({ text }: SpinnerCardProps) => {
    return (
        <div className="flex flex-col justify-center items-center bg-white border border-gray-50 shadow-lg w-fit h-fit gap-8 py-10 px-24 rounded-lg">
            <Spinner size={60} />

            <p className="font-yekanX text-xl text-sc-blue-normal">
                {text}
            </p>
        </div>
    )
}

export default SpinnerCard