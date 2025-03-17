import { ProfileUpdateForm } from "../../components/forms/ProfileUpdateForm";
import { Suspense } from "react";

export default function ProfileComp() {
  return (
    <div className="pb-20 animate-in duration-300">
      {/* {" "}
      <h2 className="order-1 sm:order-2 section-title-size capitalize text-gray-700 text-center font-federo pt-10">
        My <span className="text-[#F3238A]">Profile</span>
      </h2> */}
      <Suspense fallback={null}>
        <ProfileUpdateForm />
      </Suspense>
    </div>
  );
}
