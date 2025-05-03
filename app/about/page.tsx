import Abouthero from "./components/hero"
import Accordion from "./components/accordian"
import CommitteeMembers from "./components/Comitteemembers"
import HomeGallery from "../components/extras/homegallerycard";
import Associations from "./components/associates";
import Newsletter from "../components/extras/newsletter";
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
 return(
    <div>
<Abouthero text="Welcome to Our Community" gradientText="Together We Thrive!" />
<Accordion />
<CommitteeMembers/>
<HomeGallery
      images={galleryData}
      heading="Awards & Grants"
      paragraph=""
      buttonText="See All Grants"
      buttonLink="/gallery" // optional
    />
    <Associations/>
    <Newsletter/>
    </div>
 )
}