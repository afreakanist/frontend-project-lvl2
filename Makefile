install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

.PHONY: test
