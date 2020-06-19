## Working with the code

### Set up the workspace
[Fork](https://guides.github.com/activities/forking/#fork) the project, [clone](https://guides.github.com/activities/forking/#clone) your fork, configure the remotes and install the dependencies:

```bash
# Clone your fork of the repo into the current directory
$ git clone https://github.com/<user-name>/pixel-editor
# Navigate to the newly cloned directory
$ cd pixel-editor
# Assign the original repo to a remote called "upstream"
$ git remote add upstream https://github.com/CurtisHughes/pixel-editor
# Install the dependencies
$ yarn
```

### Lint
```
yarn lint
```

### Test
```
yarn test
```

### Build
```
yarn build
```

## Developing/Testing Locally
Because this project does not include a user interface you will need to create one for developing and testing locally (some options: React, Vue, Angular). Once that is setup you can [link](https://classic.yarnpkg.com/en/docs/cli/link/) the projects locally. This will install the package as a symbolic link within your UI project's node_modules folder to the cloned pixel-editor repository:

```bash
# from @curtishughes/pixel-editor
yarn link
```

```bash
# from UI project
yarn link @curtishughes/pixel-editor
```

You can also use the `yarn watch` command from the pixel-editor project in order to build the project automatically on file change.

## Git Commit Guidelines

This project has very precise rules over how git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **release npm package versions** through a tool called [semantic-release](https://github.com/semantic-release/semantic-release).

The commit message formatting can be added using a typical git workflow or through the use of a CLI
wizard ([Commitizen](https://github.com/commitizen/cz-cli)). 

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header
of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit
being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example `$location`,
`$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

You can use `*` when the change affects more than a single scope.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes][closing-issues].

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

### Examples
| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |
