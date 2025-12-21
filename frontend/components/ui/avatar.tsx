import * as React from "react";

export function Avatar({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={"inline-flex items-center justify-center overflow-hidden rounded-full " + (className ?? "")}>{children}</div>
  );
}

export function AvatarFallback({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <span className={"inline-flex items-center justify-center w-full h-full " + (className ?? "")}>{children}</span>;
}
