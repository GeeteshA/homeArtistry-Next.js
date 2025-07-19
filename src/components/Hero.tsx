import Image from 'next/image';

const Hero = () => {
  return (
    <div className="w-full bg-[#e7d9c1] text-[#333]">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-xl font-light uppercase tracking-widest">
            Home artistry
          </h2>
          <h1 className="text-3xl text:black sm:text-4xl md:text-5xl font-bold leading-tight">
            Wall art crafted to inspire  <br /> <span className='text-black'>your space</span>
          </h1>
          <button className="bg-[#333] text-white hover:bg-black font-bold py-3 px-6 rounded-full transition-colors">
            Shop Now
          </button>
        </div>

        {/* Right: Responsive Image */}
        <div className="w-full flex justify-center md:justify-end">
          <div className="w-[80%] sm:w-[60%] md:w-full h-auto">
            <Image
              src="/images/banner.png"
              alt="Intricate Mandala Wall Art Design"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
