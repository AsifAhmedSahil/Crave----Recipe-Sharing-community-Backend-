// import { QueryBuilder } from '../../builder/QueryBuilder';
// import { UserSearchableFields } from '../User/user.constant';
// import { User } from '../User/user.model';

// export const SearchItemByUserQueryMaker = async (
//   query: Record<string, unknown>
// ) => {
//   if (query?.searchTerm) {
//     const userQuery = new QueryBuilder(User.find(), query).search(
//       UserSearchableFields
//     );

//     const users = await userQuery.modelQuery;

//     if (users && users.length > 0) {
//       const userIds = users.map((user) => user._id);

//       query['user'] = { $in: userIds };
//       /**
//        * query['user'] = {
//        * $in: [
//        * ObjectId('5f7b3b3b4f3c7b0b3c7b0b3c'),
//        * ObjectId('5f7b3b3b4f3c7b0b3c7b0b3c'),
//        * ]
//        */
//       delete query.searchTerm;
//       return query;
//     }
//   }
// };

// export const SearchItemByDateRangeQueryMaker = async (
//   query: Record<string, unknown>
// ) => {
//   if (query?.from || query?.to) {
//     const dateQuery: Record<string, unknown> = {};

//     if (query.from) {
//       dateQuery['$gte'] = new Date(query.from as string);
//     }

//     if (query.to) {
//       dateQuery['$lte'] = new Date(query.to as string);
//     }

//     if (Object.keys(dateQuery).length > 0) {
//       query['dateFound'] = dateQuery;
//     }

//     delete query.from;
//     delete query.to;
//     return query;
//   }
//   return query;
// };


// src/utils/recipe.utils.ts

import { QueryBuilder } from '../../builder/QueryBuilder';
import { Recipe } from './item.model';


export const SearchRecipesQueryMaker = async (
  query: Record<string, unknown>
) => {
  const searchableFields = ['title', 'description']; // Define searchable fields

  const recipeQuery = new QueryBuilder(Recipe.find(), query)
    .search(searchableFields) // Add search functionality
    .filter() // Filter by user and other fields
    .sort() // Sort by createdAt or other criteria
    .paginate(); // Implement pagination

  return recipeQuery.modelQuery;
};
