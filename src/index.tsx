import { useState, useRef, useEffect } from "react";

type ObserverType = {
  threshold: number,
  rootMargin?: string,
};

export function useObserver({ threshold, rootMargin = '0px' }: ObserverType) {

  const [inView, setInView] = useState<boolean>();
  const ref = useRef<any>();
  const iObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: rootMargin,
      threshold: threshold
    }
    
    iObserverRef.current = new IntersectionObserver((entries) => {
      if (inView !== entries[0].isIntersecting) {
        setInView(entries[0].isIntersecting);
      }
    }, options);
  }, []);

  useEffect(() => {
    if (ref.current) iObserverRef.current?.observe(ref.current);
    return () => {
      if (ref.current) {
        iObserverRef.current?.unobserve(ref.current);
        iObserverRef.current?.disconnect();
      }
    }
  }, [ref.current])

  return { inView, ref };
}