import React from 'react';

const Input = ({ placeholder, inputType, title, onChange }) => (
  <div className="mt-10 w-full">
    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
      {title}
    </p>
    {inputType === 'number' ? (
      <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-dark-1  border-nft-gray-2 w-full rounded-lg outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
        <input
          type="number"
          className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
          placeholder={placeholder}
          onChange={onChange}
        />
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
          ETH
        </p>
      </div>
    ) : inputType === 'textarea' ? (
      <textarea
        onChange={onChange}
        placeholder={placeholder}
        rows={10}
        className="dark:bg-nft-black-1 bg-white border dark:border-nft-dark-1  border-nft-gray-2 w-full rounded-lg outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
      />
    ) : (
      <input
        className="dark:bg-nft-black-1 bg-white border dark:border-nft-dark-1  border-nft-gray-2 w-full rounded-lg outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
        placeholder={placeholder}
        type={inputType}
        onChange={onChange}
      />
    )}
  </div>
);

export default Input;
