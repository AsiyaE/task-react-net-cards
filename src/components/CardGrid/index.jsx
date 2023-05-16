import React, { useEffect, useState, useCallback } from 'react';
import { useElementSize } from '../hooks/useElementSize';
import Card from '../Card';
import styles from './CardGrid.module.scss';
import debounce from 'lodash.debounce';


const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [ref, width, height] = useElementSize();
  const [number, setNumber] = useState(0);

  const getNumber = () => {
     console.log('width count =', Math.floor(width / (150 + 60)), 'row count', Math.floor(height / (100 + 30)))
    // console.log('count = ', Math.floor(width / (150 + 60)) * Math.floor(height / (100 + 30)))
    return Math.floor(width / (150 + 30)) * Math.floor(height / (100 + 30));
  };

  useEffect(()=>{
    updateNumber();
    console.log('call UpdateNumber')
  },[width, height])

  const updateNumber = useCallback(
    debounce(() => {
      console.log('getNumber = ', getNumber())

      setNumber(getNumber())
    }, 100),
    []
  )
 
  useEffect(() => {
    if (number===0) return;
    if (number > cards.length) {
      const start = cards.length;
      const limit = number - start;
      console.log('start = ', start, 'limit =', limit);
      const url = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=${start}&_limit=${limit}`;
      const fetchData = () => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setCards((prev) => [...prev, ...data]);
          });
      };
      fetchData();
    }
    if (number < cards.length){
      setCards((prev) => prev.slice(number));
    }
  }, [number]);

  return (
    <div ref={ref} className={styles.grid}>
      {cards.map((card) => (
        <Card title={card.title} key={card.id} />
      ))}
    </div>
  );
};

export default CardGrid;
