import keycloakConnection from 'keycloak-connect'
import session from 'express-session'

class Keycloak {

  private keycloak: any;
  private keycloakConfig = {
    "realm": process.env.REALM,
    "bearer-only": true,
    "auth-server-url": `${process.env.SERVER_URL}/`,
    "ssl-required": "external",
    "resource": process.env.CLIENT,
    "confidential-port": 0
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
