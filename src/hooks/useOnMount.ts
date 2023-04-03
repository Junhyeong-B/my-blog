'use client';

import { EffectCallback, useEffect, useRef } from 'react';

export default function useOnMount(callback: EffectCallback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const cleanup = callbackRef.current();

    return () => cleanup?.();
  }, []);
}
