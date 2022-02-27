export const handlebarsHelpers = {
    equals: (a: any, b: any): boolean => a === b,
    isNotInArray: (arr: any[], el: any): boolean => !arr.includes(el),
    isInArray: (arr: any[], el: any): boolean => arr.includes(el),
}