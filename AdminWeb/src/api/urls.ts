const urls: any = {
  AdminLogin: "/admin/login",
  getUserInfo: "/admin/info",
  createCard: "/admin/card/create",
  getCategories: "/admin/getCategories",
  createCategory: "/admin/category/create",
};
export default function (url: any): string {
  if (typeof urls[url] === "function") {
    return urls[url];
  }

  const env = JSON.parse(JSON.stringify(process.env));
  const prefix = env.NODE_ENV === "development" ? env.HOST_DEV : env.HOST_PROD;
  return prefix + urls[url];
}
export function defaultURL() {
  const env = JSON.parse(JSON.stringify(process.env));
  return env.NODE_ENV === "development" ? env.HOST_DEV : env.HOST_PROD;
}
export function getProcess(): any {
  return JSON.parse(JSON.stringify(process.env));
}
