export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}
