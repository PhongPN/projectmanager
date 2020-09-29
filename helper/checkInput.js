const status = ['active', 'inactive'];

export const checkStatus = (data) => {
  if (status.includes(data)) {
    return true;
  }

  return false;
};

export const checkNumber = (...data) => {
  for (let i = 0; i < data.length; i++) {
    if (Number(data[i])) {
      return true;
    }
  }

  return false;
};

export const checkNull = (...data) => {
  for (let i = 0; i < data.length; i++) {

    if (!data[i]) {
      return true;
    }
  }

  return false;
};

export const checkArray = (reqBody, reqDb) => {
  if (reqBody.length !== reqDb.length) {
    return false;
  }

  return true;
};