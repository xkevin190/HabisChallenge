function calcMe(str) {

  if(str.length >= 20){
    throw new Error('you cannot pass strings with more than 20 characters')
  }
  const noWsStr = str.replace(/\s/g, '');
  const operators = noWsStr.replace(/[\d.,]/g, '').split('');
  const operands = noWsStr.replace(/[+/%*-]/g, ' ')
                          .replace(/\,/g, '.')
                          .split(' ')
                          .map(parseFloat)
                          .filter(it => it);

                     
  if (operators.length >= operands.length){
    throw new Error('Operators qty must be lesser than operands qty')
  };

  while (operators.includes('*')) {
    let opIndex = operators.indexOf('*');
    operands.splice(opIndex, 2, operands[opIndex] * operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };
  while (operators.includes('/')) {
    let opIndex = operators.indexOf('/');
    operands.splice(opIndex, 2, operands[opIndex] / operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };
  while (operators.includes('%')) {
    let opIndex = operators.indexOf('%');
    operands.splice(opIndex, 2, operands[opIndex] % operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };

  

  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    operators[i] === '+' ? (result += operands[i + 1]) : (result -= operands[i + 1])
  }
  return result
}

console.log(calcMe('4-7+8+9/2*3'))
console.log(calcMe('23-14+123/3*49'))


