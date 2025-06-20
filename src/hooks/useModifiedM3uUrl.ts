export const modifyM3uUrl = (
  originalUrl: string,
  actionValue: string,
): string => {
  try {
    const url = new URL(originalUrl);

    // Direct replace get.php to player_api.php if exists
    if (url.pathname.endsWith('/get.php') || url.pathname === '/get.php') {
      url.pathname = url.pathname.replace('get.php', 'player_api.php');
    }
    
    // Remove unwanted params
    url.searchParams.delete('type');
    url.searchParams.delete('output');

    // Add action param
    url.searchParams.set('action', actionValue);

    return url.toString();
  } catch (err) {
    console.error('❌ Invalid URL:', originalUrl, err);
    return originalUrl;
  }
};
