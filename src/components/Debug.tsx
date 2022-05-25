import React from 'react';
import { Portal } from "./Portal";

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export function isPrimitive(value: unknown): value is Primitive {
  return typeof value !== 'object' || value === undefined || value === null;
}

type Compute = () => Primitive;

interface StatProps {
  name: string;
  value: Primitive | Compute;
}

function formatValue(value: Primitive | Compute): React.ReactNode {
  switch(typeof value) {
    case 'function': {
      return formatValue(value());
    }
    case 'bigint':
    case 'boolean':
    case 'symbol' : {
      return value.toString();
    }
    default: {
      return value;
    }
  }
}

function Stat({ name, value }: StatProps) {
  const localValue = formatValue(value);
  
  return (
    <li className="flex justify-between gap-3">
      <strong className="flex-1">{name}</strong>
      <p className="flex-[2]">{localValue}</p>
    </li>
  );
}

interface DebugProps {
  children: React.ReactNode;
}

export function Debug({ children }: DebugProps) {
  
  return (
    <Portal>
      <div className="absolute top-0 right-0">
        <div className="flex flex-col justify-center m-2">
          <ul>
            {children}
          </ul>
        </div>
      </div>
    </Portal>
  );
}

Debug.Stat = Stat;
