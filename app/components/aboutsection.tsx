export default function About() {
  return (
    <section className="relative bg-white overflow-hidden -z-[3]  py-10 lg:py-20">
      <div className="wrapper  space-y-5 lg:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Section */}
          <div className="space-y-5 z-[1] px-8 md:space-y-10 text-white">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-black"></span>
              <h2 className="font-mono text-md font-semibold -tracking-[0.02em] uppercase">Pillars for an Extraordinary Life</h2>
            </div>
            <ul className=" flex flex-col items-center md:items-start">
              {/* List Items */}
              <li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Mindset</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li>
              <li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Wealth</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li>
              <li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Health</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li>
              <li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Relationship</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li>
              <li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Business</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li>
              <li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Leadership</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li><li className="w-full">
                <a
                  className="flex w-full items-center justify-center md:justify-start gap-6 py-1 duration-500 hover:opacity-50"
                  href="/theme/mindset"
                >
                  <h3 className="text-[60px] leading-[60px] font-movatif">Happiness</h3>
                  <div className="group/btn hidden md:flex items-center gap-1 rounded-full bg-gray-100 px-6 py-3 font-medium opacity-0 duration-500">

                  </div>
                </a>
              </li>
              {/* Add other items similarly */}
            </ul>
          </div>
          {/* Right Section */}
          <div className="absolute w-full h-full aspect-square overflow-hidden ">
            <img
              alt="Tony Robbins"
              loading="lazy"
              width="1000"
              height="1000"
              className="fixed -z-[1] inset-0 h-full w-full object-cover brightness-[0.4] duration-500 opacity-100"
              src="https://cdn.sanity.io/images/nyyhaljw/production/d1f041b778083f5edf7f73da7d3453cc94b6b817-740x740.jpg?w=1000&h=1000&q=80&auto=format"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
