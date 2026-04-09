import { SWRConfig } from "swr";
import { swrConfig } from "../shared/api/Fetcher";

export function AppProviders({ children }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
