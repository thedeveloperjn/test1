import Image from "next/image";
import Link from "next/link";

const podcasts = [
  {
    title: "Tony Robbins Exclusive: Holy Grail of Investing – Chapter 1",
    date: "February 6, 2024",
    category: "wealth",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/ce71c374748a4ad227a7345d45f6d415f489ae75-1080x1080.png?w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/holy-grail",
    alt: "Tony Robbins Exclusive: Holy Grail of Investing image of Tony holding book",
  },
  {
    title: "How to build success in business",
    date: "September 21, 2021",
    category: "business",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/225bbc77f56d5db79025d7868c41d21e5fc459a8-1600x600.png?rect=500,0,600,600&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/classpass-daveskillerbread",
    alt: "How to build success in business image of Payal Kadakia, Dave Dahl & Tony Robbins",
  },
  {
    title: "Master the current financial landscape",
    date: "March 10, 2023",
    category: "finance",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/7097eb7482f17a1718026de4b9fc9fcf1028201b-1600x602.jpg?rect=499,0,602,602&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/financial-insights-jeffrey-gundlach",
    alt: "Master the current financial landscape image of a wallet filled with money and coins on a table",
  },
  {
    title: "Tony Robbins Exclusive: Holy Grail of Investing – Chapter 1",
    date: "February 6, 2024",
    category: "leadership",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/ce71c374748a4ad227a7345d45f6d415f489ae75-1080x1080.png?w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/holy-grail",
    alt: "Tony Robbins Exclusive: Holy Grail of Investing image of Tony holding book",
  },
  {
    title: "How to build success in business",
    date: "September 21, 2021",
    category: "happiness",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/225bbc77f56d5db79025d7868c41d21e5fc459a8-1600x600.png?rect=500,0,600,600&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/classpass-daveskillerbread",
    alt: "How to build success in business image of Payal Kadakia, Dave Dahl & Tony Robbins",
  },
  {
    title: "Master the current financial landscape",
    date: "March 10, 2023",
    category: "health",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/7097eb7482f17a1718026de4b9fc9fcf1028201b-1600x602.jpg?rect=499,0,602,602&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/financial-insights-jeffrey-gundlach",
    alt: "Master the current financial landscape image of a wallet filled with money and coins on a table",
  },
  {
    title: "Tony Robbins Exclusive: Holy Grail of Investing – Chapter 1",
    date: "February 6, 2024",
    category: "business",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/ce71c374748a4ad227a7345d45f6d415f489ae75-1080x1080.png?w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/holy-grail",
    alt: "Tony Robbins Exclusive: Holy Grail of Investing image of Tony holding book",
  },
  {
    title: "How to build success in business",
    date: "September 21, 2021",
    category: "business",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/225bbc77f56d5db79025d7868c41d21e5fc459a8-1600x600.png?rect=500,0,600,600&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/classpass-daveskillerbread",
    alt: "How to build success in business image of Payal Kadakia, Dave Dahl & Tony Robbins",
  },
  {
    title: "Master the current financial landscape",
    date: "March 10, 2023",
    category: "mindset",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/7097eb7482f17a1718026de4b9fc9fcf1028201b-1600x602.jpg?rect=499,0,602,602&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/financial-insights-jeffrey-gundlach",
    alt: "Master the current financial landscape image of a wallet filled with money and coins on a table",
  },
  {
    title: "Tony Robbins Exclusive: Holy Grail of Investing – Chapter 1",
    date: "February 6, 2024",
    category: "relationships",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/ce71c374748a4ad227a7345d45f6d415f489ae75-1080x1080.png?w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/holy-grail",
    alt: "Tony Robbins Exclusive: Holy Grail of Investing image of Tony holding book",
  },
  {
    title: "How to build success in business",
    date: "September 21, 2021",
    category: "wealth",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/225bbc77f56d5db79025d7868c41d21e5fc459a8-1600x600.png?rect=500,0,600,600&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/classpass-daveskillerbread",
    alt: "How to build success in business image of Payal Kadakia, Dave Dahl & Tony Robbins",
  },
  {
    title: "Master the current financial landscape",
    date: "March 10, 2023",
    category: "wealth",
    imageUrl:
      "https://cdn.sanity.io/images/nyyhaljw/production/7097eb7482f17a1718026de4b9fc9fcf1028201b-1600x602.jpg?rect=499,0,602,602&w=300&h=300&q=80&auto=format&w=3840",
    link: "/podcast/financial-insights-jeffrey-gundlach",
    alt: "Master the current financial landscape image of a wallet filled with money and coins on a table",
  },
];

const PodcastList = ({ selectedCategory }) => {
  const filteredPodcasts =
    selectedCategory === "all"
      ? podcasts
      : podcasts.filter((podcast) => podcast.category === selectedCategory);

  return (
    <section className="py-10 bg-white">
      <ul className="wrapper -mb-40 grid mx-8 -translate-y-48 transform gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast, index) => (
            <li key={index} className="group">
              <Link href={podcast.link} className="mb-4 block">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-primary-1">
                  <Image
                    src={podcast.imageUrl}
                    alt={podcast.alt}
                    width={300}
                    height={300}
                    className="absolute h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    priority={index === 0} // Load first image faster
                  />
                </div>
              </Link>
              <span className="text-label font-ibmflexmono font-medium mb-2 flex items-center opacity-60">
                {podcast.category.charAt(0).toUpperCase() + podcast.category.slice(1)}
                <div className="mx-2 h-1 w-1 rounded-full bg-black opacity-60"></div>
                {podcast.date}
              </span>
              <Link
                href={podcast.link}
                className="mb-2 inline-block transition-opacity duration-500 group-hover:opacity-60"
              >
                <h3 className="text-base font-movitaf text-[20px] font-semibold leading-tight">
                  {podcast.title}
                </h3>
              </Link>
              <div className="mt-5"></div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No podcasts found in this category.</p>
        )}
      </ul>
    </section>
  );
};

export default PodcastList;
