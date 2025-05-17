import { APIkey, NewsAPI_URL } from "../utils/constants";

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
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example.com", _id: "fake-id" },
    });
  });
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

export function saveArticle(article) {
  return new Promise((resolve) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0",
      url: article.url,
      title: article.title,
      imageUrl: article.imageUrl,
    });
  });
}

export function registerUser(userData) {
  return Promise.resolve({ email: userData.email });
}

export const loginUser = authorize;
