const excludedParams = ["perPage", "startPage", "minPrice", "maxPrice", "sort", "q", "startYear", "endYear"];

module.exports = function filterParser(filtersQueryString) {
  const mongooseQuery = {};

  if (filtersQueryString.minPrice || filtersQueryString.maxPrice) {
    mongooseQuery.currentPrice = {
      $gte: Number(filtersQueryString.minPrice),
      $lte: Number(filtersQueryString.maxPrice)
    };
  }

  if (filtersQueryString.startYear || filtersQueryString.endYear) {
    mongooseQuery.yearOfPublication = {
      $gte: new Date(filtersQueryString.startYear),
      $lte: new Date(filtersQueryString.endYear)
    };
  }


  return Object.keys(filtersQueryString).reduce(
    (mongooseQuery, filterParam) => {
      if (filtersQueryString[filterParam].includes(",")) {
        mongooseQuery[filterParam] = {
          $in: filtersQueryString[filterParam]
            .split(",")
            .map(item => decodeURI(item))
        };
      } else if (!excludedParams.includes(filterParam)) {
        mongooseQuery[filterParam] = decodeURI(filtersQueryString[filterParam]);
      }

      return mongooseQuery;
    },
    mongooseQuery
  );
};
