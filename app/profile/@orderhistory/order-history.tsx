"use client";
import OrderCard2 from "../../components/cards/order/OrderCard2";
import OrderDetailCard from "../../components/cards/order/OrderDetailCard";
import ProductReviewForm from "../../components/forms/ReviewForm";
import RefundModal from "../../components/modal/RefundModel";
import { OrderProduct } from "../../interfaces/order/order";
import { cn } from "../../lib/utils";
import { useGetAllOrders } from "../../services/order/get-all-order";
import { useReviewStore } from "../../store/slice/review.store";
import { isVariantMatch } from "../../utils/functions/isVariantMatch";
import { convertArrayToValue } from "../../utils/functions/optionToValue";
import { ArrowLeft } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "react-toastify";

export default function OrderHistory() {
  const [data, setData] = useState<OrderProduct[]>([]);
  const [orderId, setOrderId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(true);
  const { isReviewOpen, toggleModal } = useReviewStore();
  const { orderData } = useGetAllOrders();
  const [selectedOptions, setSelectedOptions] = useState<OrderProduct[]>([]);
  const onBack = () => {
    setActive(true);
  };
  const currentOrder = orderData?.find(
    (order: { orderId: string }) => order?.orderId === orderId
  );
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const selectedOption = data.find((option) => option._id === value);

    if (!selectedOption) return;

    currentOrder?.orderDetails?.orderStatus === "SHIPROCKET_DELIVERED"
      ? setSelectedOptions((prevSelected) => {
          if (prevSelected.find((option) => option._id === value)) {
            return prevSelected.filter((option) => option._id !== value);
          } else {
            return [...prevSelected, selectedOption];
          }
        })
      : currentOrder?.orderDetails?.orderStatus === "RETURN_INITIATED"
      ? toast.warning("Return Already Initiated !")
      : currentOrder?.orderDetails?.orderStatus === "EXCHANGE_INITIATED"
      ? toast.warning("Exchange Already Initiated !")
      : toast.warning("Order Not Delivered Yet !");
  };
  const updateData = (data: OrderProduct[], orderId: any) => {
    setActive(false);
    setData(data);
    setOrderId(orderId);
  };
  if (active)
    return (
      <div className=" container mx-auto max-w-5xl flex flex-col lg:grid lg:grid-cols-2 gap-3  mb-20 space-x-4">
        {/* {JSON.stringify(orderData)} */}
        {orderData?.map((e: any) => {
          return (
            <Suspense key={e._id} fallback={null}>
              <OrderCard2
                data={e}
                key={e._id}
                className="m-3"
                onUpdateData={updateData}
              />
            </Suspense>
          );
        })}
      </div>
    );
  else
    return (
      <div className="container mx-auto max-w-5xl mb-20">
        {/* {JSON.stringify(selectedOptions)} */}

        <div className="flex w-full justify-between md:text-xl mb-4 text-sm ">
          <div className="font-federo text-gray-500">
            ORDER ID: <span>{orderId}</span>
          </div>
          <button
            onClick={onBack}
            className="flex gap-2 text-center justify-center items-center content-center text-sm md:text-xl font-federo text-gray-700"
          >
            <ArrowLeft className="test-xs" />
            Back to order
          </button>
        </div>
        <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-4">
          {data?.map((option) => (
            <div key={option._id} className="relative inline-flex w-full">
              <div className={"relative min-w-full"}>
                <input
                  type="checkbox"
                  hidden
                  id={option.productName}
                  value={option._id}
                  checked={
                    selectedOptions.find(
                      (opt) =>
                        opt._id === option._id &&
                        currentOrder?.orderDetails?.orderStatus ===
                          "SHIPROCKET_DELIVERED"
                    ) as unknown as boolean
                  }
                  onChange={handleSelect}
                  className="checkbox checkbox-secondary m-3  top-0 z-10"
                />
                <label
                  htmlFor={option.productName}
                  data-tip={"Click to Return Or Exchange"}
                  className={cn(
                    " rounded-none p-4 bg-white hover:cursor-pointer border-b border-gray-300 border-dashed",
                    {
                      " border-2 border-secondary md:border-secondary md:tooltip":
                        selectedOptions.find((opt: OrderProduct) =>
                          isVariantMatch(
                            convertArrayToValue(opt.variant),
                            convertArrayToValue(option?.variant)
                          )
                        ) &&
                        currentOrder?.orderDetails?.orderStatus ===
                          "SHIPROCKET_DELIVERED",
                    }
                  )}
                >
                  <OrderDetailCard data={option} key={option._id} />
                </label>

                {/* {selectedOptions.find(
                (opt: OrderedProduct) =>
                  isVariantMatch(
                    convertArrayToValue(opt.variant),
                    convertArrayToValue(option?.variant)
                  ) &&
                  currentOrder?.orderDetails?.orderStatus ===
                    "SHIPROCKET_DELIVERED"
              ) && (
                <div className="md:p-0 p-3 md:w-full">
                  <input
                    type="text"
                    placeholder="Reason"
                    value={reasons[option.productId] || ""}
                    onChange={(event) =>
                      handleReasonChange(event, option.productId)
                    }
                    className=" w-full border-2 border-gray-300 outline-none p-2  rounded-none"
                  />
                </div>
              )} */}
                {/* {JSON.stringify(
                selectedOptions.find((opt: OrderedProduct) =>
                  isVariantMatch(
                    convertArrayToValue(opt.variant),
                    convertArrayToValue(option?.variant)
                  )
                )?.variant
              )} */}
              </div>
            </div>
          ))}
        </div>
        <RefundModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onSubmit={handleModalSubmit}
          onSubmit={() => {}}
        />
        {currentOrder?.orderDetails?.orderStatus === "SHIPROCKET_DELIVERED" &&
          selectedOptions?.length > 0 && (
            <div className="flex w-full justify-end md:relative fixed bottom-0  right-2 md:bg-transparent bg-base-200 z-10">
              <button
                className="border-2 border-black p-2 m-2"
                onClick={() => setIsModalOpen(true)}
              >
                Return
              </button>
              <button
                className="border-2 border-black bg-black text-white p-2 m-2"
                onClick={() => {}}
              >
                Exchange
              </button>
            </div>
          )}

        {/* <dialog
          id="my_modal_3"
          className={cn("modal", { " modal-open": isReviewOpen?.length > 0 })}
        >
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => toggleModal(orderData?.productId, orderId)}
            >
              ✕
            </button>
            <ProductReviewForm />{" "}
          </div>
        </dialog> */}
      </div>
    );
}
