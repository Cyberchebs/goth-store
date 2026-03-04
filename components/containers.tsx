import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import vice1 from "../public/vice1.jpg";
import vice2 from "../public/vice2.jpg";

const containers = () => {
  return (
    <div className='min-h-screen'>
      <div className='w-full flex flex-col items-center justify-center gap-20 md:gap-20 py-10'>
        <h3 className='text-4xl md:text-5xl font-bold im-fell-english-regular'>
          pick ur <span className="unifrakturmaguntia-regular text-5xl md:text-6xl">vice</span>
        </h3>

        <div className='flex w-full flex-col lg:flex-row md:flex-col px-4 md:px-7 gap-4 md:gap-6 items-stretch'>

          <Link href="/nextpage?gender=female" className='w-full md:w-full'>
            <div className='relative w-[full] h-56 md:h-64 lg:h-80 bg-black overflow-hidden group'>
              <Image
                src={vice1}
                alt="Vice 1"
                fill
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 max-lg:bg-black/60 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-3xl font-bold opacity-0 unifrakturmaguntia-regular group-hover:opacity-100 max-lg:opacity-100 transition-opacity duration-300">
                  Female
                </span>
              </div>
            </div>
          </Link>

          <Link href="/nextpage?gender=male" className='w-full md:w-full'>
            <div className='relative w-full h-56 md:h-64 lg:h-80 bg-black overflow-hidden group'>
              <Image
                src={vice2}
                alt="Vice 2"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full max-lg:h-full bg-black/60 overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center">
                <span className="text-white unifrakturmaguntia-regular text-3xl font-bold">
                  Male
                </span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default containers;
