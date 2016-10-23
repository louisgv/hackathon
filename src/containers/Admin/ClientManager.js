import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Note from './Note';
import InputLabel from '../../components/InputLabel';
import LabelWrapper from '../../components/LabelWrapper';
import SelectLabel from '../../components/SelectLabel';
import { fetchClient, updateClient, addNote } from '../../actions/clients';
import type from '../../styles/type';
import colors from '../../styles/colors';
import races from '../../constants/races';
import disabilities from '../../constants/disabilities';
import wars from '../../constants/wars';

class ClientManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempNote: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchClient(this.props.params.id));
  }

  updateClient(update) {
    this.props.dispatch(updateClient(this.props.params.id, update));
  }

  addNote(note) {
    this.props.dispatch(addNote(this.props.params.id, note));
  }

  render() {
    const { client } = this.props;
    console.log(client.notes);
    return (
      <div className={css(styles.main)}>
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
                        border: `1px solid ${colors.border}`,
                        background: colors.background,
                        paddingLeft: 8,
                        paddingRight: 8
                      }}>
                      <div className={css(type.label)} style={{flex: 1}}>Type</div>
                      <div className={css(type.label)} style={{flex: 1}}>Receiving Services</div>
                      <div style={{width: 32}}/>
                    </div>
                    {(!client.disabilities || !client.disabilities.length) &&
                    <div
                      style={{
                        background: colors.background,
                        borderLeft: `1px solid ${colors.border}`,
                        borderRight: `1px solid ${colors.border}`,
                        borderBottom: `1px solid ${colors.border}`,
                        textAlign: 'center',
                        color: colors.light,
                        paddingTop: 8,
                        paddingBottom: 8,
                        opacity: 0.8
                      }}>
                      No Disabilities
                    </div>
                    }

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
                        <div style={{width: 32, color: '#BAC2D0', textAlign: 'right'}}>
                          <i onClick={() => this.removeDisability(i)} className="fa fa-trash"/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: colors.background,
                      padding: 8,
                      borderLeft: '1px solid #ececec',
                      borderRight: '1px solid #ececec',
                      borderBottom: '1px solid #ececec'
                    }}>
                    <div className={css(type.label)}>Add Disability</div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
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
                        style={{fontSize: 18, color: '#858E9D', cursor: 'pointer'}}
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
                    <i className="fa fa-home" style={{marginRight: 4, fontSize: 16}}/>
                    <div>House</div>
                  </div>
                  <div
                    className={css(styles.bigOption, client.home_type === 'Apartment' && styles.bigOptionSelected)}
                    style={{marginLeft: 8}}
                    onClick={() => this.updateClient({home_type: 'Apartment'})}>
                    <i className="fa fa-building" style={{marginRight: 4, fontSize: 15}}/>
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
              <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
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
                <div style={{flex: 1}}>
                  <div style={{marginBottom: 16}}>
                    <InputLabel
                      label="Earned Income"
                      value={client.earned_income}
                      handleChange={earned_income => this.updateClient({earned_income})}
                    />
                  </div>
                  <div style={{marginBottom: 16}}>
                    <InputLabel
                      label="Benefits Income"
                      value={client.benefits_income}
                      handleChange={benefits_income => this.updateClient({benefits_income})}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className={css(styles.right)}>
            <div className={css(type.subHeading, styles.heading)}>Notes</div>
            <div style={{paddingLeft: 24}}>
              {client.notes && client.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(note => (
                <Note key={note._id} type={note.note} date={note.createdAt}/>
              ))}
              <Note client={client} type="creation" date={client.createdAt}/>
            </div>

            <div className={css(type.subHeading, styles.heading)}>Status</div>
            <div style={{color: colors.light, marginTop: -16, marginBottom: 16, fontSize: 12}}>
              Current Status: {client.status}
            </div>
            <LabelWrapper label="Actions:">
              <div style={{marginTop: -10}}>
                {client.status === 'pending' &&
                <div
                  className={css(styles.action)}
                  onClick={() => this.updateClient({status: 'approved'})}>
                  Approve {client.name}
                </div>
                }
                <div
                  className={css(styles.action)}
                  onClick={() => this.addNote('call-no-answer')}>
                  Called - Client Did Not Answer
                </div>
                <div
                  className={css(styles.action)}
                  onClick={() => this.addNote('call-answer')}>
                  Called - Client Answered
                </div>
              </div>
            </LabelWrapper>
            <InputLabel
              label="Add a note:"
              value={this.state.tempNote}
              handleChange={tempNote => this.setState({tempNote})}
              handleEnter={() => {
                if (['creation', 'call-no-answer', 'call-answer'].indexOf(this.state.tempNote) >= 0) {
                  return;
                }
                this.setState({tempNote: ''});
                this.addNote(this.state.tempNote);
              }}
            />
          </div>
        </div>
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
  main: {
    paddingLeft: 40,
    paddingRight: 40,
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 40
  },
  heading: {
    marginBottom: 8
  },
  wrapper: {
    display: 'flex',
    maxWidth: 1000,
    margin: 'auto'
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

  action: {
    color: colors.secondary,
    textDecoration: 'underline',
    cursor: 'pointer'
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
    color: '#BAC2D0',
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
