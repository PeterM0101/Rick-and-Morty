import React, { FC, useState } from "react";
import Button from "../../ui/button/Button";
import "swiper/css";
import AddNewPhotoForm from "./AddNewPhotoForm";
import Slider from "./Slider";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import { v4 as uuidv4 } from "uuid";

export interface PhotoInterface {
  url: string;
  id: string;
}

interface AddNewPhotoProps {}

const AddNewPhoto: FC<AddNewPhotoProps> = () => {
  const [addNewPhoto, setAddNewPhoto] = useState(false);
  const [photos, setPhotos] = useState<PhotoInterface[]>([
    {
      url: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      id: uuidv4(),
    },
  ]);

  const handleAddPhoto = (url: string) => {
    setPhotos([...photos, { url, id: uuidv4() }]);
  };

  return (
    <div className="photos__container">
      <Slider photos={photos} />
      <Button
        label={
          addNewPhoto ? "Hide add a new photo mode" : "Add a new photo mode"
        }
        className="btn btn--primary"
        onClick={() => {
          setAddNewPhoto((prev) => !prev);
        }}
      />
      {addNewPhoto && (
        <AddNewPhotoForm addPhoto={handleAddPhoto} photosLength={5} />
      )}
      {addNewPhoto &&
        photos.length > 0 &&
        photos.map(
          (photo, inx) =>
            inx !== 0 && (
              <div key={photo.id} className="photos__item">
                <DeleteIcon
                  onClick={() => {
                    setPhotos(photos.filter((item) => item.id !== photo.id));
                  }}
                />
                <p>{photo.url}</p>
              </div>
            )
        )}
    </div>
  );
};

export default AddNewPhoto;
