import { useEffect, useState } from 'react';
import './checkoutTable.css';
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
            <table className="checkoutTable font-peyda ">
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
                                <td data-label="وضعیت">
                                    {sellerItem.status && <span className="ss02 font-yekanX">از {sellerItem.warehouses.length} انبار</span>}

                                    {!sellerItem.status && <span className="text-sc-red-800">{sellerItem.description}</span>}
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

                                <td data-label="تعداد">{sellerItem.count}</td>

                                <td data-label="فروشنده">{seller.sellerName}</td>

                                <td data-label="برش">
                                    {sellerItem.hasDimensions && sellerItem.DimensionModel && sellerItem.DimensionModel.title && <span className="r2l text-sc-dark-200 rounded-lg border border-sc-dark-200 px-2 py-1">({sellerItem.DimensionModel.title}) برش</span>}
                                    {(!sellerItem.hasDimensions || !sellerItem.DimensionModel || !sellerItem.DimensionModel.title) && <span>بدون برش</span>}
                                </td>

                                <td
                                    data-label="محصول"
                                    className="r2l">
                                    {sellerItem.productName.replace(/-/g, ' ')}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex border border-gray-400 p-2 bg-sc-purple-normal">
                <h4 className="sm:text-lg">جمع کل: {totalPrice}</h4>
            </div>
        </div>
    );
}

export default CheckoutProductTable;
