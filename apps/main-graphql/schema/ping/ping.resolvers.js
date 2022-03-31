export const resolvers = {
	Query: {
		ping: (_, { message }) => {
			const return_m = message || "Pong";

			return { message: return_m };
		},
	},
};
