import React from 'react';
import classnames from 'classnames';
import {defaultPlaylistImage} from '../../constants';

import './ProfileInformation.css';

function ProfileInformation({id, name, avatarImage, followersCount, tracksListenedCount, className}) {
  const profileImage = avatarImage || defaultPlaylistImage;

  return (
    <div className={classnames('profile-information', className)}>
      <img className="profile-information__image" src={profileImage}/>
      <div className="profile-information__info-section">
        <p className="profile-information__followersCount">{followersCount || 0}</p>
        <div className="profile-information__vertical-line"/>
        <p className="profile-information__tracks-listened">{tracksListenedCount || 0}</p>
      </div>
      <div className="profile-information__name-section">
        <p className="profile-information__name">{name || "No name"}</p>
      </div>
    </div>
  );
}

export default ProfileInformation;