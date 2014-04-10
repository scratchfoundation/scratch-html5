JSCS_PATH = ./node_modules/.bin/jscs
KARMA_PATH = ./node_modules/.bin/karma
KARMA_CONFIG = ./test/fixtures/karma.conf.js

# Performs code governance (lint + style) test
lint:
	@$(JSCS_PATH) ./js/*
	@$(JSCS_PATH) ./test/unit/*

# Performs unit tests
unit:
	@$(KARMA_PATH) start $(KARMA_CONFIG) $*

# Run all test targets
test:
	@make lint
	@make unit

# Ignore directory structure
.PHONY: lint unit test