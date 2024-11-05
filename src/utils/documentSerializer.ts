/* eslint-disable @typescript-eslint/no-explicit-any */
export function serializeMongoDocument<T extends Record<string, any>>(
  doc: T
): T {
  if (!doc) return doc;

  // Convert MongoDB document to plain object
  const plainObject = doc.toObject
    ? doc.toObject()
    : JSON.parse(JSON.stringify(doc));

  // Convert any Date objects to ISO strings
  Object.keys(plainObject).forEach(key => {
    if (plainObject[key] instanceof Date) {
      plainObject[key] = plainObject[key].toISOString();
    }
  });

  return plainObject;
}
