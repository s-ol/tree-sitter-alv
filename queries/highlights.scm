(str) @string
(num) @number

(comment) @comment

(cell
  "(" @punctuation
  (tag) @punctuation
  head:(sym) @function
  ")" @punctuation)
(tplstr
  (tag) @punctuation
  head:(sym) @function
  (tpl_subst
    "$" @punctuation.special) @embedded
) @string

(escape_char) @escape

((sym) @constant.builtin
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
