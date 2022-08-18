/**
 * category info object
 * @property **category**: name of the category, `file name` = `category name`
 * @property **categoryUrl**: url of the category, same as `/{category}`
 * @property **description**: description of category, extracted from `description.json`
 * @property **color**: color of category, extracted from `description.json`
 * @property **emoji**: emoji of the category, extracted from `description.json`
 * @example
 * const categoryInfo = {
 *      category: "name",
 *      categoryUrl: "/name",
 *      description: "description of category",
 *      color: "color of category, use this property for styling.",
 *      emoji: "✅",
 * }
 */
export interface CategoryInfoType {
    category: string
    description: string
    color: string
    emoji: string
    categoryUrl: string
}
