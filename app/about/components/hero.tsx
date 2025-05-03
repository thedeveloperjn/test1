import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Abouthero = ( {gradientText="",text=""}) => {
  return (
    <div className="h-[88vh] md:h-[95vh] relative -mt-[80px] w-screen overflow-hidden">
      <div className="overflow-hidden">
      <Image src="/bggradient.png"  alt="Background Gradient" fill className="mix-blend-screen opacity-30 md:opacity-40 overflow-hidden -ml-[200px] md:ml-0 min-w-[800px] md:max-h-none md:max-w-none max-h-[500px] md:object-cover" /></div>
      <div className="absolute  inset-0 w-full flex flex-col items-center justify-center">
        <h1 className="md:text-[75px]  max-w-6xl  text-[36px] leading-[40px] text-center mb-4 md:mb-8 text-white md:leading-[80px] font-movatif">{text} <span className="gradient-text">{gradientText}</span></h1>
       <div>
        <Link href='' className="button-blur font-movatif ">Learn More <ArrowUpRight/></Link>
</div>
      </div>
    </div>
  );
};

export default Abouthero;
