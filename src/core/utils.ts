export const getHostFromRawHeaders = (rawHeaders: string[] = []): string | null => {
  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (rawHeaders[i].toLowerCase() === 'host') {
      return rawHeaders[i + 1].toLowerCase();
    }
  }
  return null;
};