const Map = () => {
    return (
      <div className="p-5 pt-0 max-w-[1420px] mx-auto w-[100%] h-[200px] md:h-[450px] mb-10" style={{  filter: "invert(92%) hue-rotate(225deg)" }}>
        <h3 className="text-[30px] md:text-[36px] font-movatif text-[#000000] mb-6">Locate Us on Map</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14654.223024289685!2d81.6774952!3d21.174299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddb300bc9eeb%3A0xbc8da0175f206f63!2sROLBOL%20Community!5e0!3m2!1sen!2sin!4v1711998846537!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-[25px] "
        ></iframe>
      </div>
    );
  };
  
  export default Map;
  