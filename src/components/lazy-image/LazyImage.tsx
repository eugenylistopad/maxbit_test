import React from "react";
import { useState } from "react";
import { LazyImageProps } from "./types";

import s from "./LazyImage.module.scss";

const LazyImage = ({ src, alt, skeleton }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div>
      {!loaded && skeleton}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        className={s.image}
        style={{
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
};

export default LazyImage;
