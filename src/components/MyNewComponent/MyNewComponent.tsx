import React, { FC } from 'react';
import styles from './MyNewComponent.module.css';

interface MyNewComponentProps {}

const MyNewComponent: FC<MyNewComponentProps> = () => (
  <div className={styles.MyNewComponent}>
    MyNewComponent Component
  </div>
);

export default MyNewComponent;
