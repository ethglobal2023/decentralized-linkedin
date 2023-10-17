import axios from "axios";

export const processGraphqlRequest = async (
  url: string,
  query: string,
  variables: any,
): Promise<any> => {
  try {
    return axios.post(url, { query, variables });
  } catch (err) {
    console.error(err);
    return null;
  }
};
