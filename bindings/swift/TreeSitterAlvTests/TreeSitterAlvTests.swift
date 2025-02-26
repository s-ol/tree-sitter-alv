import XCTest
import SwiftTreeSitter
import TreeSitterAlv

final class TreeSitterAlvTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_alv())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading alv grammar")
    }
}
