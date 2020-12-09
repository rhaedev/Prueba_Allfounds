import {DefaultCrudRepository} from '@loopback/repository';
import {New, NewRelations} from '../models';
import {ApiDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NewRepository extends DefaultCrudRepository<
  New,
  typeof New.prototype.id,
  NewRelations
> {
  constructor(
    @inject('datasources.api') dataSource: ApiDataSource,
  ) {
    super(New, dataSource);
  }
}
