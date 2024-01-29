import { useEffect, useState } from 'react';
import './checkoutTable.css';
import StatusChip from '../../../components/uiComp/chips/StatusChip';
import { StatusEnum } from '../../../enums/StatusEnum';
function CheckoutProductTable({ sellers }: { sellers: ZoneSeller[] }) {
    const [totalPrice, setTotalPrice] = useState('');
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    useEffect(() => {
        let tPrice = 0;
        sellers.map((seller) => {
            tPrice += seller.totalPrice;
        });

        setTotalPrice(formatPrice(tPrice));
    }, [sellers]);

    return (
        <div className="flex flex-col gap-1">
            <table className="checkoutTable font-peyda">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="text-sm">
                            توضیحات
                        </th>
                        <th
                            scope="col"
                            className="text-sm">
                            قیمت کل
                        </th>
                        <th
                            scope="col"
                            className="text-sm">
                            فی
                        </th>

                        <th
                            scope="col"
                            className="text-sm">
                            تعداد
                        </th>
                        <th
                            scope="col"
                            className="text-sm">
                            فروشنده
                        </th>

                        <th
                            scope="col"
                            className="text-sm">
                            برش
                        </th>
                        <th
                            scope="col"
                            className="text-sm">
                            محصول
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller, index) =>
                        seller.products.map((sellerItem, sellerItemIndex) => (
                            <tr key={`${sellerItemIndex}${index}`}>
                                <td data-label="توضیحات">
                                    {sellerItem.status && <span className="ss02 font-yekanX">از {Object.keys(sellerItem.warehouses).length} انبار</span>}

                                    {!sellerItem.status && <span className="text-sc-red-900">{sellerItem.description}</span>}
                                </td>
                                <td
                                    data-label="قیمت کل"
                                    className="r2l">
                                    {formatPrice(sellerItem.calculatedPrice)}
                                </td>

                                <td
                                    data-label="فی"
                                    className="r2l">
                                    {formatPrice(sellerItem.fee)}
                                </td>

                                <td
                                    data-label="تعداد"
                                    className="font-yekanX ss02">
                                    {sellerItem.count}
                                </td>

                                <td data-label="فروشنده">{seller.sellerName}</td>

                                <td
                                    data-label="برش"
                                    className="flex justify-center">
                                    {sellerItem.hasDimensions && (
                                        <StatusChip
                                            type={StatusEnum.Warning}
                                            text={sellerItem.dimensionModel.title}
                                        />
                                    )}
                                    {!sellerItem.hasDimensions && (
                                        <StatusChip
                                            type={StatusEnum.Info}
                                            text="بدون برش"
                                        />
                                    )}
                                </td>

                                <td
                                    data-label="محصول"
                                    className="r2l">
                                    <p className="max-w-50 sm:max-w-96 md:max-w-full">{sellerItem.productName.replace(/-/g, ' ')}</p>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex rounded-b-lg border border-gray-400 p-2 bg-sc-purple-normal">
                <h4 className="sm:text-lg">جمع کل: {totalPrice}</h4>
            </div>
        </div>
    );
}

export default CheckoutProductTable;
