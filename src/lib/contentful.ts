type EnvironmentEntry = {
  // This is the display name of the environment in Contentful.
  name: string;
  sys: {
    type: string;
    // This id is the environment alias if there is any. Otherwise, its the same as name.
    id: string;
  };
};

/**
 * Retrieves the list of Contentful environment ids.
 * The ids are either the regular display name or the enviroment alias id whenever configured.
 * 
 * @returns An array of environment ids.
 */
export const getContentfulEnvs = async () => {
  try {
    const response = await fetch(
      `https://api.contentful.com/spaces/${
        import.meta.env.CONTENTFUL_SPACE_ID
      }/environments?access_token=${import.meta.env.CONTENTFUL_APP_SECRET}`,
      {
        headers: {
          Authentication: `Bearer ${import.meta.env.CONTENTFUL_APP_SECRET}`,
        },
      }
    );
    const data = await response.json();
    const environmentIds: string[] = data.items.map(
      (entry: EnvironmentEntry) => entry.sys.id
    );
  
    return environmentIds;
  } catch (err) {
    // TODO: Log error somewhere
    return [];
  }
};
