export const getFileUniqueKey = (file: File) => {
  return `${file.name}-${file.size}-${file.lastModified}`;
};
