import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { cn } from "../../lib/utils";
import Image from "next/image";

export function PaymentMethod({
  form,
  discountDetails,
}: {
  form: any;
  discountDetails: {
    data: {
      onlinePaymentDiscount: boolean;
      discount: number;
    };
  } | null;
}) {
  return (
    <div className="sm:bg-white">
      <div className="mb-4 px-2">
        <h2 className="text-lg  font-federo text-black">Proceed To Payment</h2>
        <p className="text-[#969696] text-xs sm:text-sm font-public-sans">
          All transactions are secure and encrypted.
        </p>
      </div>

      <FormField
        control={form.control}
        name="paymentMode"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-4"
              >
                <FormItem>
                  <FormLabel
                    htmlFor="online-payment"
                    // className="flex items-start px-2 py-6 hover:cursor-pointer justify-start group gap-2"

                    className={cn(
                      "flex items-center space-x-2 space-y-0  border border-[#EFEFEF] sm:rounded-full rounded-3xl px-4 py-2 hover:cursor-pointer justify-start group gap-2",
                      "[&:has([data-state=checked])]:border-black"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem
                        value="online-payment"
                        id="online-payment"
                      />
                    </FormControl>
                    <div
                      className={cn(
                        "flex items-start py-3 hover:cursor-pointer justify-start group gap-2"
                       
                      )}
                    >
                      <div className="w-full font-public-sans">
                        <div className="flex justify-start items-center gap-2 font-normal text-black">
                          <h2 className="">Online Payment</h2>
                          {discountDetails && (
                            <h3 className="">
                              Enjoy {`${discountDetails?.data?.discount}% OFF`}
                            </h3>
                          )}
                        </div>
                        <div className="flex sm:flex-row flex-col sm:items-center justify-start gap-2">
                          <p className="text-[#757373] text-xs sm:text-xs font-normal capitalize">
                            with Razorpay Secure (UPI, Cards, Wallets,
                            NetBanking)
                          </p>
                          <div className="relative max-w-[140px] min-h-30">
                            <Image
                              width={400}
                              height={20}
                              src="/images/online_pay.svg"
                              alt="payonline"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    htmlFor="cod"
                    // className="flex items-start px-2 py-6 hover:cursor-pointer justify-start group gap-2"

                    className={cn(
                      "flex items-center space-x-2 space-y-0  border border-[#EFEFEF] pl-4 rounded-full px-4 py-6 hover:cursor-pointer justify-start group gap-2",
                      "[&:has([data-state=checked])]:border-black"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="cod" id="cod" />
                    </FormControl>
                    <div
                      className={cn(
                        "flex items-start hover:cursor-pointer justify-start group gap-2 group border border-transparent"
                      )}
                    >
                      <div className="flex justify-start items-center font-normal text-black">
                        Cash On Delivery (COD)
                      </div>
                    </div>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
