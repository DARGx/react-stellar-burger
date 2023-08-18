import { FC } from 'react';
import pic from '../../images/404.jpg';
import styles from './NotFound.module.css';

export const NotFoundPage: FC = () => {
  return (
    <div>
      <img src={pic} alt="" className={styles.img} />
    </div>
  );
};
