export interface IKeycloakUser {
    age: number,
    name: string,
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