# [Nostamask](https://github.com/ubinix-warun/nostamask) -- Navigating Nostr Safely with Nostamask Snap.

In an ever-evolving landscape of blockchain technologies and decentralized networks, seamless interaction and secure transactions have become paramount. Introducing Nostamask, a revolutionary Snaps plugin for Metamask, designed to redefine how users connect with the Nostr Network.

The Nostamask project addresses the challenges users currently face when navigating the complexities of Nostr Network interactions through Metamask. 

We create [Nostamask](https://github.com/ubinix-warun/nostamask) by extend the functionality of [MetaMask Flask](https://github.com/ubinix-warun/metamask-extension) with [Snaps](https://github.com/ubinix-warun/metamask-snaps), use [nostr-tools](https://github.com/nbd-wtf/nostr-tools) interact Nostr network via relays and fork [twitter-clone](https://github.com/ccrsxx/twitter-clone) style to demonstrate the Snaps, use [Infura IPFS](https://docs.infura.io/networks/ipfs/http-api-methods) to store profile/banner. 

<img src="https://user-images.githubusercontent.com/3756229/261893695-f31b549c-cf5f-4c1d-9667-4d6bd6a2b0cf.png" width="90%"/>

### [Setup (local) & Demo](https://youtu.be/lEJ_TWvziQ4) -- 4 min

## Snaps is pre-release software

MetaMask Snaps is a system that allows anyone to safely expand the capabilities of MetaMask. A _snap_ is a program that we run in an isolated environment that can customize the wallet experience.

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/), a canary distribution for developers that provides access to upcoming features.

## Getting Started

Run Snap and App.

```shell
yarn install && yarn start
```

## [Snap Dialog](https://www.figma.com/file/i9OMDnUcuh8N79QIaZhRak/Nostamask?type=whiteboard&node-id=0%3A1&t=0rIiI33Di8zgxzaS-1) 

<img src="https://user-images.githubusercontent.com/3756229/261901462-7bb22e94-65c3-4b87-834c-256ce007ac1c.png" width="100%"/>

<details open>
  <summary>M1: Install Nostamask snap</summary>
  <br/>
  
  * Nostamask enable [manageState and Bip44 cointype:0](https://github.com/ubinix-warun/nostamask/blob/main/packages/snap/snap.manifest.json).
  * Import nostr-tools on the extension and @noble/curves/secp256k1 for create schnorr signature.

  <br/>
</details>
<details open>
  <summary>M2: Initialize Schnorr key or Import key</summary>
  <br/>
  
  * The snap use manageState to [store key](https://github.com/ubinix-warun/nostamask/blob/main/packages/snap/src/snap/store-state.ts), new user can generate SK key and backup key.
  * Import key for exists user and store in manageState.

  <br/>
</details>
<details open>
  <summary>M3: Sign event</summary>
  <br/>
  
  * The app use [Sign Event](https://github.com/ubinix-warun/nostamask/blob/main/packages/app/src/lib/utils/nostr.ts) and call RPC signEvent to Nostamask.
  * Upload image to Infura IPFS API via [IPFS HTTP client](https://github.com/ubinix-warun/nostamask/blob/main/packages/app/src/lib/utils/infura.ts), Ex: profile image, banner.

  <br/>
</details>
<br/>

## Cloning

This repository contains GitHub Actions that you may find useful, see `.github/workflows` and [Releasing & Publishing](https://github.com/MetaMask/template-snap-monorepo/edit/main/README.md#releasing--publishing) below for more information.

If you clone or create this repository outside the MetaMask GitHub organization, you probably want to run `./scripts/cleanup.sh` to remove some files that will not work properly outside the MetaMask GitHub organization.

Note that the `action-publish-release.yml` workflow contains a step that publishes the frontend of this snap (contained in the `public/` directory) to GitHub pages. If you do not want to publish the frontend to GitHub pages, simply remove the step named "Publish to GitHub Pages" in that workflow.

If you don't wish to use any of the existing GitHub actions in this repository, simply delete the `.github/workflows` directory.

## Contributing

### Testing and Linting

Run `yarn test` to run the tests once.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and fix any automatically fixable issues.

### Releasing & Publishing

The project follows the same release process as the other libraries in the MetaMask organization. The GitHub Actions [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) and [`action-publish-release`](https://github.com/MetaMask/action-publish-release) are used to automate the release process; see those repositories for more information about how they work.

1. Choose a release version.

- The release version should be chosen according to SemVer. Analyze the changes to see whether they include any breaking changes, new features, or deprecations, then choose the appropriate SemVer version. See [the SemVer specification](https://semver.org/) for more information.

2. If this release is backporting changes onto a previous release, then ensure there is a major version branch for that version (e.g. `1.x` for a `v1` backport release).

- The major version branch should be set to the most recent release with that major version. For example, when backporting a `v1.0.2` release, you'd want to ensure there was a `1.x` branch that was set to the `v1.0.1` tag.

3. Trigger the [`workflow_dispatch`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch) event [manually](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) for the `Create Release Pull Request` action to create the release PR.

- For a backport release, the base branch should be the major version branch that you ensured existed in step 2. For a normal release, the base branch should be the main branch for that repository (which should be the default value).
- This should trigger the [`action-create-release-pr`](https://github.com/MetaMask/action-create-release-pr) workflow to create the release PR.

4. Update the changelog to move each change entry into the appropriate change category ([See here](https://keepachangelog.com/en/1.0.0/#types) for the full list of change categories, and the correct ordering), and edit them to be more easily understood by users of the package.

- Generally any changes that don't affect consumers of the package (e.g. lockfile changes or development environment changes) are omitted. Exceptions may be made for changes that might be of interest despite not having an effect upon the published package (e.g. major test improvements, security improvements, improved documentation, etc.).
- Try to explain each change in terms that users of the package would understand (e.g. avoid referencing internal variables/concepts).
- Consolidate related changes into one change entry if it makes it easier to explain.
- Run `yarn auto-changelog validate --rc` to check that the changelog is correctly formatted.

5. Review and QA the release.

- If changes are made to the base branch, the release branch will need to be updated with these changes and review/QA will need to restart again. As such, it's probably best to avoid merging other PRs into the base branch while review is underway.

6. Squash & Merge the release.

- This should trigger the [`action-publish-release`](https://github.com/MetaMask/action-publish-release) workflow to tag the final release commit and publish the release on GitHub.

7. Publish the release on npm.

- Be very careful to use a clean local environment to publish the release, and follow exactly the same steps used during CI.
- Use `npm publish --dry-run` to examine the release contents to ensure the correct files are included. Compare to previous releases if necessary (e.g. using `https://unpkg.com/browse/[package name]@[package version]/`).
- Once you are confident the release contents are correct, publish the release using `npm publish`.

## Notes

- Babel is used for transpiling TypeScript to JavaScript, so when building with the CLI,
  `transpilationMode` must be set to `localOnly` (default) or `localAndDeps`.
