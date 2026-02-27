const shouldUseStaticExportPaths = process.env.STATIC_EXPORT === "true";

export function toInternalHref(href: string): string {
  if (!shouldUseStaticExportPaths || !href.startsWith("/") || href === "/") {
    return href;
  }

  const [pathAndQuery, hashFragment = ""] = href.split("#", 2);
  const [path, queryString = ""] = pathAndQuery.split("?", 2);

  if (path.endsWith("/") || path.includes(".")) {
    return href;
  }

  const withTrailingSlash = `${path}/`;
  const withQuery = queryString ? `${withTrailingSlash}?${queryString}` : withTrailingSlash;
  return hashFragment ? `${withQuery}#${hashFragment}` : withQuery;
}
