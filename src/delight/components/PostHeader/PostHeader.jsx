import React from 'react';
import {Link} from 'react-router-dom';

import './PostHeader.css';

function PostHeader({postId, author, date}) {
  return (
    <div className="post-header">
      <Link className="post-header__icon-link" to={`/profile/${author.id}`}>
        <img className="post-header__icon" src={author.photo}/>
      </Link>
      <div className="post-header__text-container">
        <Link className="post-header__author-name-link" to={`/profile/${author.id}`}>
          <p className="post-header__author-name">{author.username}</p>
        </Link>
        <p className="post-header__date">{date}</p>
      </div>
    </div>
  );
}

export default PostHeader;