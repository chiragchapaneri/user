import Image from "next/image";
import React, { useCallback } from "react";
import ImageUploading from "react-images-uploading";
import { MdCancel, MdOutlineCancel } from "react-icons/md";

const DropZone = ({ image, setImage, imageAfterCrop, imageAtEdit }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setImage(imageList);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        allowNonImageType={false}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper h-full w-full relative  flex items-center justify-center">
            <button
              type="button"
              className="absolute h-full w-full"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            ></button>
            {imageAfterCrop || imageAtEdit ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={imageAfterCrop || imageAtEdit}
                    alt="Picture of an text"
                    width={647}
                    height={213}
                  />
                  <div className="image-item__btn-wrapper absolute h-full w-full flex justify-center items-center">
                    <button type="button" onClick={() => onImageRemove()}>
                      <MdOutlineCancel size={50} fill="#23C5FF" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-left w-max">
                <p className="font-500 text-lg ms:text-sm  text-black">
                  Drag & drop or click to add main event image
                </p>
                <p className="font-400 text-base ms:text-xs text-black">
                  JPED or PNG, no larger than 5MB
                </p>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
export default DropZone;
