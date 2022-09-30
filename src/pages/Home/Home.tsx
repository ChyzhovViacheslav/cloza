import React from 'react'
import styles from '../../styles/styleComponents/Home.module.scss';
type Props = {}

export default function Home({}: Props) {
  return (
    <div className={styles.home}>
      <div className={styles.home + ' _container'}>
        <div className={styles.home__body}>
        </div>
      </div>
    </div>
  )
}