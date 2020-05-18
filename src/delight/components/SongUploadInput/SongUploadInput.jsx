import React from 'react';
import classnames from 'classnames';

import './SongUploadInput.css';
import {FileDrop} from 'react-file-drop';

function SongUploadInput({className, uploadSong, songUploadInfo}) {
  const uploaded = songUploadInfo.get('status') + '' === '' + 1;

  const onPhotoDrop = (files, a) => {
    const lastFile = files[files.length - 1];
    if (lastFile.type.startsWith('audio')) {
      uploadSong(lastFile, 'SF');
    }
  };

  return (
    <div>
      {uploaded ?
        <p>Успешно загружена</p>
        :
        <FileDrop className={classnames('song-upload__input', className)} onDrop={onPhotoDrop}>Перетащите
          сюда свою песню</FileDrop>
      }
    </div>
  );
}

export default SongUploadInput;