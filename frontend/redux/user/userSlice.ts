import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IUsers {
	jwt: {
		access_token: string | undefined
	}
	result: {
		id: number | undefined
		name: string | undefined
		email: string | undefined
		blocked: boolean | undefined
		role: string | undefined
	}
}

const initialState: IUsers = {
	jwt: {
		access_token: undefined,
	},
	result: {
		id: undefined,
		name: undefined,
		email: undefined,
		blocked: undefined,
		role: undefined,
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser(state, action: PayloadAction<IUsers>) {
			state.result.email = action.payload.result.email
			state.result.id = action.payload.result.id
			state.result.name = action.payload.result.name
			state.result.blocked = action.payload.result.blocked
			state.result.role = action.payload.result.role
		},
	},
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer
