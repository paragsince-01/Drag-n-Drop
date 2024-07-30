import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

const GRID_SIZE = 50;

const snapToGrid = (value) => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

const DroppableArea = ({
  items,
  updateItemPosition,
  updateItemSize,
  handleDrop,
  sidebarWidth,
}) => {
  const [{}, drop] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      console.log(item);
      console.log(items);
      const existingItemIndex = items.findIndex((originalListItem) => {
        return originalListItem.id === item.id;
      });
      if (existingItemIndex > -1) {
        //item already exist, so we need to update the postion
        const offset = monitor.getDifferenceFromInitialOffset();
        console.log(offset);
        const snappedX = snapToGrid(offset.x + items[existingItemIndex].x);
        const snappedY = snapToGrid(offset.y + items[existingItemIndex].y);
        updateItemPosition(item.id, snappedX, snappedY);
      } else {
        //item is being added for the first time

        const offset = monitor.getSourceClientOffset();
        console.log(offset);
        const snappedX = snapToGrid(offset.x - sidebarWidth);
        const snappedY = snapToGrid(offset.y);
        console.log(snappedX, snappedY);
        handleDrop(item.id, snappedX, snappedY);
      }
      // const offset = monitor.getClientOffset();
      // if (offset && dropRef.current) {
      //   const dropRect = dropRef.current.getBoundingClientRect();
      //   const localX = offset.x - dropRect.left;
      //   const localY = offset.y - dropRect.top;

      //   updateItemPosition(item.id, snappedX, snappedY);
      // }

      //check if item is added or being moved
    },
  });

  return (
    <div
      ref={drop}
      className="droppable-area"
      style={{
        position: "relative",
        width: "100%",
        height: "95vh",
        border: "1px solid black",
        backgroundColor: "#f9f9f9",
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        backgroundImage: `linear-gradient(to right, #e0e0e0 1px, transparent 1px),
                          linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)`,
      }}
    >
      {items.map((item, index) => {
        return (
          <DraggableItem
            key={index}
            {...item}
            updateItemSize={updateItemSize}
          />
        );
      })}
    </div>
  );
};

export default DroppableArea;
