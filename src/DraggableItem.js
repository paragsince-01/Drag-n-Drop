import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const ResizableHandle = ({ onMouseDown }) => (
  <div
    onMouseDown={onMouseDown}
    style={{
      width: '10px',
      height: '10px',
      backgroundColor: '#333',
      position: 'absolute',
      right: '0',
      bottom: '0',
      cursor: 'se-resize',
    }}
  />
);

const GRID_SIZE = 50;

const snapToGrid = (value) => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

const DraggableItem = ({
  id,
  text,
  x,
  y,
  width,
  height,
  updateItemSize,
  onDrop,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const itemRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ITEM',
      item: { id, x, y, width, height },
      end: (item, monitor) => {
        if (monitor.didDrop() && onDrop) {
          onDrop(item);
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, x, y, width, height, onDrop]
  );

  const startResizing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const itemRect = itemRef.current.getBoundingClientRect();
      const newWidth = snapToGrid(e.clientX - itemRect.left);
      const newHeight = snapToGrid(e.clientY - itemRect.top);
      updateItemSize(id, newWidth, newHeight);
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', stopResizing);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  const style = {
    position: 'absolute',
    left: snapToGrid(x),
    top: snapToGrid(y),
    width: snapToGrid(width),
    height: snapToGrid(height),
    backgroundColor: '#4CAF50',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: isDragging ? 'move' : 'default',
    opacity: isDragging ? 0.5 : 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'left 0.2s, top 0.2s, width 0.2s, height 0.2s',
    overflow: 'hidden',
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        itemRef.current = node;
      }}
      style={style}
    >
      {text}
      <ResizableHandle onMouseDown={startResizing} />
    </div>
  );
};

export default DraggableItem;
