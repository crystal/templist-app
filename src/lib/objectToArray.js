export default function objectToArray(object) {
  return Object.keys(object).map((key) => {
    const value = object[key];
    return {
      ...value,
      key
    };
  });
}
