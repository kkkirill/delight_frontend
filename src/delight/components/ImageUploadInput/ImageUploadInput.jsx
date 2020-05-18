import React from 'react';
import classnames from 'classnames';

import './ImageUploadInput.css';
import {FileDrop} from 'react-file-drop';

function ImageUploadInput({className, authentication, uploadImage, imageUploadInfo, imageType}) {
  const uploaded = imageUploadInfo.get('status') + '' === '' + 1;

  const onPhotoDrop = (files, a) => {
    const lastFile = files[files.length - 1];
    if (lastFile.type.startsWith('image')) {
      uploadImage(lastFile, imageType || 'PI', authentication.get('data').token);
    }
  };

  return (
    <div>
      {uploaded ?
        <img className="image-upload__image" src={imageUploadInfo.get('data').file}/>
        :
        <FileDrop className={classnames('image-upload__input', className)} onDrop={onPhotoDrop}>Перетащите
          фото сюда</FileDrop>
      }
    </div>
  );
}

export default ImageUploadInput;