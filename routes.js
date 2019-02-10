/* eslint-disable no-else-return */
// url 정리

// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// user
const USER = "/user";
const USER_DETAIL = "/:id";
const USER_EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// video
const VIDEO = "/video";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const VIDEO_EDIT = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// object
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  userDetail: id => {
    if (id) {
      return `/user/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  userEditProfile: USER_EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  video: VIDEO,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/video/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  videoEdit: id => {
    if (id) {
      return `/video/${id}/edit`;
    } else {
      return VIDEO_EDIT;
    }
  },
  deleteVideo: id => {
    if (id) {
      return `/video/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK
};

export default routes;
