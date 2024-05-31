# Tickets.com WebApp Automation

[![Playwright](https://img.shields.io/badge/playwright-v1.36.1-blue)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.1.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node.js-v18.11.0-blue)](https://nodejs.org/en/)

This repository contains automated UI tests for the Tickets.com WebApp. The tests were written using Playwright and TypeScript. Tests run in different browsers (Chromium, Firefox, and WebKit) and mobile viewports (iPhone 13 Pro and Pixel 5).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18.x)
- [Playwright](https://playwright.dev/docs/intro) (v1.44.1)

### Setup

1. Clone the repository to your local machine.

```bash
git https://github.com/yermanjulia/tickets.com
cd tickets.com
```

2. Install the project dependencies.

```bash
npm install
```

## Running the Tests

This project uses Playwright, so it allows testing with multiple browser types (Chromium, Firefox, and WebKit).
To run the tests locally, execute the following command:

```bash
npx playwright test
```

This command will run the tests in a headless browser. Setting for headed mode is in playwright.config.ts file.

## CI/CD

This project is configured with GitHub Actions for Continuous Integration.

The current configuration (.github/workflows/playwright.yml) is setup to run tests on both push and pull_request events against the main branch. The job will setup Node.js environment, install dependencies, and run tests using Playwright. After the tests are completed, it uploads the test report as an artifact.

## Reports

The Playwright HTML report for the tests is available [here](https://github.com/yermanjulia/tickets.com/actions/workflows/playwright.yml). You can download the report by clicking on the "playwright-report" link under the "Artifacts" section in each workflow run.

## Implementation

This project uses Playwright for writing end-to-end tests in JavaScript/TypeScript. Playwright is a Node.js library for browser automation. It provides a high-level API to control headless or non-headless browsers.

A page object model is used to structure the tests, making the test code more readable, maintainable, and reusable.

## Project Structure

```bash
├── .github/                       # Contains GitHub files
│   └── workflows/                 # Contains GitHub Action files
│       └── playwright.yml         # GitHub Actions Playwright workflow
├── pages/                         # Contains page classes
│   ├── about-us/
│   │   └── about-us.page.ts       # About-Us class
│   ├── main/
│   │   └── main.page.ts           # Main Page class
├── tests/                         # Contains all tests
│   ├── about-us/
│   │   └── about-us.test.ts       # Tests for About-Us
│   ├── main/
│   │   └── main.test.ts           # Tests for Main Page
├── .gitignore                     # Specifies intentionally untracked files to ignore
├── package-lock.json              # Locks down the versions of a project's dependencies
├── package.json                   # Contains scripts and dependencies of the project
├── playwright.config.ts           # Playwright test runner configuration file
└── README.md                      # README file with a template for your project
```

## Contact

- Julia Yerman - julia@fromqato.dev
- Project Link: https://github.com/yermanjulia/tickets.com