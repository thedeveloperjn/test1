import InitiativesHero from "./Components/hero";
import Initiativesabout from "./Components/abouttalks";
import Events from "../components/extras/event";
import About from "../components/extras/about";
import CelebrityGallery from "../components/extras/homegallery";
import Speakers from "./Components/speakers";
export default async function Home() {
    const galleryData = [
        { src: '/galllery3.jpeg', alt: 'Award Ceremony', caption: 'The passion that a person needs' },
      { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
      { src: '/galler1.jpeg', alt: 'Panel Discussion', caption: 'The resilience to keep going' },
      { src: '/galllery3.jpeg', alt: 'Award Ceremony', caption: 'The passion that a person needs' },
      { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
      { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
      
      { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
      { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
      { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
      
      { src: '/galler1.jpeg', alt: 'Panel Discussion', caption: 'The resilience to keep going' },
      ];
      const Upcoming = [
        {
          video: '/events.jpeg',
          quote: 'Join us for the Grand Festival of Colours where joy and wonder!',
          name: 'April 8 , 2025',
          title: 'Business Owner'
        },
        {
          video: '/learning.jpeg',
          quote: 'Mindful living- take control of stress, unl...',
          name: 'ROLBOL Learning',
          title: 'Business Owner'
        },
        {
          video: '/learning2.jpeg',
          quote: "Budget 2025- What you need to know",
          name: 'ROLBOL Learning',
          title: 'Business Owner'
        },
        {
          video: '/talks.jpeg',
          quote: "Kumar Vishnu- India’s renowned Bhajan Singer..",
          name: 'ROLBOL Talks',
          title: 'Business Owners'
        },
        {
          video: '/community.jpeg',
          quote: "Women’s Day- Celebrating the Streng",
          name: 'ROLBOL Community',
          title: 'Business Owners'
        },  {
          video: '/events.jpeg',
          quote: 'Join us for the Grand Festival of Colours where joy and wonder!',
          name: 'April 8 , 2025',
          title: 'Business Owner'
        },
        {
          video: '/learning.jpeg',
          quote: 'Mindful living- take control of stress, unl...',
          name: 'ROLBOL Learning',
          title: 'Business Owner'
        },
        {
          video: '/learning2.jpeg',
          quote: "Budget 2025- What you need to know",
          name: 'ROLBOL Learning',
          title: 'Business Owner'
        },
        {
          video: '/talks.jpeg',
          quote: "Kumar Vishnu- India’s renowned Bhajan Singer..",
          name: 'ROLBOL Talks',
          title: 'Business Owners'
        },
        {
          video: '/community.jpeg',
          quote: "Women’s Day- Celebrating the Streng",
          name: 'ROLBOL Community',
          title: 'Business Owners'
        }
      
      ];
 return(
    <div>
<InitiativesHero />
<Initiativesabout/>
<Events 
        events={Upcoming}
        title="Recent Activities"
        description="Stay Informed: Join Our Community Newsletter! Discover how Rolbol is making a difference through our Corporate Social Responsibility initiatives."
        textcolour="text-[#f5f5f5]"
       button="bg-white/15 hover:bg-white/20 "
      navigator="white"
/>
<CelebrityGallery /> 
<Speakers/>
<About/>
    </div>
 )
}