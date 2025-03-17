import LifeMasterySection from "./components/Videobanner";
import TestimonialCarousel from "./components/Testimonial";
import EventsCarousel from "./components/videobanner2";
import DocumentaryHeader from "./components/landingvid";
export default function Home() {
  return (
    <div >
      <DocumentaryHeader />
      <EventsCarousel />
      <TestimonialCarousel />
    <LifeMasterySection  flexdirection="row-reverse" color="rgb(72, 207, 0)" />
    <LifeMasterySection  flexdirection="row" color="rgb(33, 184, 205)"/>
    </div>
  );
}
