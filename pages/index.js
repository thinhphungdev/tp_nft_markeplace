import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard, NFTCard } from '../components/Layouts/index';
import images from '../assets';
import { makeId } from '../utils/index';

const Home = () => {
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [hideBtn, setHideBtn] = useState(false);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollAble = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent.offsetWidth) {
      setHideBtn(false);
    } else setHideBtn(true);
  };

  useEffect(() => {
    window.addEventListener('resize', isScrollAble);

    return () => window.removeEventListener('resize', isScrollAble);
  });

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraodinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        {/* TOP SELLER */}
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>
          <div className="flex-1 flex mt-3 max-w-full relative" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImg={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}

              {/* Left Arrow */}

              {
                 !hideBtn
                 && (
                 <>
                   <div onClick={() => handleScroll('left')} className="absolute left-0 w-8 h-8 top-45 cursor-pointer minlg:w-12 minlg:h-12">
                     <Image
                       src={images.left}
                       layout="fill"
                       objectFit="contain"
                       alt="left_arrow"
                       className={theme === 'light' ? 'filter invert' : ''}
                     />
                   </div>

                   <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 top-45 cursor-pointer minlg:w-12 minlg:h-12 right-0">
                     <Image
                       src={images.right}
                       layout="fill"
                       objectFit="contain"
                       alt="right_arrow"
                       className={theme === 'light' ? 'filter invert' : ''}
                     />
                   </div>
                 </>
                 )
               }
            </div>
          </div>
        </div>

        {/* HOT BIDs  */}
        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Hot Bids</h1>
            <div>SearchBar</div>
          </div>
          {/* LIST NFT */}
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {
                 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
                   <NFTCard
                     key={`nft-${idx}`}
                     nft={{
                       i: idx + 1,
                       price: (10 - idx * 0.534).toFixed(2),
                       name: `Nifty NFT ${idx}`,
                       seller: `0x${makeId(3)}...${makeId(4)}`,
                       owner: `0x${makeId(3)}...${makeId(4)}`,
                       description: 'Cool NFT on sale',
                     }}
                   />
                 ))
               }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
