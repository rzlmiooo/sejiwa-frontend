// roles.js
export const ROLES = {
  ADMIN: 'admin',
  KONSELOR : 'konselor',
  PELAJAR: 'pelajar',
  GUEST: 'guest',
};

export const permissions = {
  [ROLES.ADMIN]: ['home', 'users', 'settings'],
  [ROLES.PELAJAR]: ['home','/home/assessment','/home/recommendation','/home/find-konselor','/home/profile','/home/chat','/home/settings'],
  [ROLES.KONSELOR]:['/konselor','/konselor/manage-schedule',''],
  [ROLES.GUEST]: [],
};
