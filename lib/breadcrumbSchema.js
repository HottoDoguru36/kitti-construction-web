function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://kitticonstruction.com'
}

// Builds a schema.org BreadcrumbList from an ordered list of { name, pathname } items.
export function buildBreadcrumbSchema(items) {
  const base = getSiteUrl().replace(/\/+$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${base}${item.pathname.startsWith('/') ? item.pathname : `/${item.pathname}`}`,
    })),
  }
}
