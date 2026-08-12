export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-')
