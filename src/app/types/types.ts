type AuthResponse = {
	accessToken: string
	refreshToken: string
	id: number
	email: number
	name: string
	profileImage: string
}

export type Query = {
	verifyGoogleToken(token: string): AuthResponse
}
