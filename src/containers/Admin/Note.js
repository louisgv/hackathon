import React from 'react';
import moment from 'moment';

const icons = {
  creation: 'user-plus',
  'call-no-answer': 'phone',
  'call-answer': 'phone',
  'approve': 'check-circle-o',
  'decline': 'times-circle-o'
};

function getMessage(type, client) {
  if (type === 'creation') {
    return <div>{client.name} Added</div>;
  }
  if (type === 'call-no-answer') {
    return <div>Call - No Answer</div>;
  }
  if (type === 'call-answer') {
    return <div>Call</div>;
  }
  if (type === 'approve') {
    return <div>Approved Application</div>;
  }
  if (type === 'decline') {
    return <div>Declined Application</div>;
  }
  return <div style={{fontSize: 12}}>"{type}"</div>;
}

export default ({ type, date, client }) => (
  <div style={{display: 'flex', alignItems: 'center', marginBottom: 24}}>
    <i
      className={`fa fa-${icons[type] ? icons[type] : 'sticky-note-o'}`}
      style={{fontSize: 22, color: '#BAC2D0', marginRight: 8, width: 40, textAlign: 'center'}}
    />
    <div style={{fontSize: 16, color: '#696C7B'}}>
      {getMessage(type, client)}
      <div style={{fontSize: 12, marginTop: -6}}>{moment(date).format('MMMM D, YYYY')}</div>
    </div>
  </div>
);
