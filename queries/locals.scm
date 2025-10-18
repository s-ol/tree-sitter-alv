(symbol) @local.reference

((cell head:(symbol) @function) @local.scope
 (#any-of? @function "do" "export" "fn" "defn" "loop"))

((cell
  head:(symbol) @function .
  ((symbol) @local.definition @variable . (expression) .)+)
 (#eq? @function "def"))

((cell
  head:(symbol) @function .
  (symbol)+ @local.definition @variable)
 (#eq? @function "import"))

((cell
  head:(symbol) @function .
  (array (symbol)+ @local.definition @variable.parameter))
 (#eq? @function "fn"))

((cell
  head:(symbol) @function .
  (symbol) .
  (array (symbol)+ @local.definition @variable.parameter))
 (#eq? @function "defn"))
