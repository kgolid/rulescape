const blackSquareRule = [
  { x: 0, y: 0, c: 1 },
  { x: 0, y: 1, c: 1 },
  { x: 1, y: 0, c: 1 },
  { x: 1, y: 1, c: 1 }
];
const whiteSquareRule = [
  { x: 0, y: 0, c: 0 },
  { x: 0, y: 1, c: 0 },
  { x: 1, y: 0, c: 0 },
  { x: 1, y: 1, c: 0 }
];

const whiteCornerRule1 = [
  { x: 0, y: 1, c: 0 },
  { x: 1, y: 0, c: 0 },
  { x: 1, y: 1, c: 1 }
];
const whiteCornerRule2 = [
  { x: 0, y: 0, c: 0 },
  { x: 1, y: 0, c: 1 },
  { x: 1, y: 1, c: 0 }
];
const whiteCornerRule3 = [
  { x: 0, y: 0, c: 0 },
  { x: 0, y: 1, c: 1 },
  { x: 1, y: 1, c: 0 }
];
const whiteCornerRule4 = [
  { x: 0, y: 0, c: 1 },
  { x: 0, y: 1, c: 0 },
  { x: 1, y: 0, c: 0 }
];

const blackLineRule = [{ x: 0, y: 0, c: 1 }, { x: 0, y: 1, c: 1 }];
const whiteLineRule = [{ x: 0, y: 0, c: 0 }, { x: 0, y: 1, c: 0 }];

const whiteRule1 = [
  { x: 0, y: 1, c: 0 },
  { x: 2, y: 1, c: 0 },
  { x: 1, y: 2, c: 0 },
  { x: 1, y: 1, c: 1 }
];
const whiteRule2 = [
  { x: 1, y: 0, c: 0 },
  { x: 2, y: 1, c: 0 },
  { x: 1, y: 2, c: 0 },
  { x: 1, y: 1, c: 1 }
];
const whiteRule3 = [
  { x: 1, y: 0, c: 0 },
  { x: 0, y: 1, c: 0 },
  { x: 1, y: 2, c: 0 },
  { x: 1, y: 1, c: 1 }
];
const whiteRule4 = [
  { x: 1, y: 0, c: 0 },
  { x: 0, y: 1, c: 0 },
  { x: 2, y: 1, c: 0 },
  { x: 1, y: 1, c: 1 }
];

const diagonalRule1 = [
  { x: 0, y: 0, c: 1 },
  { x: 1, y: 0, c: 0 },
  { x: 0, y: 1, c: 0 },
  { x: 1, y: 1, c: 1 }
];

const diagonalRule2 = [
  { x: 0, y: 0, c: 0 },
  { x: 1, y: 0, c: 1 },
  { x: 0, y: 1, c: 1 },
  { x: 1, y: 1, c: 0 }
];

const absoluteRules = [
  whiteCornerRule1,
  whiteCornerRule2,
  whiteCornerRule3
  //whiteCornerRule4,
  //blackSquareRule
];

const ruleWithOffset = (rule, xoff, yoff) =>
  rule.map(cell => ({ x: cell.x - xoff, y: cell.y - yoff, c: cell.c }));

const offsetVariantsFromRule = rule =>
  rule.map(r => ruleWithOffset(rule, r.x, r.y));

const offsetRules = absoluteRules.map(r => offsetVariantsFromRule(r));

export { absoluteRules, offsetRules };
