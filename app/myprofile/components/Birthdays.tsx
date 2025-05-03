
import Image from 'next/image';
import MemberCard from '../../membersdirectory/components/membercard';

interface Birthday {
  name: string;
  title: string;
  image: string;
  chapter:string;
  member:string;
  business: string;
}

const birthdaysData: Birthday[] = [
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Radiation Oncologist',
    image: '/rameshkothari.jpg',
    chapter: 'Raipur Chapter',
    member:'Pioneer',
    business: 'Sanjeevani CBCC USA Cancer Hos...',
  },
  {
    name: 'Dr. Ramesh Kothari',
    title: 'Member, Raipur Chapter',
    image: '/rameshkothari.jpg',
    chapter: 'Raipur Chapter',
    member:'',
    business: 'Business Name & Type',
  },
];

const Birthdays: React.FC = () => {
  return (
    <div className="bg-[#f5f5f5]/5 rounded-[12px] min-h-[84vh]">
   <h1 className='text-[32px] text-[#f5f5f5] py-3 px-6 font-movatif border-b border-[#f5f5f5]/10'>Upcoming Birthdays 🎂</h1>
      <div className='p-3 md:p-6  space-y-6'>
        <h2 className="text-xl font-semibold mb-2">Today</h2>
        <div className="flex flex-wrap gap-[6px]">
          {birthdaysData.map((member, index) => (
                <MemberCard
                  key={index}
                  name={member.name}
                  title={member.title}
                  chapter={member.chapter}
                  business={member.business}
                  member={member.member}
                  image={member.image}
                />
              ))}
          
        </div>
      </div>
        
    </div>
  );
};

export default Birthdays;