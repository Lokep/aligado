// 考察栈

export default function isValid(s: string): boolean {
  const stack = [];
  for (let val of s) {
    if (val === '(') {
      stack.push(')');
    } else if (val === '[') {
      stack.push(']');
    } else if (val === '{') {
      stack.push('}');
    } else if (stack.length === 0 || val !== stack.pop()) {
      return false;
    }
  }
  return stack.length === 0;
}
