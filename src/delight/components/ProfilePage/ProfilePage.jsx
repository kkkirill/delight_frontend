import React, {useEffect, useReducer} from 'react';
import classnames from 'classnames';
import {Link, Redirect, useParams} from 'react-router-dom';

import './ProfilePage.css';
import ProfileInformation from '../ProfileInformation/ProfileInformation';
import NavigationPanel from '../../containers/NavigationPanel';
import Feed from '../Feed/Feed';
import InterestsSection from '../InterestsSection/InterestsSection';
import LimitedPlaylistsView from '../LimitedPlaylistsView/LimitedPlaylistsView';
import TwoSidedView from '../TwoSidedView/TwoSidedView';

function ProfilePage({requestUser, followUser, posts, stopFollowingUser, user, playlists, setPlaylistVisibility, playlistVisibility, createPlaylist, getUserPostsConsecutive, getUserPlaylists, authentication, className}) {
  const id = useParams('id').id;
  const authStatus = authentication.get('status');
  const authorized = '' + authentication.get('status') === '' + 1;
  const selfPage = authorized && '' + authentication.get('data').id === '' + id;
  const isFollowing = authorized && user && user.followers && user.followers.includes(authentication.get('data').id);
  const followButtonText = isFollowing ? 'Отписаться' : 'Подписаться';
  const [updateValue, forceUpdate] = useReducer(x => x + 1, 0);

  const onFollowButtonClick = () => {
    if (isFollowing) {
      stopFollowingUser(authentication.get('data').token, id);
      forceUpdate();
    } else {
      followUser(authentication.get('data').token, id);
      forceUpdate();
    }
  };

  const onScrollFunction = () => {
    getUserPostsConsecutive(id);
  };

  const onCreatePlaylistButtonClick = () => {
    createPlaylist('Playlist_' + new Date().getTime());
    forceUpdate();
  };

  useEffect(() => {
    requestUser(id);

    if (authStatus === 1) {
      getUserPostsConsecutive(id, undefined, true);
      getUserPlaylists(id);
    }
    if (authStatus === 2) {
      getUserPostsConsecutive(id, undefined, true);
      getUserPlaylists(id);
    }
  }, [id, authStatus, updateValue, playlistVisibility]);

  if (user === null) {
    return <Redirect to="/not-found"/>;
  }

  if (!user.username) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={classnames('profile-page', className)}>
      <NavigationPanel/>

      <div className="profile-page__content">
        <TwoSidedView
          leftSide={
            <Feed className="profile-page__feed" posts={posts} nextFunction={onScrollFunction}>
              {selfPage &&
              <Link to="/add" className="profile-page__add-post-link">
                <button className="profile-page__add-post-button">Добавить пост</button>
              </Link>
              }
            </Feed>
          }
          rightSide={
            <InterestsSection className="profile-page__interests-section">
              <ProfileInformation
                id={user.id}
                name={user.username}
                avatarImage={user.photo}
                followersCount={user.followers && user.followers.length}
                tracksListenedCount={user.following && user.following.length}
              />

              {authorized && selfPage ?
                <>
                  <Link to="/upload_track" className="profile-page__upload-track-link">
                    <button className="profile-page__upload-track-button">Загрузить трек</button>
                  </Link>
                  <button
                    className="profile-page__create-playlist-button"
                    onClick={onCreatePlaylistButtonClick}
                  >
                    Создать плейлист
                  </button>
                </>
                :
                authorized && requestUser &&
                <button
                  className="profile-page__follow-button"
                  onClick={onFollowButtonClick}
                >
                  {followButtonText}
                </button>
              }
              <LimitedPlaylistsView
                playlists={playlists}
                title={selfPage ? "Ваши плейлисты" : "Плейлисты пользователя"}
              />
            </InterestsSection>
          }
        />
      </div>
    </div>
  );
}

export default ProfilePage;