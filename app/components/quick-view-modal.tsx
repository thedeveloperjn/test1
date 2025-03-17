import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import QuickViewProduct from "./quick-view-card";
import { VisuallyHidden } from "./visually-hidden";
import { Product } from "../interfaces/product/product";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  params: { slug: string };
  searchParams: { [key: string]: string };
  productOne: Product;
  productPath: string;
}

export function QuickViewModal({
  isOpen,
  onOpenChange,
  params,
  searchParams,
  productOne,
  productPath,
}: AuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-screen-md p-0 border-none overflow-hidden ring-0 shadow-none m-0 bg-transparent">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle hidden>Edit profile</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <div className="h-auto overflow-hidden">
          <QuickViewProduct
            searchParams={searchParams}
            params={params}
            productOneData={productOne}
            productPath={productPath}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
