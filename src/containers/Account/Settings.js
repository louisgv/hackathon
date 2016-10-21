import React from 'react';
import {css} from 'aphrodite';

import type from '../../styles/type';


export default () => {
  return (
    <div>
      <div
        style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56}}>
        <div className={css(type.subHeading)}>Account settings</div>
        <div>
        </div>
      </div>

      <div>
      </div>
    </div>
  );
};
