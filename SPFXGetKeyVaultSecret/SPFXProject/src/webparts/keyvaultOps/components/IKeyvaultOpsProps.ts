import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IKeyvaultOpsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  webpartContext: WebPartContext,
  AzFunctionUrlForCertificate: string,
  AzFunctionUrlForSecret: string
}
