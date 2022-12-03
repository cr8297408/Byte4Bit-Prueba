const { Op } = require('sequelize');

const applyFilters = (filter, name, cond) => {
  if (typeof filter === 'object') {
    for (let i = 0; i < filter.length; i += 1) {
      const condition = { [Op.eq]: filter[i] };
      const obj = {};
      obj[name] = condition;
      cond.push(obj);
    }

    return cond;
  }

  const condition = { [Op.eq]: filter };

  const obj = {};

  obj[name] = condition;

  cond.push(obj);

  return cond;
};

module.exports = {
  applyFilters,
};
