class BaseResponse {
  constructor(status, data, context) {
    this.status = status;
    this.data = data;
    this.context = context;
  }

  getObject() {
    return this;
  }

  /**
   * @description get the status for responses in controllers and validations
   * @return {this.status}
   */
  getStatus() {
    return this.status;
  }

  /**
   * @description get data for send to client
   * @return {object<this.status, this.context, this.data>}
   */
  getData() {
    return {
      status: this.status,
      context: this.context,
      data: this.data,
    };
  }
}

module.exports = BaseResponse;
