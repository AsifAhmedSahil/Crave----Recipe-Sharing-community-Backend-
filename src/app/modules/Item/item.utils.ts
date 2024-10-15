

import { QueryBuilder } from '../../builder/QueryBuilder';
import { Recipe } from './item.model';


export const SearchRecipesQueryMaker = async (
  query: Record<string, unknown>
) => {
  const searchableFields = ['title', 'description']; 

  const recipeQuery = new QueryBuilder(Recipe.find(), query)
    .search(searchableFields)
    .filter() 
    .sort()
    .paginate(); 

  return recipeQuery.modelQuery;
};
