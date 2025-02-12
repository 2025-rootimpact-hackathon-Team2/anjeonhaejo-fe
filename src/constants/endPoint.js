export const AUDIO_URL = {
  all: '/audio/all',
  upload: '/audio/upload',
}

export const USER_URL = {
  register: '/user/register',
  logout: '/user/logout',
  login: '/user/login',
}

export const REPORT_URL = {
  create: '/report/create',
  detail: (id) => `/report/show/detail/${id}`,
}

export const WORKLINE_URL = {
  state: '/workline/show/state'
}
