export const GET_MY_WALLET = `
  query GetMyWallet {
    myWallet {
      balance
      currency
      updatedAt
    }
  }
`;
