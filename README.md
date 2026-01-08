## Professional page

This is my professional web page to showcase my work and experience in [http://se-vel.com](http://se-vel.com)

---

### Versions

#### V1

It is built with vanilla JavaScript and supported with `JQuery` and `Bootstrap`. It is available [here](http://se-vel.com/v1)

#### V2

It is build with `SvelteKit`. It is a major update with better layout and structure. The source code is in [this repo](https://github.com/sosegon/se-vel).

Any change in the original repo has to be fetched here in a new branch. Then, a pull request has to be created to merge it and start the build and deployment.

Follow the next steps to integrate the changes from the other repo:

Create a new branch.

```
git checkout -b se-vel-v2
```

Add the remote repo.

```
git remote add se-vel-v2 git@github.com:sosegon/se-vel.git
```

Fetch the changes from the repo.

```
git fetch se-vel-v2
```

Add the code to a folder.

```
git subtree add --prefix=se-vel-v2 se-vel-v2 main
```

---

### Important notes

Do not remove the files `54071fdb.html` and `CNAME`. They are needed for the domain configuratiion.

---

### TODOs

- Complete the development of `landing3d` to serve it from its own repo.
- Complete the development of `watch-finder` to serve it from its own repo.
- Complete the development of `rendering` to serve it from its own repo.
