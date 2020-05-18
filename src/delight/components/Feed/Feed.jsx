import React from 'react';
import Post from '../Post/Post';
import classnames from 'classnames';

import './Feed.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function Feed({className, children, posts, nextFunction}) {
  const results = posts.results || posts || [];

  return (
    <div className={classnames('feed', className)}>
      {children}
      <InfiniteScroll
        next={nextFunction}
        hasMore={!!posts.count}
        loader={<p>Загрузка...</p>}
        endMessage={<p>Нет постов</p>}
        dataLength={results.length}>
        {results.map(post => (
          <Post
            className="feed__post"
            post={post}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Feed;
