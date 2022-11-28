import React from "react";
import CropImageModal from "../crop/CropImageModal";

const ImageCropModal = ({ image, setImage }) => {
  return (
    <div>
      {Array.isArray(image) && image.length > 0 && (
        <CropImageModal
          setImage={setImage}
          photoURL={image[image.length - 1]}
        />
      )}
    </div>
  );
};

export default ImageCropModal;
