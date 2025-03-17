
import { OrderProduct } from "../../../interfaces/order/order";
import { cn } from "../../../lib/utils";
import Image from "next/image";

type Props = {
  className?: string;
  data: OrderProduct;
};

const OrderDetailCard = ({ data, className }: Props) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-col md:flex-row md:justify-between p-2 gap-2 w-full border-b border-dashed border-gray-300 ",
          className
        )}
      >
        <div className="flex justify-between gap-2 md:w-[60%]">
          <div className="aspect-[3/4] sm:h-32 h-32 relative overflow-hidden flex-shrink-0 rounded-lg">
            {/* <ResponsiveImage
              src={data.images[0]}
              alt={data?.productName}
              ratio="1/1"
            /> */}
            <Image
              src={data.images[0]}
              alt={data?.productName}
              width={1000}
              height={1000}
              className="w-auto"
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="text-base sm:text-lg font-medium text-gray-900 font-federo sm:line-clamp-2 line-clamp-1 hover:cursor-pointer transition-all duration-150 animate-in">
              {data?.productName}
            </div>
            <div className="flex gap-2">
              {data?.variant?.filter((e) => e.title == "color")[0]?.option && (
                <div className="w-10 h-10 p-1 border border-gray-200">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundColor: data?.variant?.filter(
                        (e) => e.title == "color"
                      )[0]?.option,
                    }}
                  ></div>
                </div>
              )}

              {data?.variant?.filter(
                (e: { title: string }) => e.title == "age"
              )[0]?.option && (
                <div className="border text-center p-2 w-auto h-10 whitespace-nowrap">
                  {
                    data?.variant?.filter(
                      (e: { title: string }) => e.title == "age"
                    )[0]?.option
                  }
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end md:w-[40%] w-full ">
          <div className="flex w-full justify-between p-1">
            <span className="text-sm text-gray-600 inline-block">
              Total Quantity &nbsp;
            </span>
            <div className="">{data.productQuantity}</div>
          </div>

          <div className="flex w-full justify-between bg-gray-200 p-1">
            <div className="text-sm text-gray-600 inline-block">Unit Price</div>
            <div className="">&#8377;{data.sellingPrice}</div>
          </div>
          <div className="flex w-full justify-between p-1 gap-2">
            <div className="text-sm text-gray-600 inline-block">
              Total Amount
            </div>
            <div className="">
              &#8377;{data?.sellingPrice * data.productQuantity}
            </div>
          </div>

          {/* {data?.variant.filter((e) => e?.title == "color")[0] && (
            <div className="relative w-8 h-8 border border-gray-200 p-1 my-2">
              {
                <div
                  className=" h-full w-full  "
                  style={{
                    backgroundColor: data?.variant.filter(
                      (e) => e?.title == "color"
                    )[0]?.option,
                  }}
                />
              }
            </div>
          )} */}
          {/* <div
            className="text-[#F3238A] flex flex-row tooltip tooltip-left tooltip-primary"
            data-tip="review"
            onClick={() => toggleModal(data?.productId, data?._id)}
          >
            {[1, 2, 3, 4, 5].map(value => (
              <div key={value}>
                <Icon
                  icon={
                    randomNumber >= value
                      ? ICONS_WEB?.star.fill
                      : ICONS_WEB?.star.outline
                  }
                  width={15}
                  color={randomNumber >= value ? '#F0799E' : 'black'}
                />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default OrderDetailCard;
