function path(root: any, sublink: any) {
  return `${root}${sublink}`
}
export function generateQuery(
  subPath: string,
  queryArray: { key: string | undefined; value: string | undefined }[]
) {
  const query = queryArray
    ?.map(
      (query: { key: any; value: any }, index: any) =>
        `${query.key}=${query.value}${index < queryArray.length - 1 ? '&' : ''}`
    )
    .join('')
  return path('', `${subPath}?${query}`)
}
