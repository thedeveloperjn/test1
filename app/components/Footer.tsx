import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black relative  text-white p-10 pt-20">
      <div className=" mx-auto">
        {/* Desktop View */}
        <div className=" flex lg:pb-18 flex-col lg:flex-row">
        <div className="w-[100%] lg:w-[80%] flex  " >
          <div className="space-y-6  md:w-[30%] w-[50%] flex flex-col">
            <Link href="#" className=" font-semibold">About</Link>
            <Link href="#" className=" font-semibold">Events</Link>
            <Link href="#" className=" font-semibold">Programs</Link>
            <Link href="#" className=" font-semibold" >Coaching</Link>
            <Link href="#" className=" font-semibold">Start now</Link>
          </div>

          <div className="space-y-6 md:w-[30%] w-[50%] flex flex-col">
            <Link href="#" className=" font-semibold">Documentary</Link>
            <Link href="#" className=" font-semibold">Podcast</Link>
            <Link href="#" className=" font-semibold">Blog</Link>
            <Link href="#" className=" font-semibold">Free resources</Link>
            <Link href="#" className=" font-semibold">Shop all</Link>
          </div>

          <div className="space-y-6  w-[30%] hidden md:flex flex-col">
            <Link href="#" className=" font-semibold">Community</Link>
            <Link href="#" className=" font-semibold">DISC Assessment</Link>
            <Link href="#" className=" font-semibold">Careers</Link>
            <Link href="#" className=" font-semibold">Giving</Link>
          </div>

</div>
 {/* Support & Media Queries */}
 <div className="sm:w-[80%] md:w-[50%] lg:w-[20%] border-y border-gray-700 lg:border-0 mt-14 py-8 lg:py-0 lg:mt-0" >
          <div className="flex flex-col ">
            <div className="pb-10">
              <Link href="#" className="block font-semibold pb-2">Customer Support →</Link>
              <p className="text-[#ffffff66] text-[15px] leading-[24px]">
                Contact Customer Support for questions on your products, coaching, or events.
              </p>
            </div>
            <div>
              <Link href="#" className="block font-semibold pb-2">Media Inquiries →</Link>
              <p className="text-[#ffffff66] text-[15px] leading-[24px] ">
                Robbins Research International, Inc. has a dedicated media department. Members of the press are welcome to contact us.
              </p>
            </div>
          </div>
        </div>

        </div>

      
       

        {/* Footer Bottom */}
        <div className=" mt-6 pt-4 flex flex-col md:flex-row justify-between ">
          <div className="text-[#ffffff66] text-sm">
            <p>Privacy Policy | Terms of Service</p>
            <p>© 2025. All rights reserved.</p>
            <p>9051 Mira Mesa Blvd P.O. Box 261229, San Diego, CA 92126</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-xl">📷</Link>
            <Link href="#" className="text-xl">📘</Link>
            <Link href="#" className="text-xl">📺</Link>
            <Link href="#" className="text-xl">🎵</Link>
            <Link href="#" className="text-xl">🔗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
