import Keycloak from 'keycloak-connect'
import session from 'express-session'


let keycloak: any;
let keycloakConfig = {
  clientId: "isa-backend",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/auth",
  realm: "Isa-qualis",
  realmPublicKey:"XxEY6904A54gkNJkoBG6dPSLSuXzA0BZFrzYShHP5zw"
}

function initKeycloak() {
  if(keycloak) {
    console.warn("trying to init Keycloak again!")
    return keycloak
  }
  console.warn("initializing Keycloak...")
  const memoryStorage = new session.MemoryStore()
  //@ts-ignore
  keycloak = new Keycloak({ store: memoryStorage }, keycloakConfig)
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
