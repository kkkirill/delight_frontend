import queryString from 'query-string';

export const GET = (baseUrl, params, token) => {
  const url = `${baseUrl}${params ? '?' : ''}${queryString.stringify(params)}`;
  const headers = {};

  if(token) {
    headers['Authorization'] = 'Token ' + token
  }

  return fetch(url, {method: 'GET', headers});
};

export const POST = (url, body, token, formData, params) => {
  const headers = formData ? {
    'Accept': 'application/json'
  } : {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if(token) {
    headers['Authorization'] = 'Token ' + token
  }

  const finalBody = formData ? body : JSON.stringify(body);

  return fetch(url, {
    method: 'POST',
    body: finalBody,
    headers,
  });
};

export const PUT = (url, body, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if(token) {
    headers['Authorization'] = 'Token ' + token
  }

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers,
  });
};

export const DELETE = (url, token) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', token);

  return fetch(url, {
    method: 'DELETE', headers: {
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};