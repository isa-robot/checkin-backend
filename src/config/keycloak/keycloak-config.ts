import Keycloak from 'keycloak-connect'
import session from 'express-session'


let keycloak: any;
const keycloakConfig = {
  "realm": "isa-qualis",
  "bearer-only": true,
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "external",
  "resource": "isa-backend",
  "confidential-port": 0
}

function initKeycloak() {
  if(keycloak) {
    console.warn("trying to init Keycloak again!")
    return keycloak
  }
  console.warn("initializing Keycloak...")
  const memoryStorage = new session.MemoryStore()
  //@ts-ignore
  keycloak = new Keycloak({ store: memoryStorage}, keycloakConfig)
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
