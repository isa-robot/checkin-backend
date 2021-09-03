import { IKeycloakUser } from "@shared/keycloak/IKeycloakUser"

export default interface IDocumentProcessorService {

    execute(user: IKeycloakUser, documentBase64: string): Promise<string>
}
