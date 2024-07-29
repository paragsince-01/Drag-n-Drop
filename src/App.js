import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';
import './App.css';

const App = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', x: 0, y: 0, width: 100, height: 50 },
    { id: 2, text: 'Item 2', x: 0, y: 55, width: 100, height: 50 },
    { id: 3, text: 'Item 3', x: 0, y: 105, width: 100, height: 50 },
    { id: 4, text: 'Item 4', x: 0, y: 155, width: 100, height: 50 },
    { id: 5, text: 'Item 5', x: 0, y: 205, width: 100, height: 50 },
    { id: 6, text: 'Item 6', x: 0, y: 255, width: 100, height: 50 },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);

  const updateItemPosition = (id, x, y) => {
    setDroppedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  const updateItemSize = (id, width, height) => {
    setDroppedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, width, height } : item
      )
    );
  };

  const handleDrop = (item) => {
    if (!droppedItems.some(i => i.id === item.id)) {
      setDroppedItems(prevItems => [...prevItems, item]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="left-panel">
          {items.map(item => (
            <DraggableItem
              key={item.id}
              {...item}
              updateItemSize={updateItemSize}
              onDrop={() => handleDrop(item)}
            />
          ))}
        </div>
        <DroppableArea
          items={droppedItems}
          updateItemPosition={updateItemPosition}
          updateItemSize={updateItemSize}
        />
      </div>
    </DndProvider>
  );
};

export default App;
