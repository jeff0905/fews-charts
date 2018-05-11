/**
 * TODO: move the http request header to config.js....
 */
export const Origin = 'X-Origin' // 渠道..
export const TOKEN = 'X-User-Token'
export const MOBILE = 'X-User-Mobile'
export const PRODUCT_CODE = 'X-Product-Code'
export const SOURCE_ID = 'X-Source-Id'
export const PARTNER_CODE = 'X-Partner-Code'
export const USER_IDENTITY = 'X-User-Identity'
export const USER_IDENTITY2 = 'X-User-Identity2'
export const ROCKET = 'jrocket2'

export const headerName = {
  channel: Origin,
  mobile: MOBILE,
  token: TOKEN,
  product_code: PRODUCT_CODE,
  source_id: SOURCE_ID,
  partner_code: PARTNER_CODE,
  user_identity: USER_IDENTITY,
  // rocket: ROCKET
}

export const EVERY_HEADERS = ['X-Product-Code', 'X-Origin']
