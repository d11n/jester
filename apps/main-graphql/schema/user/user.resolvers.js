export const resolvers = {
	Query: {
		fetchCurrentUser(parent, args, context, info) {
			return {
				id: "fakeid-1234",
				phoneNumber: "+18005551212",
				email: "fakeid@example.com",
			};
		},
	},
};
