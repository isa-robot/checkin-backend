import Resource from '@security/resources/infra/typeorm/entities/Resource';

export default interface ICreateRoleDTO {
    name: string;
    resources: Resource[];
}
