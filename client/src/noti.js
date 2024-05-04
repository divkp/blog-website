export const API_NOTIFICATIONS = {
  loading: {
    title: "Loading...",
    msg: "Data being loaded please wait",
  },
  success: {
    title: "Success",
    msg: "Data loaded successfully",
  },
  responsefailure: {
    title: "Error",
    msg: "error while fetching data",
  },
  requestfailure: {
    title: "Error",
    msg: "request not send",
  },
  networkerror: {
    title: "Error",
    msg: "not able to connect",
  },
};

export const API_CALLS = {
  usersignup: { url: "/signup", method: "POST" },
  userlogin: { url: "/login", method: "POST" },
  uploadImage: { url: "file/upload", method: "POST" },
  createpost: { url: "create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPost: { url: "/post", method: "GET", query: true },
  updatePost: { url: "/update", method: "PUT", query: true },
  deletePost: { url: "/delete", method: "DELETE", query: true },
  Addcomment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comment", method: "GET", query: true },
  deleteComment: { url: "/deletecomment", method: "DELETE", query: true },
};
