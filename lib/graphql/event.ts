export const GET_HOME_FEED = `
  query GetHomeFeed($page: Int!) {
    getHomeFeed(page: $page) {
      __typename
      ... on HorizontalEventListBlock {
        index
        title
        events {
          id
          title
          picture
          location
          category
          date
        }
      }
      ... on BigEventCardBlock {
        id
        event {
          id
          title
          picture
          location
          category
          date
        }
      }
    }
  }
`;

export const GET_LAST_ACTUALITIES_COVERS = `
  query GetLastActualitiesCovers($page: Int!) {
    lastActualitiesCovers(page: $page) {
      id
      picture
      user {
        id
        name
        picture
        badge
      }
      isViewed
    }
  }
`;
