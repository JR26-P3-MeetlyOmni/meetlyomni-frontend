export const testFile = 'This is a test file';

// 这个文件应该能正常通过类型检查
export const validFunction = (name: string): string => {
  return `Hello, ${name}!`;
};
