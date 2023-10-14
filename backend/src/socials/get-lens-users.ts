import axios from "axios";

const GITCOIN_SUBGRAPH_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/gundamdweeb/lens-protocol";

export async function fetchGitcoinPassportUsers() {
  const batchSize = 1000;
  let lastUserId = 130000;
  const users = [];

  while (lastUserId) {
    const graphqlQuery = `
        {
          profiles(first: ${batchSize},orderBy: index, orderDirection:desc, where: { index_lt: ${lastUserId} }) {
            id
            creator
            _to
            handle
            totalPosts
            totalComments
            imageURI
            dateCreated
            }
          
        }
      `;

    try {
      const response: any = await axios.post(GITCOIN_SUBGRAPH_ENDPOINT, {
        query: graphqlQuery,
        variables: { lastUserId },
      });
      console.log(
        "🚀 ~ file: index.ts:82 ~ fetchAllUsers ~ response:",
        response.data.errors!
      );

      console.log("response", response.data.data!);

      const userData = response.data.data.tokens;
      if (userData.length === 0) {
        console.log("user done", userData);

        break;
      }

      lastUserId = userData[userData.length - 1].index;

      const transformedUsers = userData.map((user: any) => {
        const { owner: address, id, tokenId, score, ...document } = user;
        return { address, id, tokenId, score, document };
      });
      console.log(
        "🚀 ~ file: index.ts:98 ~ transformedUsers ~ transformedUsers:",
        transformedUsers
      );
      console.log(
        "🚀 ~ file: index.ts:93 ~ fetchAllUsers ~ lastUserId:",
        lastUserId
      );

      users.push(...transformedUsers);
    } catch (error) {
      console.error("Error:", error);
      break;
    }
  }

  return users;
}

fetchGitcoinPassportUsers().then((allUsers) => {
  console.log("All Users:", allUsers.length);
});
