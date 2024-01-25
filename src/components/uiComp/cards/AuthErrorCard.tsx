import AlertIcon from "../../icons/AlertIcon"

const AuthErrorCard = () => {
    return (
        <div
            className="text-sc-red-900 flex flex-col justify-center items-center font-yekanX bg-white border border-gray-50 shadow-lg w-fit h-fit gap-2 py-8 px-24 rounded-lg">
            <AlertIcon size={40} />

            <div className="flex flex-col justify-center text-center gap-1 mt-2">
                <p>خطا در اعتبارسنجی</p>

                <p className="font-semibold"> از طریق سایت اقدام کنید</p>
            </div>

            <a href="https://sitechoob.ir" className="bg-sc-red-900 px-5 py-3 mt-4 rounded-lg text-white">
                بازگشت
            </a>
        </div>
    )
}

export default AuthErrorCard
