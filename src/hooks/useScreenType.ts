'use client';

import throttle from '@/utils/throttle';
import { useEffect, useState } from 'react';

type ScreenType =
  | 'EX_SMALL'
  | 'SMALL'
  | 'MEDIUM'
  | 'LARGE'
  | 'EX_LARGE'
  | 'TWO_EX_LARGE'
  | 'NONE';

export const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>('NONE');

  useEffect(() => {
    const onResize = throttle((_event: UIEvent) => {
      setScreenType(getScreenType(window.innerWidth));
    }, 100);

    window.addEventListener('resize', onResize);
    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return screenType;
};

const BREAK_POINT = {
  SMALL: 640,
  MEDIUM: 768,
  LARGE: 1024,
  EX_LARGE: 1280,
  TWO_EX_LARGE: 1280,
};

const getScreenType = (width: number): ScreenType => {
  if (width >= BREAK_POINT.TWO_EX_LARGE) {
    return 'TWO_EX_LARGE';
  } else if (width >= BREAK_POINT.EX_LARGE) {
    return 'EX_LARGE';
  } else if (width >= BREAK_POINT.LARGE) {
    return 'LARGE';
  } else if (width >= BREAK_POINT.MEDIUM) {
    return 'MEDIUM';
  } else if (width >= BREAK_POINT.SMALL) {
    return 'SMALL';
  } else {
    return 'EX_SMALL';
  }
};

export const useIsMedium = () => {
  const screenType = useScreenType();
  return (
    screenType === 'EX_SMALL' ||
    screenType === 'SMALL' ||
    screenType === 'MEDIUM'
  );
};
