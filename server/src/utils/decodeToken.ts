import { decode, verify } from 'jsonwebtoken'

function decodeToken(token: string): any {
  return decode(token)
}
export { decodeToken }
