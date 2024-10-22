// components/DelayedComponent.tsx
/* eslint-disable */
import React, { useState, useEffect, ReactNode } from "react";

interface DelayedComponentProps {
  delay: number; // Delay in milliseconds
  children: ReactNode; // Content to render after the delay
}

const DelayedComponent: React.FC<DelayedComponentProps> = ({
  delay,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender ? <>{children}</> : null;
};

export default DelayedComponent;
