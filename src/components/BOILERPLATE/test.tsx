import { FC } from 'react';
import styles from './test.module.scss';

interface Props {}

export const Test: FC<Props> = ({}) => {
  return <div className={styles.Test}></div>;
};
