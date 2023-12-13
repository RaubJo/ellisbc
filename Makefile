#!/bin/bash

#https://dwmkerr.com/makefile-help-command/
.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

init: # Run to initialize the project
	@npm install
	@npx wrangler login

build: # Build the static site 
	@npm run build

deploy: # Deploy the site to staging
	@npm run build
	@npx wrangler pages deploy ./dist --branch dev --project-name ellisbc

release: # Release the site to production
	@npm run build
	@npx wrangler pages deploy ./dist --branch main --project-name ellisbc 

dev: # Run to develop locally
	@npm run dev
