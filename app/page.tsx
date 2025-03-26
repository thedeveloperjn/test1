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
  return (
    <div >

      <DocumentaryHeader />
      <About />
      <EventsCarousel />
<RedirectSection />
    <Events/>
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
