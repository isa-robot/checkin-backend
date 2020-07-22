import { inject, injectable } from 'tsyringe';

import Resource from '../infra/typeorm/entities/Resource';
import IResourcesRepository from '../repositories/IResourcesRepository';

@injectable()
class ListResourcesService {
    constructor(
        @inject('ResourcesRepository')
        private resourcesRepository: IResourcesRepository,
    ) { }

    public async execute(): Promise<Resource[]> {
        const resources = await this.resourcesRepository.findAll();

        return resources;
    }
}

export default ListResourcesService;
