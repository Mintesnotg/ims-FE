const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const USER_ACCOUNT_ENDPOINTS = {

    Login: `${BASE_URL}/api/v1/UserAccout/Login`,
    Register: `${BASE_URL}/api/v1/UserAccout/Register`


}

export const MENU_ENDPOINTS ={
    Menus : `${BASE_URL}/api/v1/MenuBuilder/Menus`
}
