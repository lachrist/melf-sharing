const VirtualProxyCheck = require("virtual-proxy/check.js");
const Melf = require("melf");
const MelfShare = require("../main.js");
const Primitives = require("./primitives.js");

const assert = (check) => {
  if (!check) {
    throw new Error("Assertion failure");
  }
};

module.exports = (address) => {
  const melf = Melf(address, "bob");
  share = MelfShare(melf, {synchronous:true});
  Object.keys(Primitives).forEach((key) => {
    const primitive = share.instantiate(melf.rpcall("alice", key));
    assert(primitive === Primitives[key] || (primitive !== primitive && Primitives[key] !== Primitives[key]));
  });
  const symbol_foo = share.instantiate(melf.rpcall("alice", "symbol_foo"));
  assert(typeof symbol_foo === "symbol");
  assert(String(symbol_foo) === "Symbol(foo)");
  assert(Symbol.keyFor(symbol_foo) === void 0);
  const symbol_iterator = share.instantiate(melf.rpcall("alice", "symbol_iterator"));
  assert(symbol_iterator === Symbol.iterator);
  const my_symbol_foo_global = Symbol.for("foo");
  const symbol_foo_global = share.instantiate(melf.rpcall("alice", "symbol_foo_global"));
  assert(symbol_foo_global === my_symbol_foo_global);
  VirtualProxyCheck.Object(share.instantiate(melf.rpcall("alice", "object")));
  VirtualProxyCheck.Array(share.instantiate(melf.rpcall("alice", "array")));
  VirtualProxyCheck.Arrow(share.instantiate(melf.rpcall("alice", "arrow")));
  VirtualProxyCheck.StrictArrow(share.instantiate(melf.rpcall("alice", "strict_arrow")));
  VirtualProxyCheck.Function(share.instantiate(melf.rpcall("alice", "function")));
  VirtualProxyCheck.StrictFunction(share.instantiate(melf.rpcall("alice", "strict_function")));
  console.log("All assertions passed!");
};
