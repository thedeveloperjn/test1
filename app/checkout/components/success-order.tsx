import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";

export function SuccessOrder({ orderId }: { orderId: string }) {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col justify-center items-center h-screen">
      <div className="space-y-4 text-center max-w-4xl">
        <h1 className="text-5xl font-light tracking-wider text-[#D1AB66] font-federo">
          Thank You For Shopping with Us
        </h1>
        <div className="flex items-center justify-center gap-1 pt-8">
          <p className="flex items-center text-lg text-black font-semibold gap-1 font-public-sans">
            Your Order Is Confirmed
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.52727 16L4.14545 13.5619L1.52727 12.9524L1.78182 10.1333L0 8L1.78182 5.86667L1.52727 3.04762L4.14545 2.4381L5.52727 0L8 1.10476L10.4727 0L11.8545 2.4381L14.4727 3.04762L14.2182 5.86667L16 8L14.2182 10.1333L14.4727 12.9524L11.8545 13.5619L10.4727 16L8 14.8952L5.52727 16ZM7.23636 10.7048L11.3455 6.4L10.3273 5.29524L7.23636 8.53333L5.67273 6.93333L4.65455 8L7.23636 10.7048Z"
                fill="#4ECB71"
              />
            </svg>
          </p>
          |
          <p className="flex items-center text-lg text-black font-semibold gap-1 font-public-sans">
            Order Id : {orderId}
          </p>
        </div>

        <p className="text-black font-public-sans text-lg  font-light">
          For Any Questions, Feel Free To Contact Us At giftingsaga78@gmail.com
        </p>
        <div className="pt-16">
          <Button
            onClick={() => router.push("/all/new_arrivals/all")}
            className="bg-[#AF7346] hover:bg-[#96663D] text-white px-8 py-6 text-lg rounded-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
