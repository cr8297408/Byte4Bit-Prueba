const BaseResponse = require('../base-response');

const context = 'HttpResponseGetSuccessful';

class GetSuccessful extends BaseResponse {
  constructor(data) {
    super(200, data, context);
  }
}

module.exports = GetSuccessful;
