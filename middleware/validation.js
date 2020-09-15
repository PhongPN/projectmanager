import Ajv from 'ajv';
const ajv = new Ajv();
export const validation = async(data, schema) => {
  try {
    var valid = ajv.validate(schema, data);
    if(!valid){
      return false;
    }
    else{
      return true;
    }
  } catch (error) {
    return false;
  }
};