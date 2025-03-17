import Image from "next/image";
import { OrderData, OrderProduct } from "../../../interfaces/order/order";
import { cn } from "../../../lib/utils";
import mmddyyyy from "../../../utils/functions/date/mmddyyyy";
import DataVisual from "./DataVisual";
import { formatCurrency } from "../../../utils/functions/productPriceUtil";
import { Button } from "../../../components/Button";

type Props = {
  data: OrderData;
  className: string;
  onUpdateData: (arg: OrderProduct[], orderId: string) => void;
};

const OrderCard2 = ({ data, className, onUpdateData }: Props) => {
  const updateData = (products: OrderProduct[], orderId: string) => {
    onUpdateData(products, orderId);
    // alert(JSON.stringify(products, null, 2),);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        updateData(data?.orderDetails.orderedProducts, data?.orderId);
      }}
      className=" rounded-none p-4 bg-white hover:cursor-pointer border-b border-gray-300 border-dashed"
    >
      <div className="flex items-center mb-4">
        <div className="aspect-[3/4] sm:h-32 h-32 relative overflow-hidden flex-shrink-0 rounded-lg">
          <Image
            src={data?.orderDetails.orderedProducts[0].images[0]}
            alt="data"
            width={1000}
            height={1000}
            className="w-auto bg-pink-900"
          />
        </div>
        <div className="ml-4 w-full">
          <div className="flex justify-between items-start mb-4 w-full">
            <div>
              <p className="text-sm text-gray-600">ORDER PLACED</p>
              <p className="text-sm font-medium">
                {mmddyyyy(data?.orderDetails.orderDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">TOTAL</p>
              <p className="text-sm font-medium">
                ₹ {formatCurrency(data?.orderDetails.orderTotal)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ORDER #</p>
              <p className="text-sm font-medium">{data?.orderId}</p>
            </div>
          </div>
          {/* <p className="text-sm text-gray-600">SHIP TO</p>
            <p className="text-sm font-medium">{shipTo}</p> */}
          <div className="flex justify-between items-start mb-4 w-full">
            <p className="text-sm">
              <span className="text-sm text-gray-600 inline-block">
                Total Quantity &nbsp;
              </span>
              {data?.orderDetails?.orderedProducts?.reduce(
                (accumulator, currentValue) => {
                  return accumulator + currentValue.productQuantity;
                },
                0
              )}
            </p>
            <p className="text-sm  ">
              <span className="text-sm text-gray-600 inline-block">
                Status &nbsp;
              </span>
              {data?.orderDetails.orderStatus.split("_").join(" ")}
            </p>
          </div>
          <div className="flex laptop:flex-col gap-1 justify-between w-full laptop:w-auto mt-2 ">
            {/* <Button
              variant="outline"
              size="default"
              className="w-full bg-secondary/10 text-black rounded-full font-light lg:text-xs text-xs hover:text-black hover:bg-secondary/10"
            >
              {data?.orderDetails.orderStatus}
            </Button> */}
            <Button
              variant="outline"
              size="default"
              className="w-full bg-secondary/10 text-black rounded-full font-light lg:text-xs text-xs hover:text-black hover:bg-secondary/10"
            >
              {data?.orderDetails.orderMode}
            </Button>
            <Button
              variant="outline"
              size="default"
              className="w-full border bg-secondary text-white border-secondary rounded-full lg:text-sm text-xs hover:text-white"
            >
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard2;
