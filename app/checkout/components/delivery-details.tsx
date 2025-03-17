import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
interface StateProps {
  id: number;
  name: string;
  iso2: string;
}
export function DeliveryDetails({ form }: { form: any }) {
  const [loading, setLoading] = useState(false);
  const [stateValue, setStateValue] = useState<string>();
  const [stateList, setStatList] = useState<StateProps[] | null>();

  // Refs for navigation
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const zipCodeRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLTextAreaElement | null>(null);
  const stateRef = useRef<HTMLDivElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const fetchCityAndState = async (zipCode: string) => {
    if (zipCode.length === 6) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${zipCode}`
        );
        const data = await response.json();
        if (data[0].Status === "Success") {
          const { District, State } = data[0].PostOffice[0];
          form.setValue("city", District);
          form.setValue("state", State);
          setStateValue(State);
        } else {
          alert("Invalid Pincode. Please check and try again.");
        }
      } catch (error) {
        console.error("Error fetching city and state:", error);
        alert("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchStateByCity = async () => {
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "RHZLV0I1YkFjOHNKYTlBUTJzdnI4WEZuaDA2em13OVpaaU9vbW81dg==",
          },
        }
      );
      const data = await response.json();
      if (data) {
        setStatList(data);
      }
    } catch (error) {
      console.error("Error fetching city and state:", error);
      alert("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStateByCity();
  }, []);
  return (
    <div className="bg-transparent">
      <h2 className="text-lg mb-4 px-2 font-federo text-black">
        Delivery Details
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="firstName">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    placeholder="Your Complete Name"
                    className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        emailRef.current?.focus();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="email">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Id"
                    className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        zipCodeRef.current?.focus();
                      }
                    }}
                    ref={emailRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem hidden>
                <FormLabel className="sr-only" htmlFor="phone">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Mobile No."
                    className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white"
                    {...field}
                    ref={phoneRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        zipCodeRef.current?.focus();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="zipCode">
                  ZIP Code
                </FormLabel>
                <FormControl>
                  <Input
                    id="zipCode"
                    placeholder="Pincode"
                    className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white"
                    {...field}
                    ref={zipCodeRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        cityRef.current?.focus();
                      }
                    }}
                    onBlur={(e) => fetchCityAndState(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="city">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    id="city"
                    placeholder="City"
                    className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white"
                    {...field}
                    ref={cityRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        stateRef.current?.focus();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only" htmlFor="state">
                  State
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      setStateValue(value);
                      field.onChange(value);
                    }}
                    value={stateValue?.toLowerCase()}
                  >
                    <SelectTrigger
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addressRef.current?.focus();
                        }
                      }}
                      className="px-6 shadow-none border-[#D1AB66] text-black sm:h-14 rounded-full bg-white"
                    >
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent ref={stateRef}>
                      {stateList?.map((state) => (
                        <SelectItem
                          key={state.id}
                          value={
                            state.name.toLowerCase() === "chhattisgarh"
                              ? "chattisgarh"
                              : state.name.toLowerCase()
                          }
                        >
                          {state.name}
                        </SelectItem>
                      ))}

                      {/* <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem> */}
                      {/* Add more states */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="address">
                Address
              </FormLabel>
              <FormControl>
                <Textarea
                  id="address"
                  placeholder="Enter Address"
                  className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white pt-4"
                  {...field}
                  ref={addressRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
