import * as React from 'react';
import { createPortal } from "react-dom";
import { useForceUpdate } from "../hooks/useForceUpdate";
import { useIsomorphicEffect } from "../hooks/useIsomorphicEffect";

interface PortalProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<Node>;
}

export function Portal({ children, containerRef }: PortalProps) {
  const mountNode = React.useRef<HTMLDivElement | null>(null);
  const portalNode = React.useRef<HTMLElement | null>(null);
  const forceUpdate = useForceUpdate();

  useIsomorphicEffect(() => {
    if (!mountNode.current) return;
    let ownerDocument = mountNode.current!.ownerDocument;
    let body = containerRef?.current || ownerDocument.body;
    portalNode.current = ownerDocument?.createElement("react-portal")!;
    body.appendChild(portalNode.current);
    forceUpdate();
    return () => {
      if (portalNode.current && body) {
        body.removeChild(portalNode.current);
      }
    };
  }, [forceUpdate, containerRef]);

  return portalNode.current ? (
    createPortal(children, portalNode.current)
  ) : (
    <span ref={mountNode} />
  );
};
