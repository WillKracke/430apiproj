const users = {};

// Tables copied from official resources
const easy = [25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800,
  1000, 1100, 1250, 1400, 1600, 2000, 2100, 2400, 2800];
const medium = [50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200,
  1600, 2000, 2200, 2500, 2800, 3200, 2900, 4200, 4900, 5700];
const hard = [75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900,
  2400, 3000, 3400, 3800, 4300, 4800, 5900, 6300, 7300, 8500];
const deadly = [100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400,
  2800, 3600, 4500, 5100, 5700, 6400, 7200, 8800, 9500, 10900, 12700];

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;

  return respondJSON(request, response, 201, newUser);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and level are both required',
  };

  if (!body.name || !body.lvl) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].lvl = body.lvl;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const calcEasy = (request, response) => {
  let xp = 0;

  Object.keys(users).forEach((key) => {
    xp += easy[users[key].lvl - 1];
  });

  const jsonResponse = { xp };

  return respondJSON(request, response, 200, jsonResponse);
};

const calcMed = (request, response) => {
  let xp = 0;

  Object.keys(users).forEach((key) => {
    xp += medium[users[key].lvl - 1];
  });

  const jsonResponse = { xp };

  return respondJSON(request, response, 200, jsonResponse);
};

const calcHard = (request, response) => {
  let xp = 0;

  Object.keys(users).forEach((key) => {
    xp += hard[users[key].lvl - 1];
  });

  const jsonResponse = { xp };

  return respondJSON(request, response, 200, jsonResponse);
};

const calcDeadly = (request, response) => {
  let xp = 0;

  Object.keys(users).forEach((key) => {
    xp += deadly[users[key].lvl - 1];
  });

  const jsonResponse = { xp };

  return respondJSON(request, response, 200, jsonResponse);
};

module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
  addUser,
  calcEasy,
  calcMed,
  calcHard,
  calcDeadly,
};
