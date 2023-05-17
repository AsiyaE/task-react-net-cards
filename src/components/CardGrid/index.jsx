import React, { useState, useMemo, useEffect } from 'react';
import { useElementSize } from '../hooks/useElementSize';
import Card from '../Card';
import styles from './CardGrid.module.scss';
import debounce from 'lodash.debounce';

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [ref, width, height] = useElementSize();

  const getNumber = () => {
    return Math.floor((width + 30) / 180) * Math.floor((height + 30) / 130);
  };

  const fetchData = debounce((start, limit) => {
    const url = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=${start}&_limit=${limit}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCards((prev) => [...prev, ...data]);
      });
  }, 1000);

  const number = useMemo(() => {
    console.log('memory');

    return getNumber();
  }, [width, height]);

  useEffect(() => {
    if (number === 0) return;
    if (number > cards.length) {
      const start = cards.length;
      const limit = number - start;

      fetchData(start, limit);
      console.log('fetch');
    }
    if (number < cards.length) {
      setCards((prev) => prev.slice(0, number));
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
