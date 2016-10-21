import React from 'react';
import {css} from 'aphrodite';

import form from '../../styles/form';
import type from '../../styles/type';
import buttons from '../../styles/buttons';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadingPicture: false,
      imageError: null
    };
  }

  getSignedRequest(files, userID) {
    const file = files[0];
    console.log(file);
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      return this.setState({imageError: 'Image must be either jpg, jpeg, png, or a gif'});
    }
    if ((file.size / (1024 * 1024)) > 1) {
      return this.setState({imageError: 'Image cannot be larger than 1mb'});
    }
    const xhr = new XMLHttpRequest();
    this.setState({uploadingPicture: true, imageError: null});
    xhr.open('GET', `/sign-s3?file-name=${userID + '_' + Date.now()}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        }
      }
    };
    xhr.send();
  }

  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    console.log(111);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({uploadingPicture: false});
          this.props.handleUpdateUser({picture: url});
        }
      }
    };
    xhr.send(file);
  }

  render() {
    const {user, handleSaveChanges, handleUpdateUser, hasChanges, saving, saved} = this.props;
    return (
      <div>
        <div
          style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 56}}>
          <div className={css(type.subHeading)}>Profile</div>
          <div
            className={css(buttons.large, (!hasChanges && !saving && !saved) && buttons.disabled)}
            onClick={handleSaveChanges}>
            {saving ?
              <i style={{fontSize: 18, lineHeight: '40px'}} className="fa fa-spinner fa-spin"/> :
              saved ? ( <i style={{fontSize: 18, lineHeight: '40px'}} className="fa fa-check"/>) :
                'Save changes'
            }
          </div>
        </div>
        <div className={css(form.inline)}>
          <div className={css(form.inlineLabel)}>Profile Photo</div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div style={{position: 'relative'}}>
              <div
                style={{
                  height: 64,
                  width: 64,
                  marginRight: 8,
                  borderRadius: '50%',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'none',
                  backgroundImage: `url("${user.picture || '/default-profile-picture.svg'}")`
                }}
              />
              {this.state.uploadingPicture &&
              <div
                style={{
                  position: 'absolute',
                  width: 64,
                  height: 64,
                  background: 'rgba(0,0,0,0.54)',
                  borderRadius: '50%',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: '64px',
                  top: 0
                }}>
                <i className="fa fa-spin fa-spinner"/>
              </div>
              }
            </div>
            <div style={{position: 'relative', flex: 1}}>
              <input
                style={{fontSize: 14, color: '#999999'}}
                type="file"
                onChange={e => {
                  this.getSignedRequest(e.target.files, user._id);
                }}
              />
              {this.state.imageError &&
              <div
                style={{position: 'absolute', width: '100%', bottom: -6}}
                className={css(form.error)}>
                {this.state.imageError}
              </div>
              }
            </div>
          </div>
        </div>
        <div className={css(form.inline)}>
          <div className={css(form.inlineLabel)}>First Name</div>
          <input
            className={css(form.inlineInput)}
            value={user.first_name}
            onChange={e => handleUpdateUser({first_name: e.target.files})}
          />
        </div>
        <div className={css(form.inline)}>
          <div className={css(form.inlineLabel)}>Last Name</div>
          <input
            className={css(form.inlineInput)}
            value={user.last_name}
            onChange={e => handleUpdateUser({last_name: e.target.value})}
          />
        </div>
      </div>
    );
  }
}
