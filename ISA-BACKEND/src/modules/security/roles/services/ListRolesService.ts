import { inject, injectable } from 'tsyringe';

import IRolesRepository from '../repositories/IRolesRepository';
import Role from '../infra/typeorm/entities/Role';

@injectable()
class ListRolesService {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) { }

    public async execute(): Promise<Role[]> {
        const roles = await this.rolesRepository.findAll();

        return roles;
    }
}

export default ListRolesService;
