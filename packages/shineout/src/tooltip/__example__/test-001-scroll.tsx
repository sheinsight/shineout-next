/**
 * cn - css zoom
 * en - zoom
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const handleZoom = () => {
    if(visible){
      setVisible(false)
      document.body.style.zoom = 1;
    }else{
      setVisible(true)
      document.body.style.zoom = 0.9;
    }
  }

  return (
    <div>
      <Button onClick={handleZoom}>change zoom</Button>
      {visible && <Tooltip tip='hello world' trigger='click'>
        <Button type='primary'>click me</Button>
      </Tooltip>}
    </div>
  )
};
export default App;
