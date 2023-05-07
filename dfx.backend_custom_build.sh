#!/bin/sh
cargo build --release --target wasm32-unknown-unknown --package $1
ic-cdk-optimizer target/wasm32-unknown-unknown/release/$1.wasm -o=target/wasm32-unknown-unknown/release/$1.wasm.gz