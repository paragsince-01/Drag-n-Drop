import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const GRID_SIZE = 50;

const snapToGrid = (value) => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

const DroppableArea = ({
  items,
  updateItemPosition,
  updateItemSize,
}) => {
  const dropRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && dropRef.current) {
        const dropRect = dropRef.current.getBoundingClientRect();
        const localX = offset.x - dropRect.left;
        const localY = offset.y - dropRect.top;

        const snappedX = snapToGrid(localX);
        const snappedY = snapToGrid(localY);

        updateItemPosition(item.id, snappedX, snappedY);
      }
    },
  });

  return (
    <div
      ref={(node) => {
        drop(node);
        dropRef.current = node;
      }}
      className="droppable-area"
      style={{
        position: 'relative',
        width: '100%',
        height: '95vh',
        border: '1px solid black',
        backgroundColor: '#f9f9f9',
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        backgroundImage: `linear-gradient(to right, #e0e0e0 1px, transparent 1px),
                          linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)`,
      }}
    >
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          {...item}
          updateItemSize={updateItemSize}
        />
      ))}
    </div>
  );
};

export default DroppableArea;
