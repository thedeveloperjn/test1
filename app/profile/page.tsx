import { Suspense } from "react";
import ProfileTabs from "./components/profile-tabs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center pt-10 gap-10">
      <Suspense fallback={<div>Loading order history...</div>}>
        <ProfileTabs />
      </Suspense>
      {/* <Suspense fallback={<div>Loading order history...</div>}>
        <OrderHistory />
      </Suspense>
      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfileComp />
      </Suspense> */}
    </div>
  );
}
