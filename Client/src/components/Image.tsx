import { useState } from "react";
import styles from "./image.module.scss";

type Props = {
  src?:string
};

const Image = ({ src }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className={styles.loader}></div>}
      <img
        src={src}
        onLoad={handleLoading}
        style={{ display: isLoading ? 'none' : 'block' }}
      ></img>
    </>
  );
};

export default Image;
