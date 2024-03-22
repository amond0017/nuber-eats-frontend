import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["./src/**/*.{tsx,ts}", "!src/__generated__/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      overwrite: true,
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
  },
};

export default config;
