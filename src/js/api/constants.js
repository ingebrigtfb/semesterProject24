
export const API_KEY = import.meta.env.API_KEY;

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_AUCTION_LISTINGS  = `${API_BASE}/auction/listings`;

export const API_AUCTION_SINGLE_LISTING  = `${API_BASE}/auction/listings/<id>`;

