'use client';

import { useEffect } from 'react';
import { captureUtm } from '@/lib/utm';

/** Guarda los utm_* de la primera página que ve el visitante. No pinta nada. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
