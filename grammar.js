var str = ($, delim) => {
  var not_delim = new RegExp('[^' + delim + ']');
  return seq(
    delim,
    repeat(choice($.escape_char, not_delim)),
    delim,
  )
};

module.exports = grammar({
  name: 'alv',

  rules: {
    source_file: $ => seq(
      optional($._sp),
      repeat(seq($._expression, $._sp)),
    ),

     // wc: white-space character
     // sp: whitespace
    _wc: $ => /[ \t\r\n]/,
    _sp: $ => seq(
      repeat1(choice($.comment, $._wc)),
    ),

    // comment_nested: pair of braces
    _comment_contents: $ => seq(
      '(',
      repeat(choice($._comment_contents, /[^)]/)),
      ')',
    ),
    comment: $ => seq('#', $._comment_contents),

    // pieces for atom definitions
    _first: $ => /[a-zA-Z-_+*\/\.=~!?%]/,
    _digit: $ => /[0-9]/,
    _int: $ => prec(2, repeat1($._digit)),
    _float: $ => choice(
      seq(repeat1($._digit), '.', repeat($._digit)),
      seq(repeat($._digit), '.', repeat1($._digit)),
    ),
    escape_char: $ => /\\["'\\]/,

    // atoms
    sym: $ => seq(
      $._first,
      repeat(choice($._first, $._digit)),
    ),
    num: $ => seq(
      optional('-'),
      choice($._float, $._int),
    ),
    str: $ => choice(
      str($, '"'),
      str($, '\''),
    ),
    _atom: $ => choice($.sym, $.num, $.str),

    // expression: anything that has a value
    // exp_list: list of expressions (potentially empty)
    // with optional leading and trailing whitespace
    // and required whitespace between expressions
    _expression: $ => choice($._atom, $.cell),

    tag: $ => seq(
      '[',
      repeat1($._digit),
      ']',
    ),

    // wrap head for highlghting
    head: $ => $._expression,
    cell: $ => seq(
      '(',
      optional($.tag),
      seq(
        optional($._sp),
        optional(seq(
          $.head,
          repeat(seq($._sp, $._expression)),
          optional($._sp),
        )),
      ),
      ')',
    ),
  }
});
