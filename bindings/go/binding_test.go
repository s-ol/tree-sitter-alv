package tree_sitter_alv_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_alv "github.com/s-ol/tree-sitter-alv/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_alv.Language())
	if language == nil {
		t.Errorf("Error loading alv grammar")
	}
}
