const boom = require('@hapi/boom');
const { getData } = require('../../utils/get-data-token');
const { paginate } = require('../../utils/paginate');
const { GetSuccessful, PostSuccessful } = require('./responses/http-responses');

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll(
    where,
    page,
    size,
    includeModel,
  ) {
    try {
      let records;

      if (!includeModel) {
        const { limit, offset } = paginate(page, size);

        records = await this.model.findAndCountAll({
          where,
          limit,
          offset,
        });

        return new GetSuccessful(records);
      }
      const { limit, offset } = paginate(page, size);

      records = await this.model.findAndCountAll({
        where,
        limit,
        offset,
        include: includeModel,
      });

      return new GetSuccessful(records);
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  async getOne(
    where,
    includeModel,
  ) {
    try {
      let record;

      if (!includeModel) {
        record = await this.model.findOne({
          where,
        });
      } else {
        record = await this.model.findOne({
          where,
          include: includeModel,
        });
      }

      if (!record) throw boom.notFound('Not found');

      return new GetSuccessful(record);
    } catch (e) {
      throw boom.badRequest(e);
    }
  }

  async create(body, include) {
    try {
      if (include) {
        const record = await this.model.create(body, { include });

        return new PostSuccessful(record);
      }
      const record = await this.model.create(body);
      return new PostSuccessful(record);
    } catch (e) {
      throw boom.badRequest(e);
    }
  }
  // TODO: NEED UPDATE AND DELETE?
  // async update(tenantId, body, where) {
  //   try {
  //     body.updatedAt = moment();
  //     const free = tenantId.split('_');

  //     const tenantName = getTenantName(tenantId);

  //     free[0] === 'free'  (where.tenantId = free[1]) : where;

  //     const registerUpdated = await this.model.update(body, {
  //       where,
  //     });

  //     if (registerUpdated[0] === 0) {
  //       throw boom.badRequest('register no exists');
  //     }

  //     return new putSuccessful('Record update successfully');
  //   } catch (e) {
  //     throw boom.badRequest(e);
  //   }
  // }

  // async delete(
  //   where,
  // ) {
  //   try {
  //     const record = await this.model.findOne({
  //       where,
  //     });

  //     if (!record) throw boom.notFound('Not found');

  //     await record.destroy();
  //     return new deleteSuccessful('record deleted successfully');

  //   } catch (e) {
  //     throw boom.badRequest(e);
  //   }
  // }
}

module.exports = BaseService;
