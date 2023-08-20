type Types = import('mongoose').Types

type Account = {
	_id: Types.ObjectId
	userId: Types.ObjectId
	type: string
	provider: string
	providerAccountId: string
	id_token: string
	access_token: string
	refresh_token: string
	token_type: string
	scope: string
	session_state: string
	expires_at: number
}

type Line = {
	_id: Types.ObjectId
	userId: Types.ObjectId
	verseId: Types.ObjectId
	body: string
	media: string
	readIds: Types.ObjectId[]
	createdAt: Date
}

type User = {
	_id: Types.ObjectId
	name: string
	email: string
	emailVerified: string
	password: string
	image: string
	verseIds: Types.ObjectId[]
}

type Verse = {
	_id: Types.ObjectId
	userIds: Types.ObjectId[]
	latestLineId: Types.ObjectId
	group: boolean
	subject: string
}

type VerseExpanded = Verse & {
	users: User[]
	latestLine: Line
}

type VerseExpandedWithLines = VerseExpanded & {
	lines: Line[]
}
