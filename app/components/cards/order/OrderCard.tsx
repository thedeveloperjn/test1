import Image from "next/image";

import { OrderData, OrderProduct } from "@/interfaces/order/order";
import { cn } from "@/lib/utils";
import mmddyyyy from "@/utils/functions/date/mmddyyyy";
import DataVisual from "./DataVisual";

type Props = {
  data: OrderData;
  className: string;
  onUpdateData: (arg: OrderProduct[], orderId: string) => void;
};

const OrderCard = ({ data, className, onUpdateData }: Props) => {
  const updateData: any = (data: any, orderId: any) => {
    onUpdateData(data, orderId);
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          updateData(data?.orderDetails.orderedProducts, data?.orderId);
        }}
        className={cn(
          " flex p-4 justify-between gap-4 flex-wrap hover:cursor-pointer",
          className
        )}
      >
        <div className="aspect-[3/4] sm:h-32 h-32 relative overflow-hidden flex-shrink-0 rounded-lg">
          <Image
            src={data?.orderDetails.orderedProducts[0].images[0]}
            alt="data"
            width={1000}
            height={1000}
            className="w-auto bg-pink-900"
          />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex justify-between">
            <p className=" sm:text-lg text-sm lg:text-center text-start whitespace-nowrap  font-federo text-black">
              #{data?.orderId}
            </p>
            {/* <DataVisual name="#" value={data?.orderId} /> */}
            <DataVisual
              name="Order Date:"
              value={mmddyyyy(data?.orderDetails.orderDate)}
            />
          </div>
          <div className="flex justify-between">
            <DataVisual
              name="Order Value"
              value={data?.orderDetails.orderTotal}
            />
            <DataVisual
              name="No of Quantity:"
              value={data?.orderDetails?.orderedProducts?.reduce(
                (accumulator, currentValue) => {
                  return accumulator + currentValue.productQuantity;
                },
                0
              )}
            />
          </div>
        </div>
        <div className="flex laptop:flex-col gap-1 justify-between w-full laptop:w-auto">
          <div className="text-sm text-center  p-2 w-full   text-red-700 bg-red-200">
            {data?.orderDetails.orderStatus}
          </div>
          <div className="text-sm text-center  p-2 w-full  bg-gray-100">
            {data?.orderDetails.orderMode}
          </div>
          <button className="text-sm text-center p-2 w-full  bg-gray-100 hover:text-primary active text-nowrap">
            track order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
