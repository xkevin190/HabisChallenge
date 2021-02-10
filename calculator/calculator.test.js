var data = require('./calculator');


describe('calculator test', () => {
  test('calculator test passing basic operations', () => {
    expect(data.calcMe('4-7+8+9/2*3')).toBe(6.5)
  })


  test('operations of 2 or more numbers', () => {
    const result = data.calcMe('23-14+123/3*49').toFixed(2)
    expect(Number(result)).toBe(9.84)
  })


  test('test with spaces', () => {
    expect(data.calcMe('   4-7+8+9/2*3')).toBe(6.5)
  })


  test('more than 20 characters', () => {
    expect(() => { data.calcMe('12345675344-7+8+9/2*3') })
      .toThrow(new Error("you cannot pass strings with more than 20 characters"))
  })


  test('repeated opporators', () => {
    expect(() => { data.calcMe('4-7+8+9/2*3++') })
      .toThrow(new Error("Operators qty must be lesser than operands qty"))
  })
})