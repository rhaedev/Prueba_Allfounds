import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {New} from '../models';
import {NewRepository} from '../repositories';

export class NewsController {
  constructor(
    @repository(NewRepository)
    public newRepository : NewRepository,
  ) {}

  @post('/news', {
    responses: {
      '200': {
        description: 'New model instance',
        content: {'application/json': {schema: getModelSchemaRef(New)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(New, {
            title: 'NewNew',
            
          }),
        },
      },
    }) newNew: New,
  ): Promise<New> {
    return this.newRepository.create(newNew);
  }

  @get('/news/count', {
    responses: {
      '200': {
        description: 'New model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(New) where?: Where<New>,
  ): Promise<Count> {
    return this.newRepository.count(where);
  }

  @get('/news', {
    responses: {
      '200': {
        description: 'Array of New model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(New, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(New) filter?: Filter<New>,
  ): Promise<New[]> {
    return this.newRepository.find(filter);
  }

  @patch('/news', {
    responses: {
      '200': {
        description: 'New PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(New, {partial: true}),
        },
      },
    })
    newNew: New,
    @param.where(New) where?: Where<New>,
  ): Promise<Count> {
    return this.newRepository.updateAll(newNew, where);
  }

  @get('/news/{id}', {
    responses: {
      '200': {
        description: 'New model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(New, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(New, {exclude: 'where'}) filter?: FilterExcludingWhere<New>
  ): Promise<New> {
    return this.newRepository.findById(id, filter);
  }

  @patch('/news/{id}', {
    responses: {
      '204': {
        description: 'New PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(New, {partial: true}),
        },
      },
    })
    newNew: New,
  ): Promise<void> {
    await this.newRepository.updateById(id, newNew);
  }

  @put('/news/{id}', {
    responses: {
      '204': {
        description: 'New PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() newNew: New,
  ): Promise<void> {
    await this.newRepository.replaceById(id, newNew);
  }

  @del('/news/{id}', {
    responses: {
      '204': {
        description: 'New DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.newRepository.deleteById(id);
  }
}
