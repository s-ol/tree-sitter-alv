/**
 * @file experimental livecoding environment with persistent expressions
 * @author s-ol bekic
 * @license MIT
 */

const str = ($, delim) => {
  var not_delim = new RegExp('[^' + delim + ']');
  return seq(
    delim,
    repeat(choice($.escape_char, not_delim)),
    delim,
  )
};

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'alv',

  extras: $ => [],
  supertypes: $ => [
    $.atom,
    $.expression,
  ],
  rules: {
    source_file: $ => seq(
      optional($._sp),
      repeat(seq($.expression, $._sp)),
    ),

     // wc: white-space character
     // sp: whitespace
    _wc: $ => /[ \t\r\n]/,
    _sp: $ => seq(
      repeat1(choice($.comment, $._wc)),
    ),

    // comments
    _comment_contents: $ => seq(
      '(',
      repeat(choice($._comment_contents, /[^)]/)),
      ')',
    ),
    _comment_cell: $ => seq('#', $._comment_contents),
    _comment_line: $ => /##.*?\n/,
    comment: $ => choice($._comment_line, $._comment_cell),

    // pieces for atom definitions
    _int: $ => token(prec(2, repeat1(/[0-9]/))),
    _fract: $ => seq($._int, '/', $._int),
    _float: $ => choice(
      seq($._int, '.', optional($._int)),
      seq('.', $._int),
    ),
    escape_char: $ => token(prec(1, choice('\\"', "\\'", '\\\\', '\\$'))),

    // atoms
    symbol: $=> token(seq(
      choice(
        /[a-zA-Z]/,
        '-', '_', '+', '*', '^',
        '%', '/', '.', '=', '~',
        '!', '?', '>', '<',
      ),
      repeat(choice(
        /[0-9a-zA-Z]/,
        '-', '_', '+', '*', '^',
        '%', '/', '.', '=', '~',
        '!', '?', '>', '<',
      )),
    )),
    number: $ => seq(
      optional('-'),
      choice($._float, $._fract, $._int),
    ),
    string: $ => choice(
      str($, '"'),
      str($, '\''),
    ),
    atom: $ => choice($.number, $.symbol, $.string),

    // cells
    tag: $ => prec(10, seq(
      '[', $._int, ']',
    )),

    cell: $ => seq(
      '(',
      field('tag', optional($.tag)),
      optional($._sp),
      optional(seq(
        field('head', $.expression),
        repeat(seq($._sp, $.expression)),
        optional($._sp),
      )),
      ')',
    ),
    array: $ => seq(
      '[',
      optional($._sp),
      optional(seq(
        $.expression,
        repeat(seq($._sp, $.expression)),
        optional($._sp),
      )),
      ']',
    ),
    struct: $ => seq(
      '{',
      optional($._sp),
      optional(seq(
        $.expression,
        repeat(seq($._sp, $.expression)),
        optional($._sp),
      )),
      '}',
    ),

    substitution: $ => seq('$', $.expression),
    template_string: $ => seq(
      '$',
      field('tag', optional($.tag)),
      field('head', $.symbol),
      '"',
      repeat(choice($.escape_char, $.substitution, /[^"]/)),
      '"',
    ),

    // expression: anything that has a value
    // exp_list: list of expressions (potentially empty)
    // with optional leading and trailing whitespace
    // and required whitespace between expressions
    expression: $ => choice($.atom, $.cell, $.array, $.struct, $.template_string),
  }
});
