import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableItem";
import DroppableArea from "./DroppableArea";
import ListItem from "./ListItem";
import "./App.css";

const App = () => {
  const [items] = useState([
    { id: 1, text: "Item 1", width: 100, height: 50 },
    { id: 2, text: "Item 2", width: 100, height: 50 },
    { id: 3, text: "Item 3", width: 100, height: 50 },
    { id: 4, text: "Item 4", width: 100, height: 50 },
    { id: 5, text: "Item 5", width: 100, height: 50 },
    { id: 6, text: "Item 6", width: 100, height: 50 },
  ]);
  const leftSidebar = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(100);

  useEffect(() => {
    console.log(droppedItems);
  }, [droppedItems]);

  const updateDimensions = () => {
    if (leftSidebar.current) {
      const { width } = leftSidebar.current.getBoundingClientRect();
      setSidebarWidth(width);
    }
  };

  useEffect(() => {
    updateDimensions(); // Initial dimensions
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const updateItemPosition = (id, x, y) => {
    console.log("Updating item position");
    setDroppedItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  const updateItemSize = (id, width, height) => {
    console.log("Setting item size");
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, width, height } : item
      )
    );
  };

  const handleDrop = (id, snappedX, snappedY) => {
    setDroppedItems((prevItems) => [
      ...prevItems,
      { id, x: snappedX, y: snappedY, width: 100, height: 50 },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="left-panel" ref={leftSidebar}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              {...item}
              updateItemSize={updateItemSize}
              // onDrop={() => handleDrop(item)}
            />
          ))}
        </div>
        <DroppableArea
          items={droppedItems}
          updateItemPosition={updateItemPosition}
          updateItemSize={updateItemSize}
          handleDrop={handleDrop}
          sidebarWidth={sidebarWidth}
        />
      </div>
    </DndProvider>
  );
};

export default App;
