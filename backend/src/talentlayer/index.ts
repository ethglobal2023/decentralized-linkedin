import axios from "axios";

const TALENLAYER_SUBGRAPH_ENDPOINT =
  "https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon";

const graphqlQuery = `
{
    users {
      id
      address
      numReviews
      handle
      rating
      description {
        country
        headline
        skills_raw
          title
        role
        timezone
        name
        image_url
       
      }
    }
  }`;

export async function fetchAllUsers() {
  const batchSize = 1000;
  let lastUserId = 14200;
  const users = [];

  while (lastUserId < 15000) {
    const graphqlQuery = `
        {
          users(first: ${batchSize},orderBy: index, orderDirection:desc, where: { index_lt: ${lastUserId} }) {
            id
            address
            cid
            numReviews
            handle
            rating
            description {
            country
            headline
            skills_raw
            title
            role
            timezone
            name
            image_url
       
             }
          }
        }
      `;

    try {
      const response: any = await axios.post(TALENLAYER_SUBGRAPH_ENDPOINT, {
        query: graphqlQuery,
        variables: { lastUserId },
      });
      console.log(
        "🚀 ~ file: index.ts:82 ~ fetchAllUsers ~ response:",
        response.data.errors!
      );

      const userData = response.data.data.users;
      if (userData.length === 0) {
        console.log("user done", userData);

        break;
      }

      lastUserId = userData[userData.length - 1].id;

      const transformedUsers = userData.map((user: any) => {
        const { address, id, cid, ...document } = user;
        return { address, id, cid, document };
      });
      console.log(
        "🚀 ~ file: index.ts:98 ~ transformedUsers ~ transformedUsers:",
        transformedUsers
      );
      console.log(
        "🚀 ~ file: index.ts:93 ~ fetchAllUsers ~ lastUserId:",
        lastUserId
      );

      users.push(...userData);
    } catch (error) {
      console.error("Error:", error);
      break;
    }
  }

  return users;
}

fetchAllUsers().then((allUsers) => {
  console.log("All Users:", allUsers.length);
});
