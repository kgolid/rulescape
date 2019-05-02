(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function newArray(n, value) {
    n = n || 0;
    var array = new Array(n);
    for (var i = 0; i < n; i++) {
      array[i] = value;
    }
    return array;
  }

  function union(setA, setB) {
    var _union = new Set(setA);
    for (var elem of setB) {
      _union.add(elem);
    }
    return _union;
  }

  function difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }

  const coinflip = () => Math.random() < 0.5;

  const blackSquareRule = [
    { x: 0, y: 0, c: 1 },
    { x: 0, y: 1, c: 1 },
    { x: 1, y: 0, c: 1 },
    { x: 1, y: 1, c: 1 }
  ];

  const absoluteRules = [blackSquareRule];

  const ruleWithOffset = (rule, xoff, yoff) =>
    rule.map(cell => ({ x: cell.x - xoff, y: cell.y - yoff, c: cell.c }));

  const offsetVariantsFromRule = rule =>
    rule.map(r => ruleWithOffset(rule, r.x, r.y));

  const offsetRules = absoluteRules.map(r => offsetVariantsFromRule(r));

  let grid;
  let picks;
  let nbrhood;

  let sketch = function(p) {
    const xdim = 160;
    const ydim = 160;
    const cdim = 5;

    p.setup = function() {
      p.createCanvas(800, 800);
      p.noStroke();

      grid = newArray(ydim).map((_, y) =>
        newArray(xdim).map((_, x) => ({ x, y, c: -1 }))
      );

      picks = new Set();
      nbrhood = new Set([grid[~~(ydim / 2)][~~(xdim / 2)]]);
    };

    p.draw = function() {
      for (let i = 0; i < 20; i++) {
        step();
      }
      drawGrid();
    };

    function step() {
      const pick = pickFromNeighborhood(nbrhood);
      pick.c = determineCellCol(pick, grid);
      nbrhood = expandNeighborhood(nbrhood, picks, pick, grid);
      picks.add(pick);
    }

    function drawGrid() {
      grid.forEach(row =>
        row.forEach(cell => {
          p.fill(cell.c < 0 ? 180 : (1 - cell.c) * 255);
          p.rect(cell.x * cdim, cell.y * cdim, cdim, cdim);
        })
      );
    }

    p.keyPressed = function() {
      if (p.keyCode === 80) p.saveCanvas('rulescape', 'jpeg');
    };
  };
  new p5(sketch);

  function pickFromNeighborhood(nbrhood) {
    const i = Math.floor(Math.random() * nbrhood.size);
    return Array.from(nbrhood)[i];
  }

  function determineCellCol(cell, grid) {
    cell.c = 0;
    const whiteOk = !matchesPatterns(cell.x, cell.y, grid);
    cell.c = 1;
    const blackOk = !matchesPatterns(cell.x, cell.y, grid);

    if (whiteOk && blackOk) return coinflip() ? 1 : 0;
    if (whiteOk) return 0;
    if (blackOk) return 1;
    return -1; // No color option match the pattern.
  }

  function matchesPatterns(xoff, yoff, grid) {
    for (const pattern of offsetRules) {
      for (const variant of pattern) {
        if (matchesPatternInstance(variant, xoff, yoff, grid)) return true;
      }
    }
    return false;
  }

  function matchesPatternInstance(pattern, xoff, yoff, grid) {
    for (const cell of pattern) {
      if (cell.y + yoff < 0 || cell.y + yoff > grid.length - 1) return false;
      if (cell.x + xoff < 0 || cell.x + xoff > grid[0].length - 1) return false;
      if (grid[cell.y + yoff][cell.x + xoff].c != cell.c) return false;
    }
    return true;
  }

  function expandNeighborhood(nbrhood, picks, newCell, grid) {
    nbrhood.delete(newCell);
    const diamond = difference(getDiamond(newCell, grid), picks);
    return union(nbrhood, diamond);
  }

  function getDiamond(cell, grid) {
    const arr = [];
    if (cell.y > 0) arr.push(grid[cell.y - 1][cell.x]);
    if (cell.x > 0) arr.push(grid[cell.y][cell.x - 1]);
    if (cell.y < grid.length - 1) arr.push(grid[cell.y + 1][cell.x]);
    if (cell.x < grid[0].length - 1) arr.push(grid[cell.y][cell.x + 1]);
    return arr;
  }

}));
