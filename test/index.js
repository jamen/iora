#!/usr/bin/env node

for (var m in require('../lib')) {
  try {
    m();
  } catch (e) {
    console.log('Test failed');
    throw e;
  }
  console.log('Test passed');
}
