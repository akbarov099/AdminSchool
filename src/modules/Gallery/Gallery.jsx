import React, { useState } from "react";
import GalleryAdd from "./GalleryAdd";
import GalleryAll from "./GalleryAll";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <GalleryAdd selectedImage={selectedImage} />
      <GalleryAll selectedImage={selectedImage}/>
    </div>
  );
}
