## Professional page

This is my professional web page to showcase my work and experience at [se-vel.com](http://se-vel.com).

---

### Repository overview

This repo (`sosegon/sosegon.github.io`) is the **deployment host**. It does not contain the source code for the main site — it vendors it in via a git subtree. Two remotes are configured:

| Remote | URL | Purpose |
|--------|-----|---------|
| `origin` | `git@github.com:sosegon/sosegon.github.io.git` | This deployment repo |
| `se-vel-v2` | `git@github.com:sosegon/se-vel.git` | Source repo for the V2 site (SvelteKit) |

Pushing (or merging a PR) to the `master` branch of `origin` triggers the GitHub Actions workflow that builds and deploys the site to GitHub Pages.

---

### Site versions

#### V1

Built with vanilla JavaScript, jQuery, and Bootstrap. Served from [se-vel.com/v1](http://se-vel.com/v1). Source lives in the `se-vel-v1/` directory of this repo.

#### V2

Built with SvelteKit. The source lives in the external repo [`sosegon/se-vel`](https://github.com/sosegon/se-vel) and is vendored into the `se-vel-v2/` directory here via a git subtree.

---

### How deployment works

The workflow defined in [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml) runs on every push to `master`. It:

1. Installs dependencies and runs `npm run build` inside `se-vel-v2/`
2. Builds Storybook with `npm run build-storybook`
3. Copies supporting assets (`CNAME`, `54071fdb.html`, `PrivacyPolicy.md`) into the build output
4. Copies the other site sections (`se-vel-v1/`, `landing3d/`, `rendering/`, `watch-finder/`) into the build output
5. Publishes the entire `se-vel-v2/build/` directory to the `gh-pages` branch using `peaceiris/actions-gh-pages`

---

### Updating the site (standard workflow)

All content changes are made in the source repo (`sosegon/se-vel`). Once those changes are merged to its `main` branch, follow these steps to pull them into this repo and trigger deployment.

**1. Make and merge your changes in the source repo**

Work in `git@github.com:sosegon/se-vel.git`, open a PR there, and merge it to `main`.

**2. Create a new branch in this repo**

```bash
git checkout master
git pull origin master
git checkout -b update-se-vel-v2
```

**3. Pull the updated subtree from the source repo**

```bash
git pull se-vel-v2 main --allow-unrelated-histories
```

This pulls the latest `main` from `sosegon/se-vel` and merges it into the `se-vel-v2/` subtree prefix.

**4. Push the branch to origin**

```bash
git push origin update-se-vel-v2
```

**5. Open and merge a pull request**

Go to `github.com/sosegon/sosegon.github.io`, open a PR from `update-se-vel-v2` → `master`, and merge it. Merging to `master` automatically triggers the build-and-deploy workflow.

You can monitor the deployment progress in the **Actions** tab of this repo.

---

### First-time setup (subtree not yet added)

If you are setting up this repo from scratch and the `se-vel-v2/` subtree directory does not exist yet:

```bash
# Add the remote (already done if cloned from origin)
git remote add se-vel-v2 git@github.com:sosegon/se-vel.git

# Fetch the remote
git fetch se-vel-v2

# Add the source repo as a subtree under se-vel-v2/
git subtree add --prefix=se-vel-v2 se-vel-v2 main
```

After this initial setup, use the standard workflow above for all future updates.

---

### Important notes

- Do not remove `CNAME` or `54071fdb.html`. They are required for custom domain configuration.
- All merges to `master` trigger a deployment — keep `master` in a releasable state.
- The `gh-pages` branch is managed entirely by the CI workflow (`force_orphan: true`). Do not push to it manually.

---

### TODOs

- Complete the development of `landing3d` to serve it from its own repo.
- Complete the development of `watch-finder` to serve it from its own repo.
- Complete the development of `rendering` to serve it from its own repo.
