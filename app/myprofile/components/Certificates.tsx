import Image from 'next/image'

const Certificates: React.FC = () => {
  return (
     <div className="bg-[#f5f5f5]/5 rounded-[12px] min-h-[84vh]">
        <div className=' border-b border-[#f5f5f5]/10 py-5 px-6 flex items-center justify-between'>
       <h1 className='text-[32px] text-[#f5f5f5]  font-movatif'>Certificates</h1>
       <button className=" text-white px-4 py-2 rounded-lg btn-gradient-5 noto-sans cursor-pointer !mb-0 !rounded-[100px] px-[32px] py-[14px]">
          Download Certificate <span>↓</span>
        </button></div>
          <div className='p-6 w-full space-y-6 flex items-center justify-center'>
          <Image height={400} width={300} src='/certificate.jpg' className='w-[700px] h-[450px]' />
           
          </div>
            
        </div>
    
  );
};

export default Certificates;