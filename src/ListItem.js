import React from "react";
import { useDrag } from "react-dnd";

const ListItem = ({ id, text, width, height, updateItemSize }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { id, text, width, height },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#FFF",
        border: "1px solid #ccc",
        marginBottom: "4px", // Add margin to space out the items
        padding: "4px",
        cursor: "move",
      }}
    >
      {text}
    </div>
  );
};

export default ListItem;
