# Contributing to angular-material-framework

We would love for you to contribute to angular-material-framework and help make it even better than it is
today! As a contributor, here are the guidelines we would like you to follow:

 * [Code of Conduct](#coc)
 * [Question or Problem?](#question)
 * [Issues and Bugs](#issue)
 * [Feature Requests](#feature)
 * [Submission Guidelines](#submit)
 * [Commit Message Guidelines](#commit)

## <a name="coc"></a> Code of Conduct
Help us keep the UX Design System open and inclusive. Please read and follow our [Code of Conduct][coc].

## <a name="question"></a> Got a Question or Problem?
Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. For general questions reach out in the `#eux_designsystem` Slack channel or email `uxops@homedepot.com`.

## <a name="issue"></a> Found a Bug?
If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to our GitHub Repository. If you would like to *implement* a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will ask you to provide a reproduction either via image or application. Having a live, reproducible scenario gives us a wealth of important information without going back & forth to you with additional questions like:

- version of angular-material-framework used
- 3rd-party libraries and their versions
- and most importantly - a use-case that fails

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.homedepot.com/ux/angular-material-framework/issues/new).


### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.homedepot.com/ux/angular-material-framework/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
2. Fork the ux/angular-material-framework repo.
3. Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

4. Create your patch, **including appropriate test cases**.
5. Run the full angular-material-framework test suite and ensure that all tests pass.
    
    ```shell
    yarn test        # Run all tests in a single pass on node

    yarn test:watch  # Run all tests in watch mode on node
    ```
6. Update the version number
    
    **Is it a Breaking Change?**
    
    We want to respect [semver](https://semver.org/). It's important to discern whether your pull request contains breaking changes or not. Sometimes, renaming or removing things in the code can result in breaking changes.

    Here are some examples of breaking changes...changing, renaming or removing any of the following:
      * HTML tags or attributes
      * Folders or Files
      * Any SCSS `@mixin`, `$variable` or `function`
      * Any JS `function` or `class`

    We also practice **graceful deprecation** when something is slated to be removed -- we mark it as deprecated in the current version and remove it in the next major version.
    
    To update the version modify `config/version.json` then execute:
    ```shell
    gulp bump-version
    ```

    Then you will be prompted to select and update the major, minor, or patch version.

7. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit).

     ```shell
     git commit -a
     ```
    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

8. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

9. In GitHub, send a pull request to `angular-material-framework:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the angular-material-framework test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history**.  But also, we use the git commit messages to **generate the angular-material-framework change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.homedepot.com/ux/angular-material-framework/commits/master))

```
docs(changelog): update changelog to version 1.2.3
```
```
fix(release): need to update dependencies for gulp

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope
The scope should be the name of the component (as perceived by the person reading the changelog generated from commit messages).

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

[coc]: https://github.homedepot.com/ux/angular-material-framework/blob/master/CODE_OF_CONDUCT.md
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[github]: https://github.homedepot.com/ux/angular-material-framework