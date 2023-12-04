<br/>
<p align="center">
<a href=" " target="_blank">
<img src="./vite.svg" width="180" alt="Dataverse logo">
</a >
</p >
<br/>

# dapp-base-example

## Overview

This is a basic example of a Dataverse dapp, which includes two models: `post`
and `profile` with locate in `./base/models`. It demonstrates the process of
creating, loading, monetizing, and unlocking a post by using Dataverse hooks.

## Run

### 1.Prepare

Before running example, you need to install `create-dataverse-app`.

```
pnpm install -g create-dataverse-app
```

### 2.Install

```
pnpm install
```

### 3.Deploy

```
dataverseos deploy
```

This step will need your private key to generate personal signature. Rest
assured, Dataverse will not store or disclose your private key..

After successful deployment, you can find the generated `./output/app.json`,
which contains various information about this new dapp.

### 4.Start

```
pnpm dev
```

The demo has been successfully launched. Try it!
