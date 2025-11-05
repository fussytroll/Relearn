quick and dirty way of getting keyvault secrets from SPFX app.
A standard SPFX web part calls an Azure Function (http trigger) that retrieves the KeyVault Certificate and Secret.
This solution uses default Function Authentication where Access Key is appended to URL.
SPFX solution uses HttpClient to call the Function Url and retrieve response as text.
Note: Functions URLS are supplied as Webpart Properties.

Improvements
Secure the function using an Entra App and use aadHttpClientFactory as shown below

        appContext.webpartContext?.aadHttpClientFactory.getClient(<ClientId of the App>)
        .then((client)=>{
            client.get(<function Url>, .........)
            .then(response......
        })
        .catch((ex)=>{
            console.dir(ex);
        });
could not find a direct way to get secrets directly from Keyvault except may be using REST for .e.g. 
https://learn.microsoft.com/en-us/rest/api/keyvault/keyvault/vaults/get?view=rest-keyvault-keyvault-2024-11-01&tabs=dotnet
