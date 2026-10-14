# Playwright Asana Assessment

## Overview
This project contains data-driven end-to-end tests using Playwright and JavaScript to verify tasks on an Asana-like project board.

## Tech Stack
- JavaScript
- Playwright
- Node.js

## Test Coverage
The test suite covers six task scenarios across the Web Application and Mobile Application projects. It verifies:
- User login
- Task visibility
- Task tags
- Task status and column placement

## Setup

Install dependencies:

```bash
npm install
```

Install the Chromium browser:

```bash
npx playwright install chromium
```

## Run Tests

```bash
npx playwright test --project=chromium
```

## View the Test Report

```bash
npx playwright show-report
```

## Demo Application
https://create-asana-like-pr-39y5.bolt.host/

The test credentials are provided for this assessment environment.
