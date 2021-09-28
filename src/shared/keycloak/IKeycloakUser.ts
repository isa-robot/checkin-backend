export interface IKeycloakUser {
    name: string,
    firstName: string,
    lastName: string,
    responsible: IResponsible,
    cpf: string,
    rg: string
}

export interface IResponsible {
    name: string,
    cpf: string,
    rg: string,
    address: string
}
