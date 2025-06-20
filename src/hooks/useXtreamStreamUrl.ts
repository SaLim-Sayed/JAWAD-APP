// hooks/useXtreamStreamUrl.ts
export const useXtreamStreamUrl = (
  fullUrl: string,
  streamId: string,
): string => {
  try {
    const url = new URL(fullUrl);
 

    const baseUrl = fullUrl.split('/get.php')[0]; // remove /get.php and everything after
    const username = url.searchParams.get('username');
    const password = url.searchParams.get('password');

    if (!username || !password || !streamId) return '';

    return `${baseUrl}/live/${username}/${password}/${streamId}.ts`;
  } catch (error) {
    console.warn('Invalid URL provided to useXtreamStreamUrl');
    return '';
  }
};
