.DEFAULT_GOAL := help
.PHONY: help install dev build preview check verify clean reset push deploy-status

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install npm dependencies
	npm install

dev: ## Run Astro dev server (http://localhost:4321)
	npm run dev

build: ## Build production site into dist/
	npm run build

preview: ## Preview the production build locally
	npm run preview

check: ## Run astro check (TypeScript + Astro diagnostics)
	npx astro check

verify: check build ## Run check and build (pre-push sanity)

clean: ## Remove build artifacts
	rm -rf dist .astro

reset: clean ## Reinstall from scratch (removes node_modules + lockfile)
	rm -rf node_modules package-lock.json
	npm install

push: ## Push current branch to origin
	git push

deploy-status: ## Show recent runs of the Pages deploy workflow (requires gh CLI)
	gh run list --workflow=deploy.yml --limit 5
