import HomeGallery from "./homegallerycard";

const CelebrityGalleryPage = () => {
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

  return (
    <HomeGallery
      images={galleryData}
      heading="Celebrity Moments: A Star-Studded Gallery!"
      paragraph="Hear from the Stars: See What Celebrities Are Saying About Rolbol's Impact Through Our Community Efforts!"
      buttonText="Explore Glimplses"
      buttonLink="/gallery" // optional
    />
  );
};

export default CelebrityGalleryPage;