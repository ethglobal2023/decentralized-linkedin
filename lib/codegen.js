"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: "talentlayer.graphql",
    generates: {
        "./src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"]
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};
exports.default = config;
