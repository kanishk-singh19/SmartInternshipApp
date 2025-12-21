declare module "@vercel/analytics/react" {
  import type * as React from "react";
  export function Analytics(props?: { debug?: boolean }): React.JSX.Element | null;
  export default Analytics;
}

declare module "@vercel/analytics/next" {
  const v: unknown;
  export = v;
}
