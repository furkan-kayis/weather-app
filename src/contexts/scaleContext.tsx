import { createContext, Dispatch, useMemo, useState } from 'react';

type Scale = 'celsius' | 'fahrenheit';

type Context = { scale: Scale; setScale?: Dispatch<Scale> };

export const ScaleContext = createContext<Context>({ scale: 'celsius' });

export function ScaleProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [scale, setScale] = useState<Scale>('celsius');
  const value = useMemo(
    () => ({
      scale,
      setScale,
    }),
    [scale]
  );
  return (
    <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
  );
}
