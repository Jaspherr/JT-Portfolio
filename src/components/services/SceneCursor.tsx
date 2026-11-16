import type { ReactNode } from "react";

type SceneCursorProps = {
  id: string;
  tag?: string;
  children?: ReactNode;
};

export default function SceneCursor({ id, tag, children }: SceneCursorProps) {
  return (
    <span className={`sv-cur sv-cur-${id}`}>
      <svg viewBox="0 0 10 14">
        <path d="M1 1v10l2.8-2.4 1.8 4 1.7-.7L5.5 8H9z" />
      </svg>

      {tag && <b>{tag}</b>}

      {children}
    </span>
  );
}
