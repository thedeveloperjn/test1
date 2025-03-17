"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEnquiryService } from "@/services/enquiry/enquiry";
import { EnquiryProps } from "@/interfaces/enquiry/enquiry";
import { toast } from "react-toastify";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contactNo: z.string().regex(/^\d{10}$/, {
    message: "Contact number must be 10 digits.",
  }),
  emailId: z.string().email({
    message: "Please enter a valid email address.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  remarks: z.string().optional(),
});

interface UserFormPopupProps {
  submitButtonName?: string;
  submitButtonClassName?: string;
  inputFieldClassName?: string;
  triggerButtonName?: string;
  triggerButtonClassName?: string;
}

export function EnquiryFormPopup({
  submitButtonName = "Submit",
  submitButtonClassName = "",
  inputFieldClassName = "",
  triggerButtonName = "Open User Form",
  triggerButtonClassName = "",
}: UserFormPopupProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog open/close
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactNo: "",
      emailId: "",
      city: "",
      remarks: "",
    },
  });
  const { enquiryMutation, isEnquiring } = getEnquiryService();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: EnquiryProps = {
      name: values.name,
      contactNo: values.contactNo,
      emailId: values.emailId,
      city: values.city,
      remarks: values.remarks || " ",
    };

    enquiryMutation(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        setIsDialogOpen(false); // Close the dialog on successful submission
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerButtonClassName}>
          {triggerButtonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:space-y-8 order-2 sm:order-1 sm:p-8 p-4 sm:border-2 sm:border-white sm:rounded-3xl rounded-3xl sm:w-full w-72 sm:mt-0 mt-10">
        <DialogHeader>
          <DialogTitle className="font-federo text-black text-xl text-center">
            {triggerButtonName}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Full Name"
                      {...field}
                      className={inputFieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mobile Number"
                      {...field}
                      className={inputFieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Id"
                      {...field}
                      className={inputFieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      className={inputFieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional comments..."
                      {...field}
                      className={inputFieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={submitButtonClassName}>
              {submitButtonName}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
