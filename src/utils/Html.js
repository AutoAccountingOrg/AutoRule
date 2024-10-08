export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}
export function findNonEmptyString() {
  let args = Array.from(arguments);
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== '' && typeof args[i] === 'string') {
      return args[i];
    }
  }
  return '';
}
