
export function isValidXtreamUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const { queryParams } = extractBaseUrlAndParams(url);
    return !!(queryParams.username && queryParams.password);
  } catch {
    return false;
  }
}
export function extractBaseUrlAndParams(
  fullUrl: string
): { baseUrl: string; queryParams: Record<string, string> } {
  // Convert https to http if needed
  const sanitizedUrl = fullUrl.startsWith('https')
    ? fullUrl.replace('https', 'http')
    : fullUrl;

  // Split the URL into base URL and query string
  const [baseUrl, queryString] = sanitizedUrl.split("?");

  // Parse query parameters into a key-value object
  const queryParams: Record<string, string> = queryString
    ? Object.fromEntries(
      queryString.split("&").map((param) => {
        const [key, value] = param.split("=");
        return [key, decodeURIComponent(value || "")];
      })
    )
    : {};

  return { baseUrl, queryParams };
}

export function constructLiveStreamUrl(
  fullUrl: string,
  streamId: string,
  template: string = '{baseUrl}/live/{username}/{password}/{stream_id}.ts',
): string {
  const { baseUrl, queryParams } = extractBaseUrlAndParams(fullUrl);

  const username = queryParams["username"];
  const password = queryParams["password"];

  if (!username || !password) {
    throw new Error("Missing 'username' or 'password' in the provided URL.");
  }

  return template
    .replace("{baseUrl}", baseUrl.replace("/get.php", ""))
    .replace("{username}", username)
    .replace("{password}", password)
    .replace("{stream_id}", streamId);
}

export function constructModifiedUrl(
  fullUrl: string,
  action: string,
  streamId?: string
): string {
  const { baseUrl, queryParams } = extractBaseUrlAndParams(fullUrl);

  const username = queryParams["username"];
  const password = queryParams["password"];

  if (!username || !password) {
    throw new Error("Missing 'username' or 'password' in the provided URL.");
  }

  return `${baseUrl.replace("/get.php", "")}/player_api.php?username=${username}&password=${password}&action=${action}${streamId ? `&vod_id=${streamId}` : ""
    }`;
}

export function constructSeriesUrl(
  fullUrl: string,
  action: string,
  seriesId?: string
): string {
  const { baseUrl, queryParams } = extractBaseUrlAndParams(fullUrl);

  const username = queryParams["username"];
  const password = queryParams["password"];

  if (!username || !password) {
    throw new Error("Missing 'username' or 'password' in the provided URL.");
  }

  return `${baseUrl.replace("/get.php", "")}/player_api.php?username=${username}&password=${password}&action=${action}${seriesId ? `&series_id=${seriesId}` : ""
    }`;
}
