import { useState, useEffect, useRef } from 'react';

export const useElementSize = () => {
  const ref = useRef();
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWidth(width);
	  setHeight(height);
    }),
  );

  useEffect(() => {
    observer.current.observe(ref.current);
  }, [ref, observer]);

  return [ref, width, height];
};
