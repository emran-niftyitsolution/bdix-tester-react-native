export async function fetchUrl(targetUrl: string) {
  if (!targetUrl) {
    return {
      error: "URL parameter is required",
      status: false,
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 100);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      // No 'mode' option in React Native fetch
    });

    clearTimeout(timeoutId);

    return {
      status: response.ok,
      error: null,
    };
  } catch (error: any) {
    return {
      error: error.message || "An error occurred",
      status: false,
    };
  }
}
