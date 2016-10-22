import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import InputLabel from '../../components/InputLabel';
import LabelWrapper from '../../components/LabelWrapper';
import SelectLabel from '../../components/SelectLabel';
import { fetchClient, updateClient } from '../../actions/clients';
import type from '../../styles/type';
import colors from '../../styles/colors';
import races from '../../constants/races';
import disabilities from '../../constants/disabilities';
import wars from '../../constants/wars';

class ClientManager extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClient(this.props.params.id));
  }

  updateClient(update) {
    this.props.dispatch(updateClient(this.props.params.id, update));
  }

  render() {
    const { client } = this.props;
    return (
      <div>
        <div className={css(type.pageTitle, styles.title)}>{client.name}</div>
        <div className={css(styles.wrapper)}>
          <div className={css(styles.left)}>
            <div className={css(styles.section)}>
              <div className={css(type.subHeading, styles.heading)}>Personal Information</div>
              <InputLabel
                value={client.name}
                label="Name"
                handleChange={name => this.updateClient({name})}
              />
              <InputLabel
                value={client.email}
                label="Email Address"
                handleChange={email => this.updateClient({email})}
              />
              <InputLabel
                value={client.phone}
                label="Phone Number"
                handleChange={phone => this.updateClient({phone})}
              />
              <SelectLabel
                label="Race"
                value={client.race}
                options={races.map(race => ({label: race, value: race}))}
                handleChange={race => this.updateClient({race})}
              />
              <LabelWrapper label="Disabilities">
                <div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        borderTop: `1px solid ${colors.border}`,
                        borderBottom: `1px solid ${colors.border}`,
                        background: colors.divider,
                        paddingLeft: 8,
                        paddingRight: 8
                      }}>
                      <div className={css(type.label)} style={{flex: 1}}>Type</div>
                      <div className={css(type.label)} style={{flex: 1}}>Receiving Services</div>
                      <div style={{width: 32}}/>
                    </div>
                    {client.disabilities && client.disabilities.map((disability, i) => (
                      <div
                        style={{
                          display: 'flex',
                          paddingLeft: 8,
                          paddingRight: 8,
                          borderBottom: `1px solid ${colors.border}`
                        }}
                        key={i}>
                        <div style={{flex: 1}}>{disability.category}</div>
                        <div style={{flex: 1}}>
                          {disability.is_receiving_services ? 'Yes' : 'No'}
                        </div>
                        <div style={{width: 32}}>
                          <i onClick={() => this.removeDisability(i)} className="fa fa-trash"/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{background: '#f3f3f3', padding: 8, border: '1px solid #ececec'}}>
                    <div className={css(type.label)}>Add Disability</div>
                    <div style={{display: 'flex'}}>
                      <select
                        style={{flex: 1, marginRight: 8}}
                        className={css(styles.inlineSelect)}
                        ref="newDisabilityCat">
                        {disabilities.map((disability, i) => {
                          if (!client.disabilities || !client.disabilities.find(d => d.category === disability)) {
                            return (
                              <option key={i} value={disability}>{disability}</option>
                            );
                          }
                        })}
                      </select>
                      <select
                        style={{flex: 1, marginRight: 8}}
                        className={css(styles.inlineSelect)}
                        ref="newDisabilityRec">
                        <option value="true">Yes</option>
                        <option value="">No</option>
                      </select>
                      <i
                        style={{fontSize: 24, color: colors.secondary, cursor: 'pointer'}}
                        onClick={() => this.addDisability()}
                        className="fa fa-plus-square"
                      />
                    </div>
                  </div>
                </div>
              </LabelWrapper>
            </div>
            <div className={css(styles.section)}>
              <div className={css(type.subHeading, styles.heading)}>Home Information</div>
              <LabelWrapper label="Home Type">
                <div style={{display: 'flex'}}>
                  <div
                    className={css(styles.bigOption, client.home_type === 'House' && styles.bigOptionSelected)}
                    style={{marginRight: 8}}
                    onClick={() => this.updateClient({home_type: 'House'})}>
                    <i className="fa fa-home" style={{marginRight: 4}}/>
                    <div>House</div>
                  </div>
                  <div
                    className={css(styles.bigOption, client.home_type === 'Apartment' && styles.bigOptionSelected)}
                    style={{marginLeft: 8}}
                    onClick={() => this.updateClient({home_type: 'Apartment'})}>
                    <i className="fa fa-building" style={{marginRight: 4}}/>
                    <div>Apartment</div>
                  </div>
                </div>
              </LabelWrapper>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {client.home_type === 'Apartment' &&
                <div style={{marginRight: 8, flex: 1}}>
                  <InputLabel
                    label="Lease Start Date"
                    value={client.lease_start_date}
                    handleChange={lease_start_date => this.updateClient({lease_start_date})}
                  />
                </div>
                }
                {client.home_type === 'Apartment' &&
                <div style={{marginRight: 8, flex: 1}}>
                  <InputLabel
                    label="Lease End Date"
                    value={client.lease_end_date}
                    handleChange={lease_end_date => this.updateClient({lease_end_date})}
                  />
                </div>
                }
                <div style={{flex: 1, maxWidth: 180}}>
                  <InputLabel
                    label={`${client.home_type === 'House' ? 'Mortgage' : 'Rent'} Amount`}
                    value={client.monthly_home_payment}
                    handleChange={monthly_home_payment => this.updateClient({monthly_home_payment})}
                  />
                </div>
              </div>
            </div>

            <div className={css(styles.section)}>
              <div className={css(type.subHeading, styles.heading)}>Veteran Status</div>
              <div style={{display: 'flex'}}>
                <LabelWrapper label="Is the client a veteran">
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <input
                      type="radio"
                      name="isClientVeteran"
                      checked={client.veteran}
                      onChange={() => this.updateClient({veteran: true})}
                    />
                    <div style={{marginLeft: 4}}>Yes</div>
                  </div>

                  <div style={{display: 'flex'}}>
                    <input
                      type="radio"
                      name="isClientVeteran"
                      checked={!client.veteran}
                      onChange={() => this.updateClient({veteran: false, wars_served: []})}
                    />
                    <div style={{marginLeft: 4}}>No</div>
                  </div>
                </LabelWrapper>
                {client.veteran &&
                <div style={{flex: 1, paddingLeft: 32}}>
                  <LabelWrapper label="Wars Served">
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {wars.map((war) => {
                        const servedIndex = client.wars_served.findIndex(w => w === war);
                        const hasServed = servedIndex >= 0;
                        return (
                          <div
                            key={war}
                            style={{display: 'flex', alignItems: 'center', width: '50%'}}>
                            <input
                              onChange={() => this.updateClient({
                                wars_served: update(client.wars_served || [], hasServed ? {$splice: [[servedIndex, 1]]} : {$push: [war]})
                              })}
                              type="checkbox"
                              checked={hasServed}
                            />
                            <div>{war}</div>
                          </div>
                        );
                      })}
                    </div>
                  </LabelWrapper>
                </div>
                }
              </div>
            </div>


            <div className={css(styles.section)}>
              <div className={css(type.subHeading, styles.heading)}>Financial Information</div>
              <LabelWrapper label="Is the client employed">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <input
                    type="radio"
                    name="isClientEmployed"
                    checked={client.employed}
                    onChange={() => this.updateClient({employed: true})}
                  />
                  <div style={{marginLeft: 4}}>Yes</div>
                </div>

                <div style={{display: 'flex'}}>
                  <input
                    type="radio"
                    name="isClientEmployed"
                    checked={!client.employed}
                    onChange={() => this.updateClient({employed: false})}
                  />
                  <div style={{marginLeft: 4}}>No</div>
                </div>
              </LabelWrapper>
            </div>

          </div>
          <div className={css(styles.right)}>
          </div>
        </div>


        <div onClick={() => this.updateClient({status: 'approved'})}>Do The CoSign Thing</div>
      </div>
    );
  }

  addDisability() {
    const category = this.refs.newDisabilityCat.value;
    const isReceivingServices = this.refs.newDisabilityRec.value;
    this.updateClient({
      disabilities: update(this.props.client.disabilities,
        { $push: [{ category, is_receiving_services: !!isReceivingServices }] }
      )
    });
  }

  removeDisability(index) {
    this.updateClient({ disabilities: update(this.props.client.disabilities, { $splice: [[index, 1]] }) });
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 32
  },
  heading: {
    marginBottom: 8
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 40,
    paddingRight: 40,
    boxSizing: 'border-box'
  },

  left: {
    flex: 1,
    paddingRight: 64,
    boxSizing: 'border-box'
  },

  right: {
    width: 384
  },

  section: {
    marginBottom: 40
  },

  inlineSelect: {
    border: `1px solid ${colors.border}`,
    borderRadius: 2,
    background: 'white',
    paddingLeft: 8,
    paddingRight: 8,
    height: 24,
    ':focus': {
      outline: 'none'
    }
  },
  bigOption: {
    height: 40,
    border: `1px solid ${colors.border}`,
    borderRadius: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: 15,
    color: colors.light,
    cursor: 'pointer'
  },
  bigOptionSelected: {
    border: `1px solid ${colors.secondary}`,
    color: colors.secondary
  }
});

function select(state) {
  return {
    client: state.clients[state.router.params.id] || {}
  };
}
export default connect(select)(ClientManager);

// removing updating email, because the previous email was verified and we need to have one when cosigning
