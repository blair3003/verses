type Doc = import('mongoose').Document
type Types = import('mongoose').Types

type Account = Doc & {
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

type Line = Doc & {
	userId: Types.ObjectId
	verseId: Types.ObjectId
	body: string
	media: string
	readIds: Types.ObjectId[]
}

type Session = import('next-auth').Session & {
    user: User
}

type User = Doc & {
	name: string
	email: string
	emailVerified: string
	password: string
	image: string
	verseIds: Types.ObjectId[]
}

type Verse = Doc & {
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
