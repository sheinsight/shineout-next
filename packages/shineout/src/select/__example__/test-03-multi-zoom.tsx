/**
 * cn - multi-zoom
 *    -- 多个css zoom叠加作用下的弹出层位置问题
 * en - multi-zoom
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

// document.body.style.zoom = '2';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green'];
  return (
    <div>
      <p>
        Integer et enim sit amet massa sollicitudin dignissim vel sit amet mauris. Maecenas volutpat
        dui nec lobortis lacinia. Sed pretium, lorem in scelerisque fringilla, metus nulla lacinia
        lorem, sit amet fringilla ipsum justo non ipsum. Cras ut magna quis ipsum porttitor blandit
        eget ut dui.
      </p>

      <div
        className='inner'
        style={{
          marginLeft: 100,
          zoom: 0.5,
        }}
      >
        <Select
          data={data}
          keygen
          placeholder='Select Color'
          absolute
        />

        <div style={{ padding: 10 }} id='aaa'>
          <Select
            data={data}
            keygen
            placeholder='Select Color'
            absolute={() => {
              return document.querySelector('#aaa');
            }}
          />
        </div>
      </div>
    </div>
  );
};
