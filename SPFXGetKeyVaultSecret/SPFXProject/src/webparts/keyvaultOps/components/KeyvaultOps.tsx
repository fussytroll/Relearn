import * as React from 'react';
//import styles from './KeyvaultOps.module.scss';
import type { IKeyvaultOpsProps } from './IKeyvaultOpsProps';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
//import { escape } from '@microsoft/sp-lodash-subset';

export interface IKeyvaultOpsState {
  PFXCertificate: string;
  Secret: string;
}
export default class KeyvaultOps extends React.Component<IKeyvaultOpsProps, IKeyvaultOpsState> {

  constructor(props: IKeyvaultOpsProps) {
    super(props);

    this.state = {
      PFXCertificate:"Retrieving",
      Secret:"Retrieving"
    };
  }
  //use when using "Function Authentication"
  public getKVCertificateWithFunctionAuthentication = (): void => {

    if (this.props.AzFunctionUrlForCertificate === null || this.props.AzFunctionUrlForCertificate === undefined) {
      console.log("SET CERTIFICATE FUNCTION URL PROPERTY")
      return;
    }

    this.props.webpartContext.httpClient.get(this.props.AzFunctionUrlForCertificate, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        response.text()
          .then((textValue: any) => {
            console.log("CERTIFICATE_TEXT_VALUE");
            console.dir(textValue);

            this.setState({
              PFXCertificate : textValue
            });
          })
          .catch((jsonError) => {
            console.log("CERTIFICATE_JSON_ERROR");
            console.dir(jsonError);
          });
      })
      .catch((getError) => {
        console.log("CERTIFICATE_GET_ERROR");
        console.dir(getError);
      });
  }

    public getKVSecretWithFunctionAuthentication = (): void => {



    if (this.props.AzFunctionUrlForSecret === null || this.props.AzFunctionUrlForSecret === undefined) {
      console.log("SET SECRET FUNCTION URL PROPERTY")
      return;
    }

    this.props.webpartContext.httpClient.get(this.props.AzFunctionUrlForSecret, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        response.text()
          .then((textValue: any) => {
            console.log("SECRET_TEXT_VALUE");
            console.dir(textValue);

            this.setState({
              Secret : textValue
            });
          })
          .catch((jsonError) => {
            console.log("SECRET_JSON_ERROR");
            console.dir(jsonError);
          });
      })
      .catch((getError) => {
        console.log("SECRET_GET_ERROR");
        console.dir(getError);
      });
  }

  public componentDidMount(): void {
    this.getKVCertificateWithFunctionAuthentication();
    this.getKVSecretWithFunctionAuthentication();
  }

  public render(): React.ReactElement<IKeyvaultOpsProps> {
    console.log("PROPS");
    console.dir(this.props);
    return (
      <div>
        <h1>Certificate</h1>
        <label>{this.state.PFXCertificate}</label>
        <h1>Secret</h1>
        <label>{this.state.Secret}</label>

      </div>
    );

  }

}
