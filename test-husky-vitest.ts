// 测试 Husky 中的 Vitest 集成
export const testFunction = (input: string): string => {
  return `Hello, ${input}!`;
};

// 来自『基础编码原则与最佳实践』：保持纯函数设计，易于测试
describe('Husky Vitest Integration Test', () => {
  it('should work correctly in Husky pre-commit hook', () => {
    expect(testFunction('World')).toBe('Hello, World!');
  });

  it('should handle empty string', () => {
    expect(testFunction('')).toBe('Hello, !');
  });

  // 来自『P3 Code Review 指南』：测试边界条件
  it('should handle special characters', () => {
    expect(testFunction('Test@123')).toBe('Hello, Test@123!');
  });
});
