---
id: testing
title: Testing
description: Test only.
slug: /testing
---
# Testing1
## Testing2
# Testing1
### Testing3
# Testing1
#### Testing4

macOS

If you use Homebrew, run the following commands to install the dependencies.

```
brew install java11 cmake protobuf openssl postgresql tmux
```
```
curl —proto ‘=https' —tlsv1.2 -sSf https://sh.rustup.rs (https://sh.rustup.rs/) | sh
```

Linux

```
sudo apt update

sudo apt upgrade

sudo apt install openjdk-11-jdk

sudo apt install make build-essential cmake protobuf-compiler curl openssl libssl-dev pkg-config

sudo apt install postgresql-client

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="macos" label="macOS" default>

If you use Homebrew, run the following commands to install the dependencies.

```
brew install java11 cmake protobuf openssl postgresql tmux
```
```
curl -proto '=https' -tlsv1.2 -sSf https://sh.rustup.rs (https://sh.rustup.rs/) | sh
```
  </TabItem>

  <TabItem value="linux" label="Linux">

```
sudo apt update

sudo apt upgrade

sudo apt install openjdk-11-jdk

sudo apt install make build-essential cmake protobuf-compiler curl openssl libssl-dev pkg-config

sudo apt install postgresql-client

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
  </TabItem>

</Tabs>