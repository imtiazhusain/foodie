// Create a function to get the directory name from the current module URL
function getDirname(metaUrl, path) {
  // Decode the pathname to handle URL-encoded characters
  const pathname = decodeURIComponent(new URL(metaUrl).pathname);

  // On Windows, paths start with a slash that should not be there, so we remove it
  const isWindows = process.platform === "win32";
  return isWindows ? path.dirname(pathname.slice(1)) : path.dirname(pathname);
}

export default getDirname;
