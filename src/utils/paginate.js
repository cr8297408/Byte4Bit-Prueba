const paginate = (page, size) => {
  const pageAsNum = Number.parseInt(page, 10);
  const sizeAsNum = Number.parseInt(size, 10);
  let nro = 0;
  if (!Number.isNaN(pageAsNum) && pageAsNum > 0) {
    nro = pageAsNum - 1;
  }

  let sizeNum = 10;
  if (!Number.isNaN(sizeAsNum) && sizeAsNum > 0) {
    sizeNum = sizeAsNum;
  }

  const limit = sizeNum;
  const offset = nro * sizeNum;
  return {
    limit, offset, nro, sizeNum,
  };
};

module.exports = { paginate };
