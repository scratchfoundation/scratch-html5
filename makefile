JSCS_PATH = ./node_modules/.bin/jscs
BROWSERIFY_PATH = ./node_modules/.bin/browserify
WATCHIFY_PATH = ./node_modules/.bin/watchify
KARMA_PATH = ./node_modules/.bin/karma
KARMA_CONFIG = ./test/fixtures/karma.conf.js

# Quoted last argument fixes weirdness on windows
# http://comments.gmane.org/gmane.comp.gnu.make.windows/3451

# Performs code governance (lint + style) test
lint:
	@$(JSCS_PATH) ./js/*
	@$(JSCS_PATH) ./test/unit/*

# Package code for use in browser
build:
	@$(BROWSERIFY_PATH) js/Scratch.js --standalone Scratch --outfile "Scratch.js"

# Auto-package code for use in browser
watch:
	@$(WATCHIFY_PATH) js/Scratch.js --standalone Scratch --debug --outfile "Scratch.js"

# Performs unit tests
unit:
	@$(KARMA_PATH) start $(KARMA_CONFIG) "$*"

# Run all test targets
test:
	@make lint
	@make unit

# Ignore directory structure
.PHONY: lint build watch unit test
