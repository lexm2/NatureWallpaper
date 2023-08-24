const draggableNotepad = document.getElementById('draggableNotepad');
const dragHandle = document.getElementById('dragHandle');
const textArea = document.getElementById('editor');
const minimizeButton = document.querySelector('.minimize-button');
const reopenButton = document.getElementById('reopenButton');

let isDragging = false;
let isResizing = false;
let isSelectingText = false;
let isMinimized = false;
let dragOffset = { x: 0, y: 0 };
let resizeOffset = { x: 0, y: 0 };
let initialWidth = 0;
let initialHeight = 0;

reopenButton.style.display = 'none';

dragHandle.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragOffset.x = e.clientX - draggableNotepad.getBoundingClientRect().left;
  dragOffset.y = e.clientY - draggableNotepad.getBoundingClientRect().top;
});

minimizeButton.addEventListener('click', () => {
  draggableNotepad.style.display = 'none';
  reopenButton.style.display = 'block';
  isMinimized = true;
});

reopenButton.addEventListener('click', () => {
  draggableNotepad.style.display = 'flex';
  reopenButton.style.display = 'none';
  isMinimized = false;
});

dragHandle.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragOffset.x = e.clientX - draggableNotepad.getBoundingClientRect().left;
  dragOffset.y = e.clientY - draggableNotepad.getBoundingClientRect().top;
});

draggableNotepad.addEventListener('mousedown', (e) => {
  if (!isDragging && !isSelectingText) {
    isResizing = true;
    resizeOffset.x = e.clientX - draggableNotepad.offsetWidth;
    resizeOffset.y = e.clientY - draggableNotepad.offsetHeight;
  }
});

textArea.addEventListener('mousedown', () => {
  isSelectingText = true;
});

textArea.addEventListener('mouseup', () => {
  isSelectingText = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - draggableNotepad.offsetWidth;
    const maxY = window.innerHeight - draggableNotepad.offsetHeight;

    const boundedX = Math.max(minX, Math.min(x, maxX));
    const boundedY = Math.max(minY, Math.min(y, maxY));

    draggableNotepad.style.left = `${boundedX}px`;
    draggableNotepad.style.top = `${boundedY}px`;
  }

  if (isResizing) {
    const width = e.clientX - resizeOffset.x;
    const height = e.clientY - resizeOffset.y;

    const minWidth = 200; // Set a minimum width if needed
    const minHeight = 100; // Set a minimum height if needed

    const boundedWidth = Math.max(minWidth, width);
    const boundedHeight = Math.max(minHeight, height);

    draggableNotepad.style.width = `${boundedWidth}px`;
    draggableNotepad.style.height = `${boundedHeight}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  isResizing = false;
  isSelectingText = false;
});
