export const config = {
  name: "lucid", // app name should NOT contain "-"
  logo: "https://bafybeifozdhcbbfydy2rs6vbkbbtj3wc4vjlz5zg2cnqhb2g4rm2o5ldna.ipfs.w3s.link/dataverse.svg",
  website: ["http://localhost:3867"], // you can use localhost:(port) for testing
  defaultFolderName: "Main",
  description:
    "Your ultimate dream companion for recording, exploring, and enhancing your journey through the realm of dreams.",
  models: [
    {
      isPublicDomain: false, // default
      schemaName: "dream.graphql",
      encryptable: ["text", "image"], // strings within the schema and within the array represent fields that may be encrypted, while fields within the schema but not within the array represent fields that will definitely not be encrypted
    },
    {
      isPublicDomain: true,
      schemaName: "profile.graphql",
      encryptable: [],
    },
  ],
  ceramicUrl: null, // leave null to use dataverse test Ceramic node. Set to {Your Ceramic node Url} for mainnet, should start with "https://".
};
