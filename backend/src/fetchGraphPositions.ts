import { GraphQLClient, gql } from "graphql-request";

const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/voltzprotocol/v1";
const client = new GraphQLClient(SUBGRAPH_URL);

export async function fetchPositions() {
  const query = gql`
    {
      positions(first: 100) {
        id
        tickLower {
          value
        }
        tickUpper {
          value
        }
        margin
        owner {
          id
        }
        amm {
          id
          marginEngineAddress
        }
      }
    }
  `;

  const response = await client.request(query);

  console.log(`Positions fetched: ${response.positions}`);

  return response.positions;
}
