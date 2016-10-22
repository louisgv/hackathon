import React from 'react';
import moment from 'moment';

const icons = {
  creation: 'user-plus'
};

function getMessage(type, client) {
  if(type === 'creation') {
    return <div>{client.name} Added</div>;
  }
  return <div style={{fontSize: 12}}>"{type}"</div>;
}

export default ({ type, date, client }) => (
  <div style={{display: 'flex', alignItems: 'center', marginBottom: 24}}>
    <i
      className={`fa fa-${icons[type] ? icons[type] : 'sticky-note'}`}
      style={{fontSize: 22, color: '#BAC2D0', marginRight: 16}}
    />
    <div style={{fontSize: 16, color: '#696C7B'}}>
      {getMessage(type, client)}
      <div style={{fontSize: 12, marginTop: -6}}>{moment(date).format('MMMM D, YYYY')}</div>
    </div>
  </div>
);
