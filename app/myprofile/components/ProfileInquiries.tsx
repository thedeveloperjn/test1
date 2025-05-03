import Image from 'next/image';

interface Inquiry {
  name: string;
  title: string;
  image: string;
  business: string;
  contact: string;
  address: string;
  profile: string;
  email: string;
}

const inquiriesData: Inquiry[] = [
  {
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },
  {
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },{
    name: 'Rahul Dodeja',
    title: 'President, Raipur Chapter',
    image: '/rameshkothari.jpg',
    business: 'Dodeja Advisory',
    profile: 'Finance Advisor & Consultant',
    contact: '+91 7000046665',
    email: 'rahuldodeja@gmail.com',
    address: 'Sunnyvale, Avenue, Shankar Nagar, Raipur, Chhattisgarh',
  },
  // ...more entries
];

const ProfileInquiries: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5]/5 rounded-[12px] pb-3 min-h-[84vh]">
      <h1 className="text-[32px] text-[#f5f5f5] py-3 px-6 font-movatif border-b border-[#f5f5f5]/10">
        Profile Inquiries
      </h1>

      <div className="m-5 border border-[#f5f5f5]/10 rounded-[25px]">
        {/* Scrollable container */}
        <div className="overflow-x-auto  md:overflow-visible">
          <div className=" md:min-w-[700px]">
            <div className="p-6 px-8 flex text-[#5d5d5d] noto-sans space-x-4 border-b border-[#f5f5f5]/10">
              <p className="w-[24%]">Name and Designation</p>
              <p className="w-[20%]">Business & Profile</p>
              <p className="w-[24%]">Contact Details & Address</p>
              <p className="w-[24%] text-right">Actions</p>
            </div>

            {inquiriesData.map((inquiry, index) => (
              <div
                key={index}
                className="p-4 flex items-center border-t border-[#f5f5f5]/10 space-x-4 px-8"
              >
                <div className="w-[24%]  flex items-center gap-4">
                  <Image
                    src={inquiry.image}
                    alt={inquiry.name}
                    width={50}
                    height={50}
                    className="rounded-full w-[45px] h-[45px] object-cover"
                  />
                  <div className="text-[16px] noto-sans space-y-2">
                    <p className="text-[#f5f5f5]">{inquiry.name}</p>
                    <p className="text-[#f5f5f5]/70">{inquiry.title}</p>
                  </div>
                </div>
                <div className="text-[16px] noto-sans space-y-2 w-[20%]">
                  <p className="text-[#f5f5f5]">{inquiry.profile}</p>
                  <p className="text-[#f5f5f5]/70">{inquiry.business}</p>
                </div>
                <div className="text-[16px] noto-sans space-y-2 w-[24%]">
                  <p className="text-[#f5f5f5]">{inquiry.contact}</p>
                  <p className="text-[#f5f5f5]/90">{inquiry.email}</p>
                  <p className="text-[#f5f5f5]/70">{inquiry.address}</p>
                </div>
                <div className="flex gap-6 w-[24%] noto-sans justify-end">
                  <button className="text-red-400 hover:underline">Reject</button>
                  <button className="text-green-400 hover:underline">Accept</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInquiries;
