# Contributing

First of all, thank you for showing interest in contributing, all your contributions are extremely valuable to the project!

## Ways to contribute

- **Improve documentation**: fix incomplete or missing docs, bad wording, examples or explanations
- **Give feedback**: we are constantly working on making things better, please share how you use our libraries, what features are missing and what is done good via [GitHub Discussions](https://github.com/react-to/react-to-styled/discussions)
- **Share**: share link to React-to-styled docs with everyone who can be interested
- **Contribute to codebase**: propose new feature via [GitHub Issues](https://github.com/react-to/react-to-styled/issues) or find an [existing one](https://github.com/react-to/react-to-styled/labels/good%20first%20issue) that you are interested in and work on it
- **Give us a code review**: help us identify problems with source code or make components more performant

## Contributing workflow

- Decide what you want to contribute
- If you want to implement new feature discuss it with maintainer [GitHub Discussions](https://github.com/react-to/react-to-styled/discussions) before jumping into code
- After finalizing issue details work on code, please follow commit convention
- Run tests with `yarn test` test and submit a PR if everything is fine
- Get a code review and fix all issues noticed by maintainer
- If you cannot finish your task or changed your mind – that's totally fine, just let us know in GitHub issue that you've created in first step.
- Your PR is merged, you are awesome!

## Commit convention

We use monorepo, and it is important to write correct commit messages to keep git history clean.\
See more on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Get started locally

- Fork repository, clone or download your fork
- Install dependencies with yarn – `yarn`
- To start storybook – `yarn storybook`

##npm scripts

All npm scripts are located at main [package.json](https://github.com/react-to/react-to-styled/blob/main/package.json), individual packages do not have dedicated scripts.

## Development scripts

`storybook` – starts storybook development server

## Testing scripts

- `typecheck` – runs TypeScript typechecking with `tsc --noEmit` on all packages
- `lint` – runs ESLint
- `test` – runs all jest tests
