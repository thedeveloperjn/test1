"use client";

import { Banner } from "../interfaces/banners/dextop-banner";
import { cn } from "../lib/utils";
import { ClassNameValue } from "tailwind-merge";
import { DesktopBannerDefault } from "./dextop-banner-default";
import { MobileBannerDefault } from "./mobile-banner-default";
import { useEffect, useState } from "react";

export function ResponsiveBannerDefault({
  dextopBannerProp,
  mobileBannerprop,
  mBannerClassName,
  dBannerClassName,
}: {
  dextopBannerProp: Banner[];
  mobileBannerprop: Banner[];
  mBannerClassName?: ClassNameValue;
  dBannerClassName?: ClassNameValue;
}) {
  return (
    <>
      {mobileBannerprop && mobileBannerprop.length > 0 && (
        <div className={cn("lg:hidden sm:hidden block", mBannerClassName)}>
          <MobileBannerDefault allMobileBannerData={mobileBannerprop} />
        </div>
      )}
      {dextopBannerProp && dextopBannerProp.length > 0 && (
        <div className={cn("hidden sm:block lg:block", dBannerClassName)}>
          <DesktopBannerDefault
            bannerProps={dextopBannerProp}
            showNavButtons={true}
          />
        </div>
      )}
    </>
  );
}
