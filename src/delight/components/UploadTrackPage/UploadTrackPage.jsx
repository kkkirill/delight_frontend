import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import classnames from 'classnames';

import './UploadTrackPage.css';
import NavigationPanel from '../../containers/NavigationPanel';
import SongUploadInput from '../../containers/SongUploadInput';
import ImageUploadInput from '../../containers/ImageUploadInput';
import MultipleSelection from '../MultipleSelection/MultipleSelection';

function UploadTrackPage({className, getArtists, getGenres, artists, genres, submitTrack, imageUploadInfo, songUploadInfo}) {
  const [submitted, setSubmitted] = useState(false);
  const [songTitle, setSongTitle] = useState();
  const [explicit, setExplicit] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  artists = artists.results || artists || [];
  genres = genres.results || genres || [];

  useEffect(() => {
    getArtists();
    getGenres();
  }, []);

  if (submitted) {
    return <Redirect to="/"/>;
  }

  const onSongTitleChange = ({target: {value}}) => {
    setSongTitle(value);
  };

  const onExplicitChange = ({target: {checked}}) => {
    setExplicit(checked);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (songUploadInfo.get('status') + '' === '' + 1 && selectedArtists.length > 0 && selectedGenres.length > 0) {
      submitTrack({
        title: songTitle,
        image: imageUploadInfo.getIn(['data', 'file']),
        file: songUploadInfo.getIn(['data', 'file']),
        explicit,
        artists: selectedArtists.map(each => artists[each].id),
        genres: selectedGenres.map(each => genres[each].id)
      });

      setSubmitted(true);
    }
  };

  return (<div className={classnames('upload-track-page', className)}>
    <NavigationPanel/>

    <form onSubmit={onFormSubmit} className="upload-track-page__form">
      <input className="upload-track-page__title"
             type="text"
             placeholder="Название"
             onChange={onSongTitleChange}
             required
      />
      <SongUploadInput/>
      <ImageUploadInput/>
      <p>Песня содержит нецензурные выражения?</p>
      <input type="checkbox" value={explicit} onChange={onExplicitChange}/>
      {artists && genres ?
        <>
          <p>Связанные артисты:</p>
          <MultipleSelection options={artists} selected={selectedArtists}
                             setSelected={setSelectedArtists}
                             nameField="stageName"/>
          <p>Связанные жанры:</p>
          <MultipleSelection options={genres} selected={selectedGenres}
                             setSelected={setSelectedGenres}
                             nameField="name"/>
        </>
        :
        <p>Загрузка...</p>
      }
      <input className="upload-track-page__submit" type="submit"/>
    </form>
  </div>);
}

export default UploadTrackPage;