export const tags: Record<string, string> = {
  //yellow
  tips: "tag-yellow",
  tricks: "tag-yellow",
  learning: "tag-yellow",
  productivity: "tag-yellow",
  experiments: "tag-yellow",
  //blue
  tutorial: "tag-blue",

  //purple
  design: "tag-purple",
  animation: "tag-purple",

  // aqua
  health: "tag-aqua",

  //gray
  thoughts: "tag-gray",
  general: "tag-gray",

  //red
  tech: "tag-red",
  breaking_news: "tag-red",
  bug_fixes: "tag-red",

  //Green
  programming: "tag-green",
  practices: "tag-green",
}

function capitalize(s: string) {
  return s.toLowerCase().replace(/\b./g, function (a) {
    return a.toUpperCase()
  })
}
export function convertTagName(tag: string): string | undefined {
  if (!tag) return

  if (!tag.includes("_")) return capitalize(tag)

  const tags = tag.split("_")

  return tags.map(tag => capitalize(tag)).join(" ")
}
