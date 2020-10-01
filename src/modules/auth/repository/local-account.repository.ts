import { EntityRepository, Repository } from 'typeorm';

import { LocalAccountEntity } from './local-account.entity';

@EntityRepository(LocalAccountEntity)
export class LocalAccountRepository extends Repository<LocalAccountEntity> {}
