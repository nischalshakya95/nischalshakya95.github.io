const regex = /<\/?\s*[^>]*>/gim;

const validate = string => {
  const found = string.match(regex) || [];
  const arr = found.map((str = "") => str.replace("/", ""));
  const stack = [];
  arr.forEach(item => {
    const [first = ""] = stack;
    if (first === item) {
      stack.shift();
    } else {
      stack.unshift(item);
    }
  });
  return !stack.length;
};
