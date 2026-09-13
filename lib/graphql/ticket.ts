export const GET_MY_TICKETS = `
  query GetMyTickets($fetchAll: Boolean, $used: Boolean, $page: Int!) {
    myTickets(fetchAll: $fetchAll, used: $used, page: $page) {
      id
      ownerName
      ownerPhone
      ownerEmail
      selfPurchase
      createdAt
      scan {
        createdAt
      }
      event {
        id
        title
        picture
        location
        date
        price
      }
    }
  }
`;

export const GET_TICKET_DETAILS = `
  query GetTicketDetails($id: ID!) {
    ticket(id: $id) {
      id
      ownerName
      ownerPhone
      ownerEmail
      selfPurchase
      createdAt
      scan {
        createdAt
      }
      event {
        id
        title
        picture
        location
        category
        date
        price
      }
    }
  }
`;

export const GET_TICKET_CODE = `
  query GetTicketCode($id: ID!) {
    ticketCode(id: $id)
  }
`;
