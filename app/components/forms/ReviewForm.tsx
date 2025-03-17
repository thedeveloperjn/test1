"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useReviewStore } from "@/store/slice/review.store";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import GridItem from "../../components/containers/GridItem";
import { toast } from "react-toastify";
import ResponsiveImage from "../responsiveImage/ResponsiveImage";
import {
  useAddProductReview,
  useUpdateProductReview,
} from "@/services/review/review";

// Define the Zod schema
const productReviewSchema = z.object({
  message: z.string().min(1, "Description is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  images: z.instanceof(FileList).optional(),
});

type ProductReviewSchema = z.infer<typeof productReviewSchema>;

const ProductReviewForm: React.FC = () => {
  const { reviewProductMutate, reviewSubmitting, isReviewProductError } =
    useAddProductReview();
  const { updateReviewSubmitting } = useUpdateProductReview();
  const [previewURL, setPreviewURLs] = useState<string[] | null>(null);
  const { orderId, productId, toggleModal } = useReviewStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<ProductReviewSchema>({
    resolver: zodResolver(productReviewSchema),
    defaultValues: {
      rating: 1,
    },
  });
  const rating = useWatch({
    control,
    name: "rating", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: 1, // default value before the render,
  });
  const imageFiles = useWatch({
    control,
    name: "images",
  });

  useEffect(() => {
    const previews: string[] = [];

    if (imageFiles && imageFiles.length > 0) {
      Array.from(imageFiles).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            previews.push(reader.result as string);
            if (previews.length === imageFiles.length) {
              setPreviewURLs(previews);
            }
          };
          reader.readAsDataURL(file);
        } else {
          alert("Invalid file type. Please select an image.");
          setValue("images", undefined); // Reset the file input if invalid
          setPreviewURLs([]);
        }
      });
    } else {
      setPreviewURLs([]); // Reset the preview if no file is selected
    }
  }, [imageFiles, setValue]);

  const onSubmit = (data: ProductReviewSchema) => {
    const formData = {
      ...data,
      images: data?.images as FileList,
      orderId,
      productId,
    };

    reviewProductMutate(formData, {
      onSuccess: (res) => {
        toggleModal("", "");
        toast.success("Review Added Successfull");
      },
      onError: (error: any) => {
        toggleModal("", "");

        if (
          error?.response?.data?.message ===
          "Already review add to this product"
        )
          toast.error("Already review add to this product");
        else toast.error(error?.response?.data?.message);
      },
    });

    // Handle the form submission, e.g., send the data to the server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridItem className="flex flex-row justify-center">
        <h2 className="text-2xl font-semibold">Product Review</h2>
      </GridItem>
      <GridItem className="w-full gap-2 py-2">
        <label htmlFor="rating" className=" font-semibold text-lg">
          Ratings
        </label>
        <div className="flex flex-row gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value}>
              {/* <Icon
                onClick={() => setValue('rating', value)}
                icon={
                  rating >= value
                    ? ICONS_WEB?.star.fill
                    : ICONS_WEB?.star.outline
                }
                width={25}
                color={rating >= value ? '#F0799E' : 'black'}
              /> */}
              <input
                hidden
                type="radio"
                value={value}
                className="star-input"
                {...register("rating")}
              />
            </div>
          ))}
        </div>
      </GridItem>
      <GridItem className=" gap-2 py-2">
        <label htmlFor="images" className=" font-semibold text-lg">
          Images
        </label>
        <input
          className="form-text-field w-full font-bold"
          type="file"
          id="images"
          accept="image/*"
          {...register("images")}
          multiple
        />
        <div className="grid grid-cols-2 pt-2 gap-1">
          {previewURL &&
            previewURL.length > 0 &&
            previewURL.map((url, index) => (
              <div key={index} className="col-span-1 p-2  border border-1">
                <ResponsiveImage
                  ratio="1/1"
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              </div>
            ))}
        </div>
        {errors.images && <p>{errors.images.message}</p>}
      </GridItem>
      <GridItem className="gap-2 py-2">
        <label htmlFor="message" className=" font-semibold text-lg">
          Description
        </label>
        <textarea
          className="form-text-field w-full font-bold"
          id="message"
          {...register("message")}
        />
        <div className="text-red-400">
          {errors.message && <p>{errors.message.message}</p>}
        </div>
      </GridItem>
      <GridItem className="gap-2 py-2">
        {!reviewSubmitting ? (
          <button
            type="submit"
            className="border-2 border-black justify-center py-2 font-semibold  w-full bg-[#E7FCFF]"
          >
            Submit Review
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="border-2 border-black justify-center py-2 font-semibold  w-full bg-[#E7FCFF]"
          >
            Submitting...
          </button>
        )}
      </GridItem>
    </form>
  );
};

export default ProductReviewForm;
