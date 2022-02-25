export default function romanToInt(s: string): number {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // s.split('').reduce((prev, curr) => {
  //   return prev + romanMap[curr];
  // }, 0)

  let result = 0;
  const list = s.split('');
  for (let i = 0; i < list.length; i++) {
    const curr = list[i];
    const next = list[i + 1];
    if (next && romanMap[curr] < romanMap[next]) {
      result -= romanMap[curr];
    } else {
      result += romanMap[curr];
    }
  }
  return result;
}
