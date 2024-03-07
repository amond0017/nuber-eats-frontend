export function toCamelCase(text: string) {
  return text.replace(/-\w/g, clearAndUpper);
}

export function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function clearAndUpper(text: string) {
  return text.replace(/-/, " ").toUpperCase();
}
