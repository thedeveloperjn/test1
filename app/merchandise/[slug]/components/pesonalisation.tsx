


import { Table, TableBody, TableCell, TableRow } from "../../../components/ui/table";
import { useEffect, useState } from "react";

type Specification = {
  key: string;
  value: string;
} | null;

interface ProductSpecificationsProps {
  specifications: Specification[];
  inputFields: {
    inputTextFields: { title: string }[];
    inputImageFields: { title: string }[];
  };
  // onInputChange: (key: string, value: string | string[]) => void; 
  setInputValues: any;
  inputValues: any;
  filePreviews: any;
  setFilePreviews: any;
}

export function Personalisation({
  specifications, inputValues,
  inputFields: { inputTextFields = [], inputImageFields = [] }, 
   setInputValues,
   filePreviews, setFilePreviews,

}: ProductSpecificationsProps) {
  // const [inputValues, setInputValues] = useState<{ [key: string]: string | number }>({});
  

  const handleInputChange = (key: string, value: string) => {
    
  //  onInputChange(key, value); 
    setInputValues((prev: any) => ({ ...prev, [key]: value }));
  };


  
  // const handleFileChange = (key: string, event: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);
  //     const newFileNames = filesArray.map((file) => file.name);
  //     const newFilePreviews = filesArray.map((file) => URL.createObjectURL(file)); 
  
  //     setFilePreviews((prev) => ({
  //       ...prev,
  //       [`${key}-${index}`]: newFilePreviews, 
  //     }));
  
  //     onInputChange(key, newFilePreviews); // Passing blob URLs to the parent
  //   }
  // };


  
const handleFileChange = async (key: string, event: React.ChangeEvent<HTMLInputElement>, index: number) => {
  if (event.target.files) {
    const file = event.target.files[0]; // Get the first file
    const formData = new FormData();
    formData.append("images", file);

    try {
      // Upload the image to the API
      const response = await fetch('https://api.giftingsaga.com/api/v1/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      console.log("image data:", data);


      const imageUrl = data?.images;

      console.log("image url:", imageUrl);

      // Ensure state updates correctly
      setFilePreviews((prev: any) => ({ ...prev, [key]: imageUrl }));

    
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};



// Use useEffect to confirm state updates
useEffect(() => {
  console.log("Updated filePreviews:", filePreviews);
}, [filePreviews]);

const handleRemoveFile = (key: string) => {
  setFilePreviews((prev: { [key: string]: string }) => ({
    ...prev,
    [key]: "", // Reset to an empty string or null instead of filtering
  }));
};


  return (
    <div className="my-8">
      <div className="flex-grow sm:w-4/4">
        <div className="grid sm:grid-cols-1 gap-4">
          <Table>
            <TableBody className="border border-[#F7F7F7] p-0">
              {specifications.map(
                (spec, specIndex) =>
                  spec && (
                    <TableRow key={spec.key + specIndex} className="border-none p-0 grid grid-cols-3">
                      <TableCell className="col-span-1 w-full sm:text-base text-xs font-normal text-gray-400 bg-white font-open-sans pl-5 pr-0 py-0">
                        <div className="py-5 w-full h-full border-b border-dashed border-[#D9D9D9] text-wrap">
                          {spec.key} <span className="text-red-700">*</span>
                        </div>
                      </TableCell>
                      <TableCell className="col-span-2 w-full bg-[#FFF8F3] font-medium sm:text-base text-xs text-black font-open-sans capitalize px-0 py-0 pr-2">
                        <div className="pl-4 py-3 w-full h-full border-b border-dashed border-[#D9D9D9] capitalize line-clamp-1">
                          {/* Check for text input based on the title */}
                          {inputTextFields.some((field) => field.title === spec.key) ? (
                            <input
                            required
                              type="text"
                              className="h-10 w-full bg-[#FFF8F3] focus:outline-none p-2 mb-2"
                              placeholder="Write Your Text Here ..."
                              value={inputValues[spec.key] || ""}
                              onChange={(e) => handleInputChange(spec.key, e.target.value)}
                            />
                          ) : inputImageFields.some((field) => field.title === spec.key) ? (
                            <div className="justify-center flex flex-col">
                              {/* Render the image previews if files are selected */}
                              <div className="flex items-center space-x-2 py-1">
                                 
                                 
                                 {
                                  filePreviews[spec.key]&&(
                                    <>
                                    <span>{filePreviews[spec.key]}</span>
                                    <button
  onClick={() => handleRemoveFile(spec.key)}
  className="text-gray-700 text-sm"
>
  x
</button>
                                   </>
                                  )
                                 }
                                 
                               </div>
                             
                              <label
                                htmlFor={`fileInput-${spec.key}`} 
                                className="cursor-pointer bg-[#FFFFFF] border-[#F3238A] border text-[#F3238A] px-8 py-2 rounded-full hover:bg-[#F3238A] hover:text-[#FFFFFF] transition text-4 mt-2 text-center"
                              >
                                Attach Files
                              </label>
                              <input
                              required
                                id={`fileInput-${spec.key}`} 
                                type="file"
                                className="hidden"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(spec.key, e, specIndex)} 
                              />
                            </div>   ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}




