import React, { useState, createRef } from "react";
import Bubble from "./Bubble";
import AnimateBubbles from "./AnimateBubbles";
import initialImages from "./initialImages";
import shuffleArray from "./helpers/shuffleArray";

export default function Ant() {
  const [images, setImages] = useState(initialImages);

  const reorder = () => {
    const shuffledImages = shuffleArray(images);
    setImages(shuffledImages);
  };

  return (
    <div>
      <div className="bubbles-wrapper">
        <div className="bubbles-group">
          <AnimateBubbles>
            {images.map(({ id, text }) => (
              <Bubble key={id} id={id} text={text} ref={createRef()} />
            ))}
          </AnimateBubbles>
        </div>
      </div>
      <div className="button-wrapper">
        <button className="button" onClick={reorder}>
          Move all Ants Around
        </button>
      </div>
    </div>
  );
}