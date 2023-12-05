const placeElement = document.createElement('div');
// placeElement.className = treeClass('drag-place')
const innerPlaceElement = document.createElement('div');
placeElement.appendChild(innerPlaceElement);

const usePlacement = () => {
  // const { className = 'placement' } = props;
  // const { current: placeElement } = useRef(document.createElement('div'));
  // const { current: innerPlaceElement } = useRef(document.createElement('div'));

  // placeElement.className = className;
  // placeElement.appendChild(innerPlaceElement);
  // console.log('ddd');
  return {
    placeElement,
    innerPlaceElement,
  };
};

export default usePlacement;
