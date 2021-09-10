import jwt_decode from 'jwt-decode'

export default function decodeToken(token) {
    const accessToken = token
    const decoded = jwt_decode(accessToken)

    return decoded
}