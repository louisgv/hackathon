import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

import { fetchClients } from '../../actions/clients';
import colors from '../../styles/colors';

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'createdAt',
      page: 0
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchClients());
  }

  render() {
    const { clients } = this.props;
    const pageCount = Math.ceil(clients.length / 20);
    console.log(this.state.page, pageCount);
    console.log(clients);
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.table)}>
          <div className={css(styles.tableHeaderSection)}>
            <div className={css(styles.tableName)}>Client Name</div>
            <div className={css(styles.tableStatus)}>Status</div>
            <div className={css(styles.tableJoin)}>Joined On</div>
            <div className={css(styles.tableAmount)}>Monthly Amount</div>
          </div>
          {clients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(this.state.page * 20, (this.state.page + 1) * 20).map(client => (
            <Link
              key={client._id}
              to={`/admin/client/${client._id}`}
              className={css(styles.tableRow)}
              style={{textDecoration: 'none', color: colors.dark}}>
              <div className={css(styles.tableName)}>{client.name}</div>
              <div className={css(styles.tableStatus)}>
                <div
                  className={css(
                    styles.statusIcon,
                    client.status === 'pending' && styles.statusPending,
                    client.status === 'declined' && styles.statusDeclined
                  )}
                />
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </div>
              <div className={css(styles.tableJoin)}>
                {moment(client.createdAt).format('MMMM D, YYYY')}
              </div>
              <div className={css(styles.tableAmount)}>
                {client.monthly_home_payment && '$' + Math.round(client.monthly_home_payment)}
              </div>
            </Link>
          ))}
          <div className={css(styles.pagination)}>
            <span
              style={{cursor: 'pointer'}}
              onClick={() => this.setState({page: this.state.page - 1 < 0 ? 0 : this.state.page - 1})}>
              Prev
            </span>
            <div style={{color: colors.light}}>Page {this.state.page + 1}/{pageCount}</div>
            <span
              style={{cursor: 'pointer'}}
              onClick={() => this.setState({page: this.state.page + 1 >= pageCount ? pageCount - 1 : this.state.page + 1})}>
              Next
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1000,
    margin: 'auto',
    paddingTop: 40,
    paddingBottom: 40
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 15
  },
  tableName: {
    textAlign: 'left',
    flex: 1
  },
  tableStatus: {
    textAlign: 'left',
    width: 220
  },
  tableAmount: {
    width: 160,
    textAlign: 'right'
  },
  tableJoin: {
    width: 200,
    textAlign: 'left'
  },
  tableHeaderSection: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    borderBottom: `1px solid ${colors.border}`,
    fontWeight: 600,
    fontSize: 14
  },
  tableRow: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    color: colors.dark,
    transition: 'all 0.35s',
    cursor: 'pointer',
    borderBottom: `1px solid ${colors.border}`,
    ':hover': {
      color: colors.primary
    }
  },
  statusIcon: {
    display: 'inline-block',
    background: '#5abe2b',
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginRight: 8
  },
  statusPending: {
    background: '#ff7e0c'
  },
  statusDeclined: {
    background: '#e4002b'
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  }
});


function select(state) {
  return {
    clients: Object.keys(state.clients).map(id => state.clients[id]),
    page: 1
  };
}

export default connect(select)(ClientList);
