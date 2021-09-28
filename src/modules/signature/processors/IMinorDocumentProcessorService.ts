import IDocumentProcessorService from "@modules/signature/processors/IDocumentProcessorService";
import {IKeycloakUser} from "@shared/keycloak/IKeycloakUser";
import IResponsible from "@users/responsible/interfaces/IResponsible";

export default interface IMinorDocumentProcessorService extends IDocumentProcessorService{

    execute(documentBase64: string, data: {user: IKeycloakUser, responsible: IResponsible}, ): Promise<string>
}
