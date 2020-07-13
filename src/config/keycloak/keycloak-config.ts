import Keycloak from 'keycloak-connect'
import session from 'express-session'


let keycloak: any;
const keycloakConfig = {
  "realm": "test",
  "auth-server-url": "http://0.0.0.0:8080/auth/",
  "ssl-required": "external",
  "resource": "nodejs-test",
  "verify-token-audience": true,
  "credentials": {
    "secret": "343cab49-ff32-4dc7-8a7c-a0d626957f56"
  },
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  "policy-enforcer": {}
}

function initKeycloak() {
  if(keycloak) {
    console.warn("trying to init Keycloak again!")
    return keycloak
  }
  console.warn("initializing Keycloak...")
  const memoryStorage = new session.MemoryStore()
  //@ts-ignore
  keycloak = new Keycloak({ store: memoryStorage , scope:"email"},keycloakConfig)
  return keycloak
}

function getKeycloak() {
  if(keycloak)
    return keycloak
  return console.info("keycloak has not been initialized")
}

module.exports = {
  initKeycloak,
  getKeycloak
}
