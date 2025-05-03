// import LifeMasterySection from "./components/Videobanner";
import TestimonialCarousel from "./components/Testimonial";
import EventsCarousel from "./components/videobanner2";
import DocumentaryHeader from "./components/landingvid";
import About from "./components/extras/about";
import TestimonialsSection from "./components/text-testimonial";
import Events from "./components/extras/event";
import RedirectSection from "./components/extras/redirectionsection";
import FeaturedIn from "./components/extras/featuredin";
import CelebrityGallery from "./components/extras/homegallery";
import Newsletter from "./components/extras/newsletter";
export default function Home() {
  
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
  return (
    <div >

      <DocumentaryHeader />
      <About />
      <EventsCarousel />
<RedirectSection />
<Events 
        events={Upcoming}
        title="Our Upcoming Events"
        description="Check out what's coming next in our community"
  className="bg-[#f5f5f5]"
      />
    <FeaturedIn />
    <TestimonialsSection/>
      <TestimonialCarousel />
      <CelebrityGallery/>
      <Newsletter/>
      {/* <About/>
      
    <LifeMasterySection  flexdirection="row-reverse" color="rgb(72, 207, 0)" />
    <LifeMasterySection  flexdirection="row" color="rgb(33, 184, 205)"/>

    <LifeMasterySection  flexdirection="row-reverse" color="rgb(72, 207, 0)" /> */}
    </div>
  );
}
