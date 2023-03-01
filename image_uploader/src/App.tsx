import { useRef, useState } from 'react';
import styles from './App.module.scss';
import bgImage from './assets/image.svg';

const App = () => {
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleUpload = (e: any) => {
    // Pass the options to axios as props, to get the progress simulation
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const { loaded, total } = progressEvent;
        // We could remove this var and pass Math.floor((loaded * 100) / total) directly to our state to have less memory allocation, but this is a very simple app and it won't impact the performance. Just to let people know if anyone interested
        const percentage = Math.floor((loaded * 100) / total);
        setProgress(percentage);
      },
    };
    console.log(options, progress);

    console.log(e.target.files[0]);
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
            <img src={bgImage} alt="uploadImage" id="image-upload" />
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
