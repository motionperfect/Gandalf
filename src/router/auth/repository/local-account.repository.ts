import { EntityRepository, Repository } from 'typeorm';

import { LocalAccountEntity } from '.';

@EntityRepository(LocalAccountEntity)
export class LocalAccountRepository extends Repository<LocalAccountEntity> {}
