export function safeJSONParse(value) {
  if (value === null || value === undefined || value === '') return null;
  try {
    return JSON.parse(value);
  } catch (err) {
    console.warn('safeJSONParse failed:', err, value);
    return null;
  }
}


