import React, {useEffect} from 'react';
import NavigationPanel from '../../containers/NavigationPanel';
import Feed from '../Feed/Feed';
import InterestsSection from '../InterestsSection/InterestsSection';

import './HomePage.css';
import LimitedTracksView from '../../containers/LimitedTracksView';
import LimitedPlaylistsView from '../LimitedPlaylistsView/LimitedPlaylistsView';
import TwoSidedView from '../TwoSidedView/TwoSidedView';

function HomePage({getPosts, getPlaylists, posts, playlists, updateCounter, incrUpdateCounter, authentication}) {
  const authStatus = authentication.get('status');
  const authorized = authStatus+'' === '1';

  useEffect(() => {
    if (authStatus === 1) {
      getPosts(authentication.get('data').id);
      getPlaylists(authentication.get('data').id);
    } else {
      getPosts();
      getPlaylists();
    }
  }, [updateCounter, authStatus]);

  const onUpdateButtonClick = () => {
    incrUpdateCounter();
  };

  return (
    <div className="home-page">
      <NavigationPanel/>

      <div className="home-page__content">
        <TwoSidedView
          leftSide={
            <Feed className="home-page__feed" posts={posts}>
              <button onClick={onUpdateButtonClick}>Обновить</button>
            </Feed>}
          rightSide={<InterestsSection className="home-page__interests-section">
            <LimitedPlaylistsView
              playlists={playlists}
              title={authorized ? "Ваши плейлисты" : "Популярные плейлисты"}
            />
          </InterestsSection>}
        />
      </div>
    </div>
  );
}

export default HomePage;
