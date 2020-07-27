import keycloakConnection from 'keycloak-connect'
import session from 'express-session'

class Keycloak {

  private keycloak: any;
  private keycloakConfig = {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": `${process.env.KEYCLOAK_SERVER_URL}/`,
    "ssl-required": "external",
    "resource": process.env.KEYCLOAK_CLIENT,
    "verify-token-audience": true,
    "credentials": {
      "secret": "dad5acb5-0550-469b-9497-e475afbe9672"
    },
    "confidential-port": 0,
    "policy-enforcer": {}
  }
  constructor() {
    this.initKeycloak()
  }

  private initKeycloak() {
    if(this.keycloak){
      return this.keycloak
    }
    const memoryStorage = new session.MemoryStore()
    //@ts-ignore
    this.keycloak = new keycloakConnection({ store: memoryStorage}, this.keycloakConfig)
    return this.keycloak
  }

  getKeycloak() {
    return this.keycloak
  }

}

export default new Keycloak()


