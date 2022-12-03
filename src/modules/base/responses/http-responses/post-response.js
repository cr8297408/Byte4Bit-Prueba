const BaseResponse = require('../base-response');

const context = 'HttpResponsePostSuccessful';

class PostSuccessful extends BaseResponse {
  constructor(data) {
    super(201, data, context);
  }
}

module.exports = PostSuccessful;
