// 来自『P3 Code Review 指南』：必须使用类型测试 (@ts-expect-error)
// 来自『Typescript Best Practice』：测试边界情况，期望类型错误

// 示例函数：只接受字符串参数
export const processString = (input: string): string => {
  return input.toUpperCase();
};

// 示例函数：只接受数字参数
export const processNumber = (input: number): number => {
  return input * 2;
};

// 示例函数：只接受特定联合类型
export const processStatus = (status: 'active' | 'inactive' | 'pending'): string => {
  return `Status: ${status}`;
};

describe('Type Testing Examples', () => {
  describe('processString', () => {
    it('should process valid string input', () => {
      expect(processString('hello')).toBe('HELLO');
    });

    // 来自『P3 Code Review 指南』：使用@ts-expect-error 测试类型边界
    it('should reject number input', () => {
      // @ts-expect-error - 测试类型边界：数字不能传递给字符串参数
      expect(() => processString(123)).toThrow();
    });

    it('should reject boolean input', () => {
      // @ts-expect-error - 测试类型边界：布尔值不能传递给字符串参数
      expect(() => processString(true)).toThrow();
    });
  });

  describe('processNumber', () => {
    it('should process valid number input', () => {
      expect(processNumber(5)).toBe(10);
    });

    it('should reject string input', () => {
      // @ts-expect-error - 测试类型边界：字符串不能传递给数字参数
      expect(() => processNumber('5')).toThrow();
    });
  });

  describe('processStatus', () => {
    it('should process valid status values', () => {
      expect(processStatus('active')).toBe('Status: active');
      expect(processStatus('inactive')).toBe('Status: inactive');
      expect(processStatus('pending')).toBe('Status: pending');
    });

    it('should reject invalid status values', () => {
      // @ts-expect-error - 测试类型边界：无效状态值
      expect(() => processStatus('invalid')).toThrow();
    });

    it('should reject number input', () => {
      // @ts-expect-error - 测试类型边界：数字不能作为状态值
      expect(() => processStatus(1)).toThrow();
    });
  });
});

// 来自『基础编码原则与最佳实践』：测试边界条件和异常场景
describe('Edge Cases', () => {
  it('should handle empty string', () => {
    expect(processString('')).toBe('');
  });

  it('should handle zero', () => {
    expect(processNumber(0)).toBe(0);
  });

  it('should handle negative numbers', () => {
    expect(processNumber(-5)).toBe(-10);
  });
});
