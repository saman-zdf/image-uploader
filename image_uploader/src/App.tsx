import { useCallback, useRef, useState } from 'react';
import styles from './App.module.scss';
import bgImage from './assets/image.svg';
import axiosInstance from './AxiosInstance/AxiosInstance';

const App = () => {
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleUpload = (e: any) => {
    // Pass the options to axios as props, to get the progress simulation
    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        ``;
        const percentage = Math.floor((loaded * 100) / total);
        setProgress(percentage);
      },
    };

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    console.log(image);

    axiosInstance
      .post('/image-upload-cloudinary', formData)
      .then((res) => setImageUrl(res.data.result))
      .catch((err) => console.log(err.response));
  };

  const handleButtonClick = () => {
    if (fileInputRef?.current) fileInputRef?.current?.click();
  };

  return (
    <div className={styles.AppContainer}>
      <div className={styles.ImageUploader__paper}>
        <div className={styles.ImageUploader__header}>
          <h1>Upload your image</h1>
          <p>File should be Jpeg,Png...</p>
        </div>
        <div className={styles.ImageUploader__input}>
          <label htmlFor="image-upload">
            <img
              src={Boolean(imageUrl) ? imageUrl : bgImage}
              alt="uploadImage"
              id="image-upload"
              className={Boolean(imageUrl) ? styles.ImageUrl : ''}
            />
          </label>
          <input ref={fileInputRef} onChange={(e) => handleUpload(e)} type="file" id="image-upload" accept="image/*" />
        </div>
        <div className={styles.ImageUploader__actions}>
          <p>Or</p>
          <button onClick={handleButtonClick}>Choose a file</button>
        </div>
      </div>
    </div>
  );
};

export default App;
