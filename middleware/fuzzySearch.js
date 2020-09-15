// import FuzzySearch from 'fuzzy-search';

// const Search = (object, key, value, page, limit) => {
//     const searcher = new FuzzySearch(object, [key], {
//         caseSensitive: true,
//     });
//     const result = searcher.search(`${value}`);
//     let start = (page - 1) * limit;
//     let end = page * limit;
//     console.log(start)
//     console.log(end)
//     return result.slice(start, end);
// }
export const Search = async (object, property, value, page, limit) => {
  let start = (page - 1) * limit;
  let end = page * limit;

  const result = await object.find({ [property]: { $regex: `.*${value}.*`, $options: 'i' } }, property)
    .skip(start)
    .limit(end);

  return result;
};