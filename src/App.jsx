import React, { useEffect, useState } from 'react';
import './index';




import Sidebar from './sidebar';

function App() {
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

  
 
  
  

    
  const handleDragStart = (e, item, index = null) => {
    setDraggedItem(item);
    setDraggedItemIndex(index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropZone = e.target.closest('.droppable').getBoundingClientRect();
    const dropX = e.clientX - dropZone.left;
    const dropY = e.clientY - dropZone.top;

    if (draggedItemIndex !== null) {
    
      setDroppedItems((prevItems) =>
        prevItems.map((item, index) =>
          index === draggedItemIndex ? { ...item, x: dropX, y: dropY } : item
        )
      );
    } else {
      
      setDroppedItems((prevItems) => [
        ...prevItems,
        { ...draggedItem, x: dropX, y: dropY, text: draggedItem.name },
      ]);
    }

    setDraggedItem(null);
    setDraggedItemIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    setDroppedItems((prevItems) => prevItems.filter((_, i) => i !== currentIndex));
    setSidebarVisible(false);
  };

  const handleTextChange = (newText) => {
    setCurrentText(newText);
    setDroppedItems((prevItems) =>
      prevItems.map((item, i) =>
        i === currentIndex ? { ...item, text: newText } : item
      )
    );
  };

  const handleBoxClick = (index) => {
    setCurrentIndex(index);
    setCurrentText(droppedItems[index].text);
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className="App ">
      <h1 className='font-bold text-white'>Drag and Drop </h1>
      <div className="draggables	my-5  container ">
        <div
          className="draggable"
          draggable
          onDragStart={(e) => handleDragStart(e, { id: 'item1', name: 'Item 1' })}
        >
          Item 1
        </div>
        <div
          className="draggable"
          draggable
          onDragStart={(e) => handleDragStart(e, { id: 'item2', name: 'Item 2' })}
        >
          Item 2
        </div>
      </div>
      <div
        className="droppable w-full md:w-[90%]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {droppedItems.map((item, index) => (
          <div
            key={index}
            className="dropped-item"
            style={{ left: item.x, top: item.y }}
            draggable
            onDragStart={(e) => handleDragStart(e, item, index)}
            onClick={() => handleBoxClick(index)}
          >
            <div>{item.text}</div>
          </div>
        ))}
      </div>
      <Sidebar
        isVisible={sidebarVisible}
        text={currentText}
        onTextChange={handleTextChange}
        onClose={closeSidebar}
        onDelete={handleDelete}
        
      />
    </div>
  );
}

export default App;
