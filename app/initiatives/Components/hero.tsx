import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CircularText from "../../components/extras/circular";
const InitiativesHero = () => {
  return (
    <div className="min-h-[88vh] md:min-h-[95vh] relative -mt-[80px] w-screen overflow-hidden">
      <div className="overflow-hidden">
      <Image src="/bggradient.png"  alt="Background Gradient" fill className="mix-blend-screen absolute opacity-30 overflow-hidden -ml-[200px] md:ml-0 min-w-[800px] md:max-h-none md:max-w-none max-h-[500px] md:object-cover" /></div>
      <div className="  inset-0 w-full flex md:flex-row flex-col justify-between mt-[110px] mb-[50px] px-6 max-w-[1400px] mx-auto">
        <h1 className="hidden md:block text-[32px] text-balance leading-[40px] md:text-[75px]  font-movatif w-[100%]  md:w-[37%] font-bold text-white mb-4 md:leading-[90px]">
          <div className="text-left">Introducing <span className="inline-block"></span></div>
          <div className="md:text-right gradient-text"><span>Rolbol</span> <span className="inline-block">Talks</span></div>
        </h1>
        <h1 className="block md:hidden text-[36px] text-balance leading-[40px] md:text-[75px]  font-movatif w-[100%]  md:w-[37%] font-bold text-white mb-4 md:leading-[90px]">
          <div className="text-left">Get In <span className="inline-block">Touch with</span></div>
          <div className="md:text-right gradient-text"><span>Our</span> <span className="inline-block">Community</span></div>
        </h1>
        <p className="text-[16px] md:text-[18px] flex text-[#f5f5f5] opacity-70 noto-sans w-[100%] md:w-[39%] items-center">At RoLBOL, we take pride in our shared journey, emphasizing four essential values that guide us: community, where everyone feels included; innovation, which drives </p>
       
      </div>
      <div className="h-[400px] md:h-[620px] max-w-[92%] mx-auto relative ">
      <Image src="/initiativesbanner.jpeg"  alt="Banner" fill className="hidden md:block relative h-[100%] w-[100%] rounded-[25px] object-cover" />
      <Image src="/initiatives.jpeg"  alt="Banner" fill className=" block md:hidden relative h-[100%] w-[100%] rounded-[25px] object-cover" />
      <CircularText linkclass="bg-white text-black " className="absolute bottom-15 md:bottom-20 right-10 md:right-35"/>
      
      </div>
    </div>
  );
};

export default InitiativesHero;
