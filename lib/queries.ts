export const entriesQuery = `*[_type == "entry"]`
export const entryBySlugQuery = `*[slug.current == $slug]`
export const patternsQuery = `*[_type == "pattern"]`
export const patternClassesQuery = `*[_type == "patternClass"] | order(order)`
