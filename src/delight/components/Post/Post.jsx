import React from 'react';
import classnames from 'classnames';

import PostHeader from '../PostHeader/PostHeader';

import './Post.css';
import LimitedTracksView from '../../containers/LimitedTracksView';
import LimitedPlaylistsView from '../../components/LimitedPlaylistsView/LimitedPlaylistsView';

function Post({post, className}) {
  return (
    <div className={classnames('post', className)}>
      <PostHeader
        postId={post.id}
        author={post.owner}
        date={new Date(post.pubDate).toISOString().substring(0, 16).replace('T', ' ')}
      />
      <div className="post__content">
        <p className="post__text">{post.text}</p>
      </div>
      {
        post.images[0] &&
        <div className="post__images">
          <img className="post__image" src={post.images[0]}/>
        </div>
      }
      {
        post.songs[0] &&
        <div className="post__tracks">
          <LimitedTracksView tracks={post.songs}/>
        </div>
      }
      {
        post.playlists[0] &&
        <div className="post__playlists">
          <LimitedPlaylistsView playlists={post.playlists}/>
        </div>
      }
    </div>
  );
}

export default Post;