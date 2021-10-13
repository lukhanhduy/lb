import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Device} from '../models';
import {DeviceRepository} from '../repositories';

export class DeviceController {
  constructor(
    @repository(DeviceRepository)
    public deviceRepository: DeviceRepository,
  ) { }

  @post('/devices')
  @response(200, {
    description: 'Devices model instance',
    content: {'application/json': {schema: getModelSchemaRef(Device)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {
            title: 'NewDevices',
            exclude: ['id'],
          }),
        },
      },
    })
    devices: Omit<Device, 'id'>,
  ): Promise<Device> {
    return this.deviceRepository.create(devices);
  }

  @get('/devices/count')
  @response(200, {
    description: 'Devices model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Device) where?: Where<Device>,
  ): Promise<Count> {
    return this.deviceRepository.count(where);
  }

  @get('/devices')
  @response(200, {
    description: 'Array of Devices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Device, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Device) filter?: Filter<Device>,
  ): Promise<Device[]> {
    return this.deviceRepository.find(filter);
  }

  @patch('/devices')
  @response(200, {
    description: 'Devices PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    devices: Device,
    @param.where(Device) where?: Where<Device>,
  ): Promise<Count> {
    return this.deviceRepository.updateAll(devices, where);
  }

  @get('/devices/{id}')
  @response(200, {
    description: 'Devices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Device, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Device, {exclude: 'where'}) filter?: FilterExcludingWhere<Device>
  ): Promise<Device> {
    return this.deviceRepository.findById(id, filter);
  }

  @patch('/devices/{id}')
  @response(204, {
    description: 'Devices PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    devices: Device,
  ): Promise<void> {
    await this.deviceRepository.updateById(id, devices);
  }

  @put('/devices/{id}')
  @response(204, {
    description: 'Devices PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() devices: Device,
  ): Promise<void> {
    await this.deviceRepository.replaceById(id, devices);
  }

  @del('/devices/{id}')
  @response(204, {
    description: 'Devices DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deviceRepository.deleteById(id);
  }
}
