import React, { useState, useEffect } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import { ItemTypes } from '../ItemTypes.js';

export const GreenCarVisual = ({ id, roundManager, imageURL = './greenCar.png' }) => {
  const [currentImageURL, setCurrentImageURL] = useState(imageURL);

  useEffect(() => {
    setCurrentImageURL(imageURL);
  }, [imageURL]);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.GCAR,
      item: { id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, roundManager],
  );

  const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
  };

  const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;

    return {
      transform,
      WebkitTransform: transform,
    };
  };

  const CustomDragLayer = () => {
    const {
      itemType,
      isDragging,
      initialOffset,
      currentOffset,
    } = useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

    if (!isDragging || itemType !== ItemTypes.GCAR) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(initialOffset, currentOffset)}>
          <img src={currentImageURL} alt="Green Car" width="150px" />
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomDragLayer />
      <img
        ref={drag}
        src={currentImageURL}
        alt="Green Car"
        width="150px"
        style={{
          display: isDragging ? "none" : "block", // Hide image when dragging
          border: id.waited && id.coords[0] != 0 ? "5px solid green" : "none"
        }}
      />
    </>
  );
};
