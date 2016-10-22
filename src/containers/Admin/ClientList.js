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
        <div className={css(styles.header)} >Clients:</div>
        <table className={css(styles.table)}>
          <tr>
            <th className={css(styles.tableHeader, styles.tableColumn)}>Client Name</th>
            <th className={css(styles.tableHeader, styles.tableColumn)}>Status</th>
            <th className={css(styles.tableHeader, styles.tableColumn)}>Amount Owed</th>
          </tr>
          {clients.map(client => (
            <tr>
              <td className={css(styles.tableRowHeader, styles.tableColumn)}>
                <Link to={`/admin/client/${client._id}`} key={client._id} className={css(styles.link)}>{client.name}</Link>
              </td>
              <td className={css(styles.tableRowHeader, styles.tableColumn)}>
                <span>{client.status}</span>
              </td>
              <td className={css(styles.tableRowHeader, styles.tableColumn)}>
                $100
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

function select(state) {
  console.log(state);
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
    marginTop: '25px'
  },
  tableColumn: {
    paddingRight: '50px',
    textAlign: 'center'
  },
  tableHeader: {
    fontSize: '16px'
  },
  tableRowHeader: {
    fontSize: '14px'
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  }
});

export default connect(select)(ClientList);
