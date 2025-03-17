"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperBanner from "@/app/components/swiper";


const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const params = useParams();
  const router = useRouter();
  const productId = params?.slug;

  // const { cartDetails, addToCart, isLoading, fetchCart } = useCartSlice();
  // const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useWishlistSlice();
  // const { authToken, isAuthenticated, checkAuth } = useAuthSlice();

  // useEffect(() => {
  //   checkAuth();
  //   if (isAuthenticated) {
  //     fetchCart();
  //     fetchWishlist();
  //   }
  // }, [isAuthenticated, checkAuth, fetchCart, fetchWishlist]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://swarnakriti-api.technolitics.com/api/v1/product/one/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        if (data.status && data.data) setProduct(data.data);
        else throw new Error("Invalid product data received");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // const cartItem = product
  //   ? {
  //       productDetail: {
  //         ...product,
  //         rows: product.rows.map((row) => ({
  //           ...row,
  //           discount: row?.discount || row.mrp - row.perProductPrice,
  //           variantData: row.variantData || [],
  //         }))[0],
  //       },
  //       quantity: 1,
  //       inputFields: { inputTextFields: [], inputImageFields: [] },
  //     }
  //   : null;

  // const alreadyInCart = cartItem ? checkProductInCart(cartItem) : false;
  // const isWishlisted = product ? wishlist.some((item) => item._id === product._id) : false;

  // const handleAddToCart = async () => {
  //   if (!cartItem) return;
  //   if (!isAuthenticated) {
  //     toast.info("Please log in to add to cart");
  //     router.push("/login");
  //     return;
  //   }
  //   try {
  //     if (alreadyInCart) {
  //       toast.info("Item already in cart");
  //       router.push("/cart");
  //     } else {
  //       await addToCart(cartItem);
  //       toast.success("Added to Cart!");
  //       router.push("/cart");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // const handleWishlist = async () => {
  //   if (!product) return;
  //   if (!isAuthenticated) {
  //     toast.info("Please log in to manage wishlist");
  //     router.push("/login");
  //     return;
  //   }
  //   try {
  //     if (isWishlisted) {
  //       await removeFromWishlist(product._id);
  //       toast.success("Removed from Wishlist");
  //     } else {
  //       await addToWishlist(product);
  //       toast.success("Added to Wishlist");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  const images = product?.images?.[0]?.values?.map((img) => img.url) ?? [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1300px] mx-auto">
        <p className="pt-10 text-sm text-gray-600 hidden md:block capitalize m-8 mt-0">
          <span className="font-bold">{product.title}</span>
        </p>

        <div className="lg:flex lg:gap-8 lg:m-8 lg:mb-0 lg:pb-20">
          <div className="lg:w-[60%] gap-2 flex-wrap lg:hidden">
            <SwiperBanner hoverPlay={false} imgClassName="h-[450px] w-full object-cover" images={images} />
          </div>

          <div className="lg:w-[45%] gap-6 flex-wrap sticky self-start top-[90px]">
            <Swiper
              spaceBetween={10}
              navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="w-full h-[550px] rounded-[12px]"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={img}
                    alt={`Product Image ${index}`}
                    width={600}
                    height={500}
                    unoptimized
                    className="rounded-lg w-full w-[600px] h-[600px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-22 right-4 z-50 flex items-center bg-gray-900 opacity-[0.7] text-white px-1 py-1 rounded-lg">
              <button className="custom-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <span className="text-sm font-semibold">
                {activeIndex} of {images.length}
              </span>
              <button className="custom-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
                </svg>
              </button>
            </div>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              freeMode
              watchSlidesProgress
              modules={[Thumbs]}
              className="mini w-full max-w-lg gap-[15px] h-[60px] opacity-[0.8] flex justify-center rounded-[12px] mt-4"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index} className="cursor-pointer !w-[60px]">
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={100}
                    height={100}
                    unoptimized
                    className={`border rounded-lg !w-[60px] h-[60px] object-cover ${
                      activeIndex - 1 === index ? "border-3 border-green-600" : ""
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="lg:w-[53%] p-5 lg:pt-0">
            <h3 className="text-xl md:text-3xl font-bold text-gray-900 -tracking-[0.02rem] font-movatif pb-2">{product.title}</h3>
            <p className="text-sm md:text-[16px] font-normal text-gray-600 pb-7 leading-relaxed">{product.subtitle}</p>
            <div className="border-b border-gray-300"></div>

            <div className="pt-6">
              <span className="lg:text-2xl font-bold text-gray-900">₹{product?.rows?.[0]?.perProductPrice ?? ""}</span>
              <span className="lg:text-lg text-sm font-normal ml-2 text-gray-500 line-through">
                ₹{product?.rows?.[0]?.mrp ?? ""}
              </span>
              {product?.rows?.[0]?.mrp && product?.rows?.[0]?.perProductPrice && (
                <span className="text-sm lg:text-lg font-normal text-orange-500 ml-2">
                  ({Math.round((product.rows[0].mrp - product.rows[0].perProductPrice) / product.rows[0].mrp * 100)}% OFF)
                </span>
              )}
              <p className="text-green-600 font-semibold pb-5 pt-1">Inclusive of all taxes</p>
              <div className="pt-6">
                <button
                  type="button"
                  // onClick={handleAddToCart}
                  // disabled={isLoading.state && isLoading.id === product._id}
                  className="w-[50%] md:w-[53%] mr-2 bg-gray-900 py-2 md:py-4 text-white font-semibold rounded-md disabled:bg-gray-500"
                >
                  {/* {isLoading.state && isLoading.id === product._id ? "Adding..." : alreadyInCart ? "Go to Cart" : "Add to Cart"} */}
                </button>
                <button
                  type="button"
                  // onClick={handleWishlist}
                  className="w-[45%] py-2 md:py-4 text-[#282c3f] border border-gray-400 font-semibold rounded-md hover:bg-gray-100"
                >
                  {/* {isWishlisted ? "Remove from Wishlist" : "Wishlist"} */}
                </button>
              </div>

              <div className="border-b border-gray-300 pt-4 pb-5"></div>
              <p className="pt-6">
                <strong>Seller: </strong>Swarnkriti
              </p>
              <p>Expected Delivery within 4 - 7 working days</p>
              <div className="border-b border-gray-300 pt-4 pb-5"></div>
              <p className="uppercase text-[14px] font-[700] text-[#282c3f] pt-5 pb-2">Delivery options</p>
              <p className="text-[14px] font-[700] text-[#282c3f] pt-5 pb-2">Get it by Wed, Mar 10</p>
              <p className="text-[14px] font-[700] text-[#282c3f] pt-5 pb-2">Pay on delivery available</p>
              <p className="text-[14px] font-[700] text-[#282c3f] pt-5 pb-2">Easy 14 days return and exchange</p>
              <p className="text-[#282c3f] font-[400] py-4">100% Original Products</p>
              <p className="uppercase text-[14px] font-[700] text-[#282c3f] pt-5 pb-2">Best offers</p>
              <p className="text-[#282c3f] font-[400] py-2">This Product is already at its Best Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;