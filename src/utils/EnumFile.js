export const StatusEnum = {
  ERROR : 'error',
  SUCCESS : 'success',
  IDLE : "idle",
  LOADING : "loading",
  SUCCEEDED : "succeeded",
  FAILED : "failed",
  FULFILLED : "fulfilled"
}

export const RoutePaths = {
  MAIN : '/',
  USERS_LIST : '/users',
  USER_PROFILE : '/users/:id',
  COMPANIES_LIST : '/companies',
  ACCOUNT_MAIN : '/account',
  ACCOUNT_PROFILE : '/account/profile',
  ACCOUNT_COMPANIES : '/account/companies',
  COMPANY_PROFILE : `/company/:companyId`,
  COMPANY_INFO : `company_info`,
  COMPANY_USERS : 'company_users',
  COMPANY_QUIZES : 'quizes',
}

export const ModalActionType = {
  Delete : "delete",
  Create : "create",
  Edit : "edit",
  ConfirmAvatar : "confirmAvatar",
  Leave : "leave",
}