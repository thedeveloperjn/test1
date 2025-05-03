
import Image from 'next/image';

import { PencilSimpleLine  } from "@phosphor-icons/react/dist/ssr";

interface ProfileLandingProps {
  name: string;
  image: string;
  bio: string;
  dateOfBirth: string;
  bloodGroup: string;
  designation: string;
  professionalDetails: {
    role: string;
    industry: string;
  };
  businessDetails: {
    position: string;
  };
  businessName: string;
  contactDetails: {
    whatsappNumber: string;
    contactNumber: string;
    email: string;
    address: string;
  };
}

const Label = ({ name=''}) => {
    return (
        <label className='noto-sans text-[16px] text-[#f5f5f5]/70'>{name}</label>
    );
  };
  
  const Input = ({ type='',value=''}) => {
    return (
        <input
        type={type}
        value={value}
        className="w-full btn-gradient-5  p-[14px] rounded-lg mt-1 !mb-0"
        readOnly
      />
    );
  };
   

const ProfileLanding: React.FC<ProfileLandingProps> = ({
  name,
  image,
  bio,
  dateOfBirth,
  bloodGroup,
  designation,
  professionalDetails,
  businessDetails,
  businessName,
  contactDetails,
}) => {
  return (
    <div className="flex flex-col  md:flex-row gap-4 md:gap-6">
      <div className="w-full bg-[#f5f5f5]/5 md:h-[84vh] md:sticky items-start top-[1px] md:w-1/3 p-3 md:p-6 backdrop-blur-[40px] rounded-[12px]">
      <h2 className='text-[#f5f5f5] text-[22px] font-movatif mb-4'>Profile</h2>
        <div className="relative flex items-center flex-col mb-6">
            <div className='relative h-[125px] w-[125px] mb-4'>
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="rounded-full  border-[2px] border-[#f5f5f5] h-[125px] w-[125px] object-cover"
          />
          <button className="absolute bottom-2 right-2 bg-[#f5f5f5] text-black p-[5px] rounded-full text-lg">
            <PencilSimpleLine />
          </button>
          </div>
          <p className='noto-sans'>Update Profile Image</p>
          <p className="text-gray-400 text-sm mt-2">PNG, JPG, or JPEG</p>
        </div>
        <div className="mt-4">
          <p className="text-[#f5f5f5]/70 text-[16px] noto-sans">Bio</p>
          <p className="btn-gradient-5 px-2 py-3 rounded-[12px] mt-2 h-[100px]">{bio}</p>
        </div>
      </div>
      <div className="w-full bg-[#f5f5f5]/5 rounded-[12px] md:w-2/3 p-6">
        <h2 className='text-[#f5f5f5] text-[22px] font-movatif mb-4'>Personal Information</h2>
        <div className="flex flex-wrap gap-[2%] space-y-4">
          <div className=' md:w-[49%]'>
            <Label name="Full name"/>
            <Input
              type="text"
              value={name}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Date of Birth"/>
            <Input
              type="text"
              value={dateOfBirth}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Blood Group"/>
            <Input
              type="text"
              value={bloodGroup}
              
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Roll/Designation & Chapter"/>
            <Input
              type="text"
              value={designation}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Job Profile"/>
            <Input
              type="text"
              value={professionalDetails.role}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Business Name"/>
            <Input
              type="text"
              value={businessName}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Designation"/>
            <Input
              type="text"
              value={businessDetails.position}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Contact Number"/>
            <Input
              type="text"
              value={contactDetails.contactNumber}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="WhatsApp Number"/>
            <Input
              type="text"
              value={contactDetails.whatsappNumber}
            />
          </div>
          <div className='md:w-[49%]'>
          <Label name="Email Address"/>
            <Input
              type="text"
              value={contactDetails.email}
            />
          </div>
          
          <div className="w-[100%]">
          <Label name="Formal Address"/>
            <Input
              type="text"
              value={contactDetails.address}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button className="mt-5 relative inline-block cursor-pointer group inline-flex items-center text-white border border-[#f5f5f5] font-movatif justify-center gap-2  text-center  rounded-full w-auto text-[14px] md:text-[16px] py-3 md:py-3 px-6 md:px-7">Cancel</button>
          <button className="mt-5 relative inline-block cursor-pointer group inline-flex items-center text-black bg-white font-movatif justify-center gap-2  text-center  rounded-full w-auto text-[14px] md:text-[16px] py-3 md:py-3 px-6 md:px-7">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLanding;