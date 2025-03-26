import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Product } from "../../../interfaces/product/product";
// import { Personalisation } from "./pesonalisation";




interface Props {
  params: { slug: string[] };
  searchParams: { [key: string]: string };
  setInputValues: (value: any) => void;
  inputValues: any;
  filePreviews :any;
  setFilePreviews: (value: any) => void;
}
export function ProductDetails({ inputValues, product, setInputValues ,filePreviews,setFilePreviews }: { inputValues: any; product: Product; setInputValues: (value: any) => void; filePreviews: any; setFilePreviews: (value: any) => void }) {
   
  if(product)
  return (
    <Accordion
  type="single"
  collapsible
  className="mt-8"
  defaultValue="personalisation"
>
      <AccordionItem
        value="product-detaiils"
        className="border-t border-[#e9dccf]  text-xl border-none"
      >
        <AccordionTrigger className="text-black text-lg border-b border-[#D9D9D9]   hover:no-underline">
          Product Details
        </AccordionTrigger>
        <AccordionContent className="bord">
          <div
            className=" text-wrap leading-8 text-gray-600 text-base font-light border-none pt-4 font-open-sans"
            dangerouslySetInnerHTML={{
              __html: product?.description as string | TrustedHTML,
            }}
          />
        </AccordionContent>
        
      </AccordionItem>
      <AccordionItem
        value="personalisation"
        className="border-t border-[#e9dccf]  text-xl border-none"
      >
        
        {/* <AccordionTrigger className="text-black hover:text-[#c06428] text-lg border-b border-[#D9D9D9]   hover:no-underline">
        Personalise Your Product
        </AccordionTrigger> */}
        <AccordionContent className="bord">
        <div className="text-wrap leading-8 text-gray-600 text-base font-light border-none pt-4 font-open-sans">
  {/* <Personalisation
    specifications={[
      ...(product?.inputFields?.inputTextFields ?? []).map((field) => ({
        key: field.title,
        value: "", 
      })),
      ...(product?.inputFields?.inputImageFields ?? []).map((field) => ({
        key: field.title,
        value: "", 
      })),
    ]}
  inputValues={inputValues}
    inputFields={product?.inputFields ?? { inputTextFields: [], inputImageFields: [] }} 
    setInputValues={setInputValues}
    filePreviews={filePreviews}
    setFilePreviews={setFilePreviews}

    
  /> */}




</div>

</AccordionContent>


      </AccordionItem>
      {product.applicableDiscounts && (
        <AccordionItem
          value="offers"
          className="border-t border-black  text-xl border-none"
        >
          <AccordionTrigger className="text-black  text-lg border-b border-[#D9D9D9]   hover:no-underline">
            Offers
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside ">
              {product.applicableDiscounts.map((offer, index) => (
                <li
                  key={index}
                  className="  text-wrap leading-8 tracking-wider text-gray-600 text-base font-normal border-none pt-4 font-open-sans"
                >
                  {offer?.discountTitle}
                </li>
              ))}{" "}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
