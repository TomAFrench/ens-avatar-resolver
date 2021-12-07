import fetch from 'isomorphic-fetch';
import { Provider } from '@ethersproject/providers';

const arweaveRegex = new RegExp(/ar:\/\/(.*)/);

const parseURI = (uri: string): string => {
  const result = arweaveRegex.exec(uri);
  if (result === null) throw Error('parsing URI failed');
  const [, transactionId] = result;
  return transactionId;
};

const test = (uri: string): boolean => arweaveRegex.exec(uri) !== null;

const resolve = async (provider: Provider, ensName: string, address: string, uri: string): Promise<string | null> => {
  const transactionId = parseURI(uri);
  const baseUrl = 'https://arweave.net';

  const response = await fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query: `
      {
        transactions(ids: ["${transactionId}"]) {
          edges {
            node {
              id
              owner {
                address
              }
            }
          }
        }
      }
      `,
    }),
  });

  const { data } = await response.json();
  const tx = data.transactions.edges[0].node;

  const response2 = await fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query: `
    {
      transactions(owners: ["${tx.owner.address}"], tags: { name: "Origin", values: ["${tx.id}"] }, sort: HEIGHT_DESC) {
        edges {
          node {
            id
          }
        }
      }
    }
    `,
    }),
  });

  const { data: data2 } = await response2.json();

  if (data2 && data2.transactions.edges.length > 0) {
    return `${baseUrl}/${data2.transactions.edges[0].node.id}`;
  } else {
    return `${baseUrl}/${transactionId}`;
  }
};

export const arweaveResolver = {
  test,
  resolve,
};
