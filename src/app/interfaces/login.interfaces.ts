export interface Redirect {
  state?: string,
  code?: string,
  error?: string
}
export interface Token {
  access_token:	string,
  token_type:	string,
  scope:	string,
  expires_in:	number,
  refresh_token:	string
}
export interface RefreshToken {
  access_token:	string,
  token_type:	string,
  scope:	string,
  expires_in:	number
}