import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {StyleSheet, css} from 'aphrodite';

import { fetchClients } from '../../actions/clients';

class ClientList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }

  render() {
    const { clients } = this.props;
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.table)}>
          <div className={css(styles.tableHeaderSection)}>
            <div className={css(styles.tableHeader)} style={{order: 1}}>Client Name</div>
            <div className={css(styles.tableHeader)} style={{order: 2}}>Status</div>
            <div className={css(styles.tableHeader)} style={{order: 3}}>Amount Owed</div>
          </div>
          <div className={css(styles.tableRowSection)}>
          {clients.map(client => (
            <div className={css(styles.tableRow)} onClick={client => this.handleRedirect(client._id) }>
              <Link to={'/admin/client/${client._id}'} key={client._id} className={css(styles.link)}>
                <div className={css(styles.tableRowItem)} style={{order: 1}}>{client.name}</div>
                <div className={css(styles.tableRowItem)} style={{order: 2}}>Pending</div>
                <div className={css(styles.tableRowItem)} style={{order: 3}}>$100</div>
              </Link>
            </div>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    clients: Object.keys(state.clients).map(id => state.clients[id])
  };
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    margin: '0 auto'
  },
  header: {
    marginTop: '25px',
    fontSize: '22px'
  },
  table: {
    display: 'flex',
    'flex-flow': 'row wrap',
    width: '50%',
    margin: '5% auto'
  },
  tableHeaderSection: {
    display: 'flex',
    flex: '1 100%',
    padding: '10px 0',
    border: '1px solid #ccc',
    background: '#EA8037',
    color: '#FFF',
    fontWeight: '600'
  },
  tableRowSection: {
    display: 'flex',
    width: '100%',
    'flex-direction': 'column',
    borderRight: '1px solid #ccc',
    borderLeft: '1px solid #ccc'
  },
  tableRow: {
    display: 'flex',
    width: '100%',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
    ':hover': {
      background: '#F1F1F1'
    }
  },
  tableRowItem: {
    flex: '1 auto',
    textAlign: 'center',
    width: '33%',
    fontSize: '16px'
  },
  tableHeader: {
    fontSize: '16px',
    flex: '1 auto',
    textAlign: 'center',
    width: '33%'
  },
  link: {
    color: '#000',
    display: 'flex',
    width: '100%',
    textDecoration: 'none'
  }
});

export default connect(select)(ClientList);
