export const STORE_STATE = "STORE_STATE";

export function getDataFromLocaleStorage(key) {
  const data = JSON.parse(window.localStorage.getItem(key));
  return data || {};
}

export function removeDataFromlocalStorage() {
  window.localStorage.clear();
}
