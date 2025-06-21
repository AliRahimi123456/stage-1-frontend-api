import { APIkey, NEWSAPI_URL, BASE_URL } from "./constants";

export function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Error: ${res.status}`));
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const checkToken = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

// getNewsArticles
export function getNewsArticles(searchTerm) {
  console.log("Fetching from:", NEWSAPI_URL);
  console.log("API Key:", APIkey);
  return request(`${NEWSAPI_URL}/everything?q=${searchTerm}&apiKey=${APIkey}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": APIkey,
    },
  });
}

export function deleteArticle(articleId, token) {
  console.log({ articleId, token });
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
export function getArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
export function saveArticle(article, token) {
  console.log({ article, token });
  const { title, content, urlToImage, url, keyword } = article;

  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, urlToImage, url, keyword }),
  }).then(checkResponse);
}

export const loginUser = ({ email, password }) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

export function registerUser(userData) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
}
