import { APIkey, NewsAPI_URL, BASE_URL } from "../utils/constants";

export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "a fake token" });
  });
};

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// getNewsArticles
export function getNewsArticles(searchTerm) {
  console.log("Fetching from:", NewsAPI_URL);
  console.log("API Key:", APIkey);
  return request(`${NewsAPI_URL}/everything?q=${searchTerm}&apiKey=${APIkey}`, {
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

export function saveArticle(article, token) {
  console.log({ article, token });
  const { title, content, urlToImage } = article;

  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, urlToImage }),
  }).then(checkResponse);
}

// export function saveArticle(article) {
//   return new Promise((resolve) => {
//     resolve({
//       _id: "65f7371e7bce9e7d331b11a0",
//       ...article,
//       // url: article.url,
//       // title: article.title,
//       // imageUrl: article.imageUrl,
//       // publishedAt: article.publishedAt,
//     });
//   });
// }

export const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export function registerUser(userData) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
}
