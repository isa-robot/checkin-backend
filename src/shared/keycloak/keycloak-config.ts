import keycloakConnection from 'keycloak-connect'
import session from 'express-session'

class Keycloak {

  private keycloak: any;
  private keycloakConfig = {
    "realm": "isa-qualis",
    "bearer-only": true,
    "auth-server-url": "http://localhost:8080/auth/",
    "ssl-required": "external",
    "resource": "isa-backend",
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
    this.keycloak = new keycloakConnection({ store: memoryStorage}, this.keycloakConfig)
    return this.keycloak
  }

  getKeycloak() {
    return this.keycloak
  }

}

export default new Keycloak()
