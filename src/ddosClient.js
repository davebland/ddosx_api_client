/** DDoSX API Clients */

export class DdosxAclClient {

    blockRequestBody = {
        "uri": "",
        "ip": "",
        "mode": "*"          
    };
    blockButtonDisabled = false;        
    blockButtonText = "Block";
    deployButtonDisabled = false;
    deployButtonText = "Deploy";
    blockAclId = String();
    allowButtonDisabled = true;
    allowButtonText = "Allow";
    
    constructor(domain) {
        this.name = domain;
    }

    #getApiKey() {
        return document.getElementById("apiKey").value;
    }

    async blockAccess() {
        // Add deny all rule to DDoSX ACL

        this.blockButtonText = "...";
        this.blockButtonDisabled = true;

        await fetch(`https://api.humboldt.dev/ukfast/ddosx/v1/domains/${this.name}/acls/ips`, {
            method: 'POST',        
            headers: {
                'Authorization' : this.#getApiKey(),                
            },
            body: this.blockRequestBody
        })
            .then(response => {
                this.blockButtonText = response.status;
                if (!response.ok) {                                                
                    throw 'API response not OK: ' + response.status;
                }
                return response.json();
            })
            .then(resJson => {
                this.blockAclId = resJson['data']['id'];
                this.allowButtonDisable = false;                     
            })
            .catch((err) => {
                console.error(err);
                this.blockButtonDisabled = false;
            })
    }

    async deployChanges() {
        // Instruct DDoSX to deploy pending changes

        this.deployButtonText = "...";
        this.deployButtonDisabled = true;

        await fetch(`https://api.humboldt.dev/ukfast/ddosx/v1/domains/${this.name}/deploy`, {
            method: 'POST',
            headers: {
                'Authorization' : this.#getApiKey()
            }
        })
            .then(response => {
                this.deployButtonText = response.status;  
                if (!response.ok) {                                              
                    throw 'API response not OK: ' + response.status;
                }                        
            })
            .catch((err) => {
                console.error(err);
            })
        
        this.deployButtonDisabled = false;
    }

    async allowAccess() {
        // Remove deny all rule from DDoSX acl

        this.allowButtonText = "...";
        this.allowButtonDisabled = true;

        await fetch(`https://api.humboldt.dev/ukfast/ddosx/v1/domains/${this.name}/acls/ips/${this.blockAclId}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : this.#getApiKey()
            }
        })
            .then(response => {
                this.allowButtonText = response.status;  
                if (!response.ok) {                                              
                    throw 'API response not OK: ' + response.status;
                }                        
            })
            .catch((err) => {
                console.error(err);
            })
        
        this.deployButtonDisabled = false;
    }
}