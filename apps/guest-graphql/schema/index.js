import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

// https://www.graphql-tools.com/docs/schema-merging
const typesArray = loadFilesSync(path.join(__dirname, "./**/*.graphql"));
const typeDefs = mergeTypeDefs(typesArray);

// have to roll our own dynamic import for the resolvers because
// https://github.com/ardatan/graphql-tools/issues/1750

import { globbySync } from "globby"; // already required by graphql-tools
const fileList = globbySync("./**/*.resolvers.js", {
	absolute: false,
	onlyFiles: true,
	cwd: __dirname,
});

const resolversArray = [];
for (const resolverPath of fileList) {
	// need the leading dot for relative import
	const relative_path = `./${ resolverPath }`;

	const module_r = await import(relative_path);
	resolversArray.push(module_r.resolvers);
}

const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
