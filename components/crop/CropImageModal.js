import { Dialog, Transition } from "@headlessui/react";
import { Field, useField, useFormikContext } from "formik";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { Fragment, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";

const CropImageModal = ({ photoURL, setImage, ...props }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const zoomPercentage = (value) => {
    return `${Math.round(value - 1)}%`;
  };

  const saveCropImage = async () => {
    const croppedImage = await getCroppedImg(
      photoURL.data_url,
      croppedAreaPixels,
      rotation
    );
    setImage(croppedImage);
  };

  function closeModal() {
    setIsOpen(false);
    setImage([]);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <Field name={props.name}>
        {({ field, meta }) => {
          return (
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                open={isOpen}
                onClose={closeModal}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="w-full max-w-md p-15 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Crop Image
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Use a high quality image: 2160x1080px (2:1 ratio)
                        </p>
                      </div>
                      <div className="p-15 relative h-250">
                        <Cropper
                          image={photoURL?.data_url}
                          crop={crop}
                          zoom={zoom}
                          rotation={rotation}
                          aspect={2 / 1}
                          onZoomChange={setZoom}
                          onRotationChange={setRotation}
                          onCropChange={setCrop}
                          onCropComplete={cropComplete}
                        />
                      </div>
                      <div className="px-15">
                        <div className="flex gap-25 items-center py-10">
                          <p className="text-sm text-black max-w-50 w-screen">
                            Zoom:
                          </p>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={zoom}
                            onChange={(zoom) => setZoom(zoom)}
                            ariaValueTextFormatterForHandle={zoomPercentage}
                          />
                        </div>
                        <div className="flex gap-25 items-center py-10">
                          <p className="text-sm text-black max-w-50 w-screen">
                            Rotate:
                          </p>
                          <Slider
                            min={0}
                            max={360}
                            step={1}
                            value={rotation}
                            onChange={(rotation) => setRotation(rotation)}
                            ariaValueTextFormatterForHandle={zoomPercentage}
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-10 justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border-1 border-solid border-light-blue px-6 py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={saveCropImage}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-bgcomman px-6 py-4 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </div>
                </div>
              </Dialog>
            </Transition>
          );
        }}
      </Field>
    </div>
  );
};

export default CropImageModal;
