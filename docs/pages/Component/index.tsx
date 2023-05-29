import { useEffect, useState } from 'react';

const ShineoutComponent = () => {
  const [Components, setComponents] = useState([]);

  useEffect(() => {
    const files = require.context('../../chunk', false, /\.js$/);
    const fileNames = files.keys().map((key: string) => key.slice(2));

    const components: any = [];

    fileNames.forEach((fileName: string) => {
      const file = require(`../../chunk/${fileName}`).default;
      components.push(file);
    });
    console.log(components);
    setComponents(components);
  }, []);

  return (
    <div>
      {Components.map((component: any, index: number) => {
        return (
          <div key={index}>
            <div>{component.header.title.en}</div>
            <div>{component.header.describe.en}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ShineoutComponent;
