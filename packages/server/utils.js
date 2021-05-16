const snakeCaseToCamel = (str) => str.replace(/([-_][a-z])/g,group => group.toUpperCase().replace('-','').replace('_', '')) 


const convertObjToCamelCase = (object) => {
    let newObj = {}
    Object.keys(object).forEach(key => {
        const camelCaseProp = snakeCaseToCamel(key.toLowerCase())
        newObj[`${camelCaseProp}`] = object[key]
    })
    return newObj;
}


const convertArrayToCamelCase = (arr) => {
    return arr.map(convertObjToCamelCase)
} 

module.exports = {convertArrayToCamelCase, convertObjToCamelCase, snakeCaseToCamel }