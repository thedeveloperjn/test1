"use client";
import { ResponsiveBannerDefault } from "../components/responsive-banner-default";
import { getAllDextopPromoBanner } from "../services/banners/dextop-banner";
import { getAllMobilePromoBanner } from "../services/banners/mobile-banner";

export const FeatureBannerSectionListing = () => {
  const { allDextopPromoBannerData } = getAllDextopPromoBanner();
  const { allMobilePromoBannerData } = getAllMobilePromoBanner();
  return (
    <ResponsiveBannerDefault
      dextopBannerProp={allDextopPromoBannerData || []}
      mobileBannerprop={allMobilePromoBannerData || []}
    />
  );
};
