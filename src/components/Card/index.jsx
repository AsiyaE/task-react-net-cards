import React from 'react'
import styles from './Card.module.scss';

const Card = ({title}) => {
  return (
	<div className={styles.card}>{title}</div>
  )
}

export default Card