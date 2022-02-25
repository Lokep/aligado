const unique = (obj) => {
  const key = Symbol(Date.now());
  if (obj.hasOwnProperty(key)) {
    return unique(obj);
  } else {
    return key;
  }
};

/**
 * reapply
 * 1. 看context是否为null，例如max这个案例，就是null，而且结果需要return出去
 * 2. 需要将这个方法的this指向context，这样才能调用到context的方法
 * 3. 对于额外添加的方法，在执行完后，要删除，避免污染
 * 4. 需要return
 * 5. call 和 apply的区别在于，call是一个或多个参数来调用一个函数，apply传入的第二个参数是数组
 * @param {Object} context
 * @param {Array} params
 * @return {Object}
 */
Function.prototype.reapply = function (context, params) {
  // console.log('[context]: ', context, this)

  if (context === null) {
    return this(...params);
  }

  const key = unique(context);

  context[key] = this;

  const result = context[key](...params);

  delete context[key];

  return result;
};

Function.prototype.recall = function (context, ...params) {};

// Test Case

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.reapply(null, numbers);
const min = Math.min.reapply(null, numbers);

console.log(max); // expected output: 7
console.log(min); // expected output: 2

console.log('---------------------------------');

let Person = {
  name: 'Tom',
  say(age) {
    console.log(`我叫${this.name}我今年${age}`);
    return 12123;
  },
};

Person1 = {
  name: 'Tom1',
};

Person.say.reapply(Person1, [18]);
