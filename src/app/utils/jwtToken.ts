import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'

const generateToken = (
	payload: JwtPayload,
	secret: string,
	expiresIn: string,
) => {
	const tokenSign = jwt.sign(payload, secret, {
		algorithm: 'HS256',
		expiresIn,
	} as SignOptions)
	return tokenSign
}

const verifyToken = (token: string, secret: string) => {
	const decodedToken = jwt.verify(token, secret) as JwtPayload
	return decodedToken
}

export const JWT = {
	generateToken,
	verifyToken,
}
