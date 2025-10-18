(string) @string
(number) @number

(comment) @comment

(cell
  "(" @punctuation
  (tag) @punctuation
  head:(symbol) @function
  ")" @punctuation)
(template_string
  (tag) @punctuation
  head:(symbol) @function
  (substitution
    "$" @punctuation.special
    (symbol) @punctuation.special) @embedded
) @string

(escape_char) @escape

((symbol) @constant.builtin
  (#any-of? @constant.builtin
    "!"
    "->"
    "->>"
    "="
    "bang"
    "def"
    "defn"
    "do"
    "doc"
    "doto"
    "export"
    "export*"
    "false"
    "fmt"
    "fn"
    "if"
    "import"
    "import*"
    "loop"
    "merge!"
    "mkarray"
    "mkstruct"
    "print"
    "recur"
    "require"
    "switch"
    "switch-1"
    "trace"
    "trace="
    "true"
    "use"
    "when"
    "~"))
