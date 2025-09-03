const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const USER_ACCOUNT_ENDPOINTS = {

    Login: `${BASE_URL}/api/v1/UserAccout/Login`,
    Register: `${BASE_URL}/api/v1/UserAccout/Register`,
    GoogleSignIn: `${BASE_URL}/api/v1/UserAccout/GoogleSignIn`

   
}

export const MENU_ENDPOINTS ={
    Menus : `${BASE_URL}/api/v1/MenuBuilder/Menus`
}

export const ROLE_ENDPOINT = {

    Roles : `${BASE_URL}/api/v1/Role/GetAllRoles`,
    RoleWithPrivilege:`${BASE_URL}/api/v1/Role/GetRole_Privilege`,
    UpdateRole: `${BASE_URL}/api/v1/Privilege/AssignRoletoPrivilages`,
    DeleteRole: `${BASE_URL}/api/v1/Role/DeleteRole`,
    CreateRole: `${BASE_URL}/api/v1/Role/CreateRole`,

}

export const PRIVILEGE_ENDPOINTS = {
    All: `${BASE_URL}/api/v1/Privilege/GetAllPrivileges`
}
