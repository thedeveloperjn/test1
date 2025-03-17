import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import MobileNumberInput from "../../../components/forms/MobileNumberInput";
import OTPInput from "../../forms/OTPInput";
import SignupForm from "../../forms/signup";
import { Button } from "../../ui/button";
import { loginState } from "../../../interfaces/auth/login-popup";
import { LOGIN_MODAL_TYPE } from "../../../utils/constants/login-popup";
import { X } from "lucide-react";

interface AuthDialogProps {
  isOpen: loginState;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog
      open={
        isOpen != null &&
        (isOpen === LOGIN_MODAL_TYPE.MOBILE_INPUT ||
          isOpen === LOGIN_MODAL_TYPE.LOGIN_OTP_INPUT ||
          isOpen === LOGIN_MODAL_TYPE.SIGNUP_MODAL)
      }
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:p-8 p-4 sm:border-2 sm:border-white sm:rounded-3xl rounded-3xl sm:w-96 w-72 sm:mt-0 [&>button]:hidden">
        <DialogHeader className=" py-0 hidden mb-0">
          <DialogTitle
            hidden
            className="text-2xl font-federo text-center border"
          >
            Login
          </DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Button
            onClick={() => onOpenChange(false)}
            className="absolute sm:-top-10 sm:-right-20 right-0 p-3 rounded-full hover:bg-gray-200 transition-colors bg-transparent border-none shadow-none hover:bg-transparent"
            aria-label="Close dialog"
          >
            <X
              fontSize={35}
              strokeWidth={2}
              className="h-12 w-12 sm:text-white text-black "
            />
          </Button>
        </div>

        {isOpen === LOGIN_MODAL_TYPE.MOBILE_INPUT && (
          <div className="flex flex-col gap-2">
            <MobileNumberInput />
          </div>
        )}
        {isOpen === LOGIN_MODAL_TYPE.LOGIN_OTP_INPUT && <OTPInput />}
        {isOpen === LOGIN_MODAL_TYPE.SIGNUP_MODAL && <SignupForm />}
      </DialogContent>
    </Dialog>
  );
}
