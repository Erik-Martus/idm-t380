# idm-t380 Red Team

## About

This project is a web based coloring book built with the Eleventy static site generator.



## System Requirements

- Node JS (tested with 12.18.3) [download the Latest Stable Version](https://nodejs.org/en/)

## Installation

Clone the repo to your system with:

```shell
git clone https://github.com/Erik-Martus/idm-t380.git
```

Install node dependencies:

```shell
npm install
```

## Build

From the root directory run

```shell
gulp
```

The built site will now be available in the /build directory.

Alternatively run

```shell
gulp --prod
```

To minify compiled files.

## Run locally

```shell
http-server build
```