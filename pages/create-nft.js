import { useState, useCallback, useMemo, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button, Input } from '../components/UI/index';
import images from '../assets';

const CreateNFT = () => {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ price: '', description: '', name: '' });

  const onDrop = useCallback(() => {
    // upload img to the blockchain (IPFS)
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'images/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive ? 'border-file-active' : ''}
    ${isDragAccept ? 'border-file-accept' : ''}
    ${isDragReject ? 'border-file-reject' : ''}
    `
  ), []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create new Item
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM Max 100Mb.</p>
                <div className="my-12 w-full flex justify-center">
                  <Image src={images.upload} width="100" height="100" objectFit="contain" alt="upload file" className={theme === 'light' ? 'filter invert' : ''} />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drap and Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">or Browse media on your device. </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input inputType="input" title="Name" placeholder="Item Name" onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} />
        <Input inputType="textarea" title="Description" placeholder="Description of your item" onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} />
        <Input inputType="number" title="Price" placeholder="Enter price" onChange={(e) => setFormInput({ ...formInput, price: e.target.value })} />

        <div className="flex justify-end w-full mt-7">
          <Button btnName="Create item" classStyles="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
