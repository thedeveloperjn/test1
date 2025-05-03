import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CircularText from "../../components/extras/circular";
const Contacthero = () => {
  return (
    <div className=" relative -mt-[80px] md:pt-[80px] md:pb-[60px] w-screen overflow-hidden">
      <div className="overflow-hidden">
        <Image
          src="/bggradient.png"
          alt="Background Gradient"
          fill
          className="mix-blend-screen absolute opacity-30 overflow-hidden -ml-[200px] md:ml-0 min-w-[800px] md:max-h-none md:max-w-none max-h-[500px] md:object-cover"
        />
      </div>
      <div className="  inset-0 w-full flex md:flex-row flex-col justify-between mt-[110px] mb-[50px] px-6 max-w-[1450px] mx-auto">
        <div className="w-[100%]  md:w-[55%]">
          <h1 className="text-[32px] text-balance leading-[40px] md:text-[75px]  font-movatif  font-bold text-white mb-4 md:leading-[90px]">
            <div className="text-left">
              Get In <span className="inline-block">Touch with</span>
            </div>
            <div className="md:text-right gradient-text">
              <span>Our</span> <span className="inline-block">Community</span>
            </div>
          </h1>
          <p className="text-[16px] md:text-[18px] flex text-[#f5f5f5] opacity-70 noto-sans  items-center">
            At RoLBOL, we take pride in our shared journey, emphasizing four
            essential values that guide us: community, where everyone feels
            included; innovation, which drives{" "}
          </p>
        </div>
        <div className="w-[100%] md:w-[45%] flex items-end h-[130px] md:items-center justify-end">
          <CircularText linkclass="bg-white text-black " className="relative" />
        </div>
      </div>
    </div>
  );
};

export default Contacthero;
