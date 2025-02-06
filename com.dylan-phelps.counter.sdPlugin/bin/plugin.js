import e from "stream";
import t from "zlib";
import s from "buffer";
import r from "crypto";
import n from "events";
import i from "https";
import o from "http";
import a from "net";
import c from "tls";
import l from "url";
import h, { join as d } from "node:path";
import { cwd as u } from "node:process";
import f, { existsSync as p, readFileSync as _ } from "node:fs";
import { readFileSync as m, writeFileSync as g } from "fs";
/**!
 * @author Elgato
 * @module elgato/streamdeck
 * @license MIT
 * @copyright Copyright (c) Corsair Memory Inc.
 */ var y, v, b, w;
function S(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
!(function (e) {
  (e[(e.StreamDeck = 0)] = "StreamDeck"),
    (e[(e.StreamDeckMini = 1)] = "StreamDeckMini"),
    (e[(e.StreamDeckXL = 2)] = "StreamDeckXL"),
    (e[(e.StreamDeckMobile = 3)] = "StreamDeckMobile"),
    (e[(e.CorsairGKeys = 4)] = "CorsairGKeys"),
    (e[(e.StreamDeckPedal = 5)] = "StreamDeckPedal"),
    (e[(e.CorsairVoyager = 6)] = "CorsairVoyager"),
    (e[(e.StreamDeckPlus = 7)] = "StreamDeckPlus"),
    (e[(e.SCUFController = 8)] = "SCUFController"),
    (e[(e.StreamDeckNeo = 9)] = "StreamDeckNeo");
})(y || (y = {})),
  (function (e) {
    (e[(e.Rectangle = 0)] = "Rectangle"),
      (e[(e.DoubleRectangle = 1)] = "DoubleRectangle"),
      (e[(e.Trapezoid = 2)] = "Trapezoid"),
      (e[(e.DoubleTrapezoid = 3)] = "DoubleTrapezoid"),
      (e[(e.Groove = 4)] = "Groove");
  })(v || (v = {})),
  (function () {
    if (w) return b;
    w = 1;
    const { Duplex: t } = e;
    function s(e) {
      e.emit("close");
    }
    function r() {
      !this.destroyed && this._writableState.finished && this.destroy();
    }
    function n(e) {
      this.removeListener("error", n),
        this.destroy(),
        0 === this.listenerCount("error") && this.emit("error", e);
    }
    b = function (e, i) {
      let o = !0;
      const a = new t({
        ...i,
        autoDestroy: !1,
        emitClose: !1,
        objectMode: !1,
        writableObjectMode: !1,
      });
      return (
        e.on("message", function (t, s) {
          const r = !s && a._readableState.objectMode ? t.toString() : t;
          a.push(r) || e.pause();
        }),
        e.once("error", function (e) {
          a.destroyed || ((o = !1), a.destroy(e));
        }),
        e.once("close", function () {
          a.destroyed || a.push(null);
        }),
        (a._destroy = function (t, r) {
          if (e.readyState === e.CLOSED)
            return r(t), void process.nextTick(s, a);
          let n = !1;
          e.once("error", function (e) {
            (n = !0), r(e);
          }),
            e.once("close", function () {
              n || r(t), process.nextTick(s, a);
            }),
            o && e.terminate();
        }),
        (a._final = function (t) {
          e.readyState !== e.CONNECTING
            ? null !== e._socket &&
              (e._socket._writableState.finished
                ? (t(), a._readableState.endEmitted && a.destroy())
                : (e._socket.once("finish", function () {
                    t();
                  }),
                  e.close()))
            : e.once("open", function () {
                a._final(t);
              });
        }),
        (a._read = function () {
          e.isPaused && e.resume();
        }),
        (a._write = function (t, s, r) {
          e.readyState !== e.CONNECTING
            ? e.send(t, r)
            : e.once("open", function () {
                a._write(t, s, r);
              });
        }),
        a.on("end", r),
        a.on("error", n),
        a
      );
    };
  })();
var E,
  k,
  x,
  O,
  T,
  D,
  P,
  C = { exports: {} };
function I() {
  if (k) return E;
  k = 1;
  const e = ["nodebuffer", "arraybuffer", "fragments"],
    t = "undefined" != typeof Blob;
  return (
    t && e.push("blob"),
    (E = {
      BINARY_TYPES: e,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob: t,
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {},
    })
  );
}
function N() {
  if (x) return C.exports;
  x = 1;
  const { EMPTY_BUFFER: e } = I(),
    t = Buffer[Symbol.species];
  function s(e, t, s, r, n) {
    for (let i = 0; i < n; i++) s[r + i] = e[i] ^ t[3 & i];
  }
  function r(e, t) {
    for (let s = 0; s < e.length; s++) e[s] ^= t[3 & s];
  }
  if (
    ((C.exports = {
      concat: function (s, r) {
        if (0 === s.length) return e;
        if (1 === s.length) return s[0];
        const n = Buffer.allocUnsafe(r);
        let i = 0;
        for (let e = 0; e < s.length; e++) {
          const t = s[e];
          n.set(t, i), (i += t.length);
        }
        return i < r ? new t(n.buffer, n.byteOffset, i) : n;
      },
      mask: s,
      toArrayBuffer: function (e) {
        return e.length === e.buffer.byteLength
          ? e.buffer
          : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
      },
      toBuffer: function e(s) {
        if (((e.readOnly = !0), Buffer.isBuffer(s))) return s;
        let r;
        return (
          s instanceof ArrayBuffer
            ? (r = new t(s))
            : ArrayBuffer.isView(s)
              ? (r = new t(s.buffer, s.byteOffset, s.byteLength))
              : ((r = Buffer.from(s)), (e.readOnly = !1)),
          r
        );
      },
      unmask: r,
    }),
    !process.env.WS_NO_BUFFER_UTIL)
  )
    try {
      const e = require("bufferutil");
      (C.exports.mask = function (t, r, n, i, o) {
        o < 48 ? s(t, r, n, i, o) : e.mask(t, r, n, i, o);
      }),
        (C.exports.unmask = function (t, s) {
          t.length < 32 ? r(t, s) : e.unmask(t, s);
        });
    } catch (e) {}
  return C.exports;
}
function L() {
  if (P) return D;
  P = 1;
  const e = t,
    s = N(),
    r = (function () {
      if (T) return O;
      T = 1;
      const e = Symbol("kDone"),
        t = Symbol("kRun");
      return (O = class {
        constructor(s) {
          (this[e] = () => {
            this.pending--, this[t]();
          }),
            (this.concurrency = s || 1 / 0),
            (this.jobs = []),
            (this.pending = 0);
        }
        add(e) {
          this.jobs.push(e), this[t]();
        }
        [t]() {
          if (this.pending !== this.concurrency && this.jobs.length) {
            const t = this.jobs.shift();
            this.pending++, t(this[e]);
          }
        }
      });
    })(),
    { kStatusCode: n } = I(),
    i = Buffer[Symbol.species],
    o = Buffer.from([0, 0, 255, 255]),
    a = Symbol("permessage-deflate"),
    c = Symbol("total-length"),
    l = Symbol("callback"),
    h = Symbol("buffers"),
    d = Symbol("error");
  let u;
  function f(e) {
    this[h].push(e), (this[c] += e.length);
  }
  function p(e) {
    (this[c] += e.length),
      this[a]._maxPayload < 1 || this[c] <= this[a]._maxPayload
        ? this[h].push(e)
        : ((this[d] = new RangeError("Max payload size exceeded")),
          (this[d].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"),
          (this[d][n] = 1009),
          this.removeListener("data", p),
          this.reset());
  }
  function _(e) {
    (this[a]._inflate = null), (e[n] = 1007), this[l](e);
  }
  return (D = class {
    constructor(e, t, s) {
      if (
        ((this._maxPayload = 0 | s),
        (this._options = e || {}),
        (this._threshold =
          void 0 !== this._options.threshold ? this._options.threshold : 1024),
        (this._isServer = !!t),
        (this._deflate = null),
        (this._inflate = null),
        (this.params = null),
        !u)
      ) {
        const e =
          void 0 !== this._options.concurrencyLimit
            ? this._options.concurrencyLimit
            : 10;
        u = new r(e);
      }
    }
    static get extensionName() {
      return "permessage-deflate";
    }
    offer() {
      const e = {};
      return (
        this._options.serverNoContextTakeover &&
          (e.server_no_context_takeover = !0),
        this._options.clientNoContextTakeover &&
          (e.client_no_context_takeover = !0),
        this._options.serverMaxWindowBits &&
          (e.server_max_window_bits = this._options.serverMaxWindowBits),
        this._options.clientMaxWindowBits
          ? (e.client_max_window_bits = this._options.clientMaxWindowBits)
          : null == this._options.clientMaxWindowBits &&
            (e.client_max_window_bits = !0),
        e
      );
    }
    accept(e) {
      return (
        (e = this.normalizeParams(e)),
        (this.params = this._isServer
          ? this.acceptAsServer(e)
          : this.acceptAsClient(e)),
        this.params
      );
    }
    cleanup() {
      if (
        (this._inflate && (this._inflate.close(), (this._inflate = null)),
        this._deflate)
      ) {
        const e = this._deflate[l];
        this._deflate.close(),
          (this._deflate = null),
          e &&
            e(
              new Error(
                "The deflate stream was closed while data was being processed",
              ),
            );
      }
    }
    acceptAsServer(e) {
      const t = this._options,
        s = e.find(
          (e) =>
            !(
              (!1 === t.serverNoContextTakeover &&
                e.server_no_context_takeover) ||
              (e.server_max_window_bits &&
                (!1 === t.serverMaxWindowBits ||
                  ("number" == typeof t.serverMaxWindowBits &&
                    t.serverMaxWindowBits > e.server_max_window_bits))) ||
              ("number" == typeof t.clientMaxWindowBits &&
                !e.client_max_window_bits)
            ),
        );
      if (!s) throw new Error("None of the extension offers can be accepted");
      return (
        t.serverNoContextTakeover && (s.server_no_context_takeover = !0),
        t.clientNoContextTakeover && (s.client_no_context_takeover = !0),
        "number" == typeof t.serverMaxWindowBits &&
          (s.server_max_window_bits = t.serverMaxWindowBits),
        "number" == typeof t.clientMaxWindowBits
          ? (s.client_max_window_bits = t.clientMaxWindowBits)
          : (!0 !== s.client_max_window_bits && !1 !== t.clientMaxWindowBits) ||
            delete s.client_max_window_bits,
        s
      );
    }
    acceptAsClient(e) {
      const t = e[0];
      if (
        !1 === this._options.clientNoContextTakeover &&
        t.client_no_context_takeover
      )
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      if (t.client_max_window_bits) {
        if (
          !1 === this._options.clientMaxWindowBits ||
          ("number" == typeof this._options.clientMaxWindowBits &&
            t.client_max_window_bits > this._options.clientMaxWindowBits)
        )
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"',
          );
      } else
        "number" == typeof this._options.clientMaxWindowBits &&
          (t.client_max_window_bits = this._options.clientMaxWindowBits);
      return t;
    }
    normalizeParams(e) {
      return (
        e.forEach((e) => {
          Object.keys(e).forEach((t) => {
            let s = e[t];
            if (s.length > 1)
              throw new Error(`Parameter "${t}" must have only a single value`);
            if (((s = s[0]), "client_max_window_bits" === t)) {
              if (!0 !== s) {
                const e = +s;
                if (!Number.isInteger(e) || e < 8 || e > 15)
                  throw new TypeError(
                    `Invalid value for parameter "${t}": ${s}`,
                  );
                s = e;
              } else if (!this._isServer)
                throw new TypeError(`Invalid value for parameter "${t}": ${s}`);
            } else if ("server_max_window_bits" === t) {
              const e = +s;
              if (!Number.isInteger(e) || e < 8 || e > 15)
                throw new TypeError(`Invalid value for parameter "${t}": ${s}`);
              s = e;
            } else {
              if (
                "client_no_context_takeover" !== t &&
                "server_no_context_takeover" !== t
              )
                throw new Error(`Unknown parameter "${t}"`);
              if (!0 !== s)
                throw new TypeError(`Invalid value for parameter "${t}": ${s}`);
            }
            e[t] = s;
          });
        }),
        e
      );
    }
    decompress(e, t, s) {
      u.add((r) => {
        this._decompress(e, t, (e, t) => {
          r(), s(e, t);
        });
      });
    }
    compress(e, t, s) {
      u.add((r) => {
        this._compress(e, t, (e, t) => {
          r(), s(e, t);
        });
      });
    }
    _decompress(t, r, n) {
      const i = this._isServer ? "client" : "server";
      if (!this._inflate) {
        const t = `${i}_max_window_bits`,
          s =
            "number" != typeof this.params[t]
              ? e.Z_DEFAULT_WINDOWBITS
              : this.params[t];
        (this._inflate = e.createInflateRaw({
          ...this._options.zlibInflateOptions,
          windowBits: s,
        })),
          (this._inflate[a] = this),
          (this._inflate[c] = 0),
          (this._inflate[h] = []),
          this._inflate.on("error", _),
          this._inflate.on("data", p);
      }
      (this._inflate[l] = n),
        this._inflate.write(t),
        r && this._inflate.write(o),
        this._inflate.flush(() => {
          const e = this._inflate[d];
          if (e)
            return this._inflate.close(), (this._inflate = null), void n(e);
          const t = s.concat(this._inflate[h], this._inflate[c]);
          this._inflate._readableState.endEmitted
            ? (this._inflate.close(), (this._inflate = null))
            : ((this._inflate[c] = 0),
              (this._inflate[h] = []),
              r &&
                this.params[`${i}_no_context_takeover`] &&
                this._inflate.reset()),
            n(null, t);
        });
    }
    _compress(t, r, n) {
      const o = this._isServer ? "server" : "client";
      if (!this._deflate) {
        const t = `${o}_max_window_bits`,
          s =
            "number" != typeof this.params[t]
              ? e.Z_DEFAULT_WINDOWBITS
              : this.params[t];
        (this._deflate = e.createDeflateRaw({
          ...this._options.zlibDeflateOptions,
          windowBits: s,
        })),
          (this._deflate[c] = 0),
          (this._deflate[h] = []),
          this._deflate.on("data", f);
      }
      (this._deflate[l] = n),
        this._deflate.write(t),
        this._deflate.flush(e.Z_SYNC_FLUSH, () => {
          if (!this._deflate) return;
          let e = s.concat(this._deflate[h], this._deflate[c]);
          r && (e = new i(e.buffer, e.byteOffset, e.length - 4)),
            (this._deflate[l] = null),
            (this._deflate[c] = 0),
            (this._deflate[h] = []),
            r &&
              this.params[`${o}_no_context_takeover`] &&
              this._deflate.reset(),
            n(null, e);
        });
    }
  });
}
var R,
  U,
  B,
  A,
  $,
  F,
  M,
  j,
  W,
  G,
  q,
  z = { exports: {} };
function V() {
  if (R) return z.exports;
  R = 1;
  const { isUtf8: e } = s,
    { hasBlob: t } = I();
  function r(e) {
    const t = e.length;
    let s = 0;
    for (; s < t; )
      if (128 & e[s])
        if (192 == (224 & e[s])) {
          if (s + 1 === t || 128 != (192 & e[s + 1]) || 192 == (254 & e[s]))
            return !1;
          s += 2;
        } else if (224 == (240 & e[s])) {
          if (
            s + 2 >= t ||
            128 != (192 & e[s + 1]) ||
            128 != (192 & e[s + 2]) ||
            (224 === e[s] && 128 == (224 & e[s + 1])) ||
            (237 === e[s] && 160 == (224 & e[s + 1]))
          )
            return !1;
          s += 3;
        } else {
          if (240 != (248 & e[s])) return !1;
          if (
            s + 3 >= t ||
            128 != (192 & e[s + 1]) ||
            128 != (192 & e[s + 2]) ||
            128 != (192 & e[s + 3]) ||
            (240 === e[s] && 128 == (240 & e[s + 1])) ||
            (244 === e[s] && e[s + 1] > 143) ||
            e[s] > 244
          )
            return !1;
          s += 4;
        }
      else s++;
    return !0;
  }
  if (
    ((z.exports = {
      isBlob: function (e) {
        return (
          t &&
          "object" == typeof e &&
          "function" == typeof e.arrayBuffer &&
          "string" == typeof e.type &&
          "function" == typeof e.stream &&
          ("Blob" === e[Symbol.toStringTag] || "File" === e[Symbol.toStringTag])
        );
      },
      isValidStatusCode: function (e) {
        return (
          (e >= 1e3 && e <= 1014 && 1004 !== e && 1005 !== e && 1006 !== e) ||
          (e >= 3e3 && e <= 4999)
        );
      },
      isValidUTF8: r,
      tokenChars: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 0, 1, 0,
      ],
    }),
    e)
  )
    z.exports.isValidUTF8 = function (t) {
      return t.length < 24 ? r(t) : e(t);
    };
  else if (!process.env.WS_NO_UTF_8_VALIDATE)
    try {
      const e = require("utf-8-validate");
      z.exports.isValidUTF8 = function (t) {
        return t.length < 32 ? r(t) : e(t);
      };
    } catch (e) {}
  return z.exports;
}
function K() {
  if (B) return U;
  B = 1;
  const { Writable: t } = e,
    s = L(),
    { BINARY_TYPES: r, EMPTY_BUFFER: n, kStatusCode: i, kWebSocket: o } = I(),
    { concat: a, toArrayBuffer: c, unmask: l } = N(),
    { isValidStatusCode: h, isValidUTF8: d } = V(),
    u = Buffer[Symbol.species];
  return (U = class extends t {
    constructor(e = {}) {
      super(),
        (this._allowSynchronousEvents =
          void 0 === e.allowSynchronousEvents || e.allowSynchronousEvents),
        (this._binaryType = e.binaryType || r[0]),
        (this._extensions = e.extensions || {}),
        (this._isServer = !!e.isServer),
        (this._maxPayload = 0 | e.maxPayload),
        (this._skipUTF8Validation = !!e.skipUTF8Validation),
        (this[o] = void 0),
        (this._bufferedBytes = 0),
        (this._buffers = []),
        (this._compressed = !1),
        (this._payloadLength = 0),
        (this._mask = void 0),
        (this._fragmented = 0),
        (this._masked = !1),
        (this._fin = !1),
        (this._opcode = 0),
        (this._totalPayloadLength = 0),
        (this._messageLength = 0),
        (this._fragments = []),
        (this._errored = !1),
        (this._loop = !1),
        (this._state = 0);
    }
    _write(e, t, s) {
      if (8 === this._opcode && 0 == this._state) return s();
      (this._bufferedBytes += e.length),
        this._buffers.push(e),
        this.startLoop(s);
    }
    consume(e) {
      if (((this._bufferedBytes -= e), e === this._buffers[0].length))
        return this._buffers.shift();
      if (e < this._buffers[0].length) {
        const t = this._buffers[0];
        return (
          (this._buffers[0] = new u(t.buffer, t.byteOffset + e, t.length - e)),
          new u(t.buffer, t.byteOffset, e)
        );
      }
      const t = Buffer.allocUnsafe(e);
      do {
        const s = this._buffers[0],
          r = t.length - e;
        e >= s.length
          ? t.set(this._buffers.shift(), r)
          : (t.set(new Uint8Array(s.buffer, s.byteOffset, e), r),
            (this._buffers[0] = new u(
              s.buffer,
              s.byteOffset + e,
              s.length - e,
            ))),
          (e -= s.length);
      } while (e > 0);
      return t;
    }
    startLoop(e) {
      this._loop = !0;
      do {
        switch (this._state) {
          case 0:
            this.getInfo(e);
            break;
          case 1:
            this.getPayloadLength16(e);
            break;
          case 2:
            this.getPayloadLength64(e);
            break;
          case 3:
            this.getMask();
            break;
          case 4:
            this.getData(e);
            break;
          case 5:
          case 6:
            return void (this._loop = !1);
        }
      } while (this._loop);
      this._errored || e();
    }
    getInfo(e) {
      if (this._bufferedBytes < 2) return void (this._loop = !1);
      const t = this.consume(2);
      if (48 & t[0]) {
        return void e(
          this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3",
          ),
        );
      }
      const r = !(64 & ~t[0]);
      if (!r || this._extensions[s.extensionName]) {
        if (
          ((this._fin = !(128 & ~t[0])),
          (this._opcode = 15 & t[0]),
          (this._payloadLength = 127 & t[1]),
          0 === this._opcode)
        ) {
          if (r) {
            return void e(
              this.createError(
                RangeError,
                "RSV1 must be clear",
                !0,
                1002,
                "WS_ERR_UNEXPECTED_RSV_1",
              ),
            );
          }
          if (!this._fragmented) {
            return void e(
              this.createError(
                RangeError,
                "invalid opcode 0",
                !0,
                1002,
                "WS_ERR_INVALID_OPCODE",
              ),
            );
          }
          this._opcode = this._fragmented;
        } else if (1 === this._opcode || 2 === this._opcode) {
          if (this._fragmented) {
            return void e(
              this.createError(
                RangeError,
                `invalid opcode ${this._opcode}`,
                !0,
                1002,
                "WS_ERR_INVALID_OPCODE",
              ),
            );
          }
          this._compressed = r;
        } else {
          if (!(this._opcode > 7 && this._opcode < 11)) {
            return void e(
              this.createError(
                RangeError,
                `invalid opcode ${this._opcode}`,
                !0,
                1002,
                "WS_ERR_INVALID_OPCODE",
              ),
            );
          }
          if (!this._fin) {
            return void e(
              this.createError(
                RangeError,
                "FIN must be set",
                !0,
                1002,
                "WS_ERR_EXPECTED_FIN",
              ),
            );
          }
          if (r) {
            return void e(
              this.createError(
                RangeError,
                "RSV1 must be clear",
                !0,
                1002,
                "WS_ERR_UNEXPECTED_RSV_1",
              ),
            );
          }
          if (
            this._payloadLength > 125 ||
            (8 === this._opcode && 1 === this._payloadLength)
          ) {
            return void e(
              this.createError(
                RangeError,
                `invalid payload length ${this._payloadLength}`,
                !0,
                1002,
                "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH",
              ),
            );
          }
        }
        if (
          (this._fin || this._fragmented || (this._fragmented = this._opcode),
          (this._masked = !(128 & ~t[1])),
          this._isServer)
        ) {
          if (!this._masked) {
            return void e(
              this.createError(
                RangeError,
                "MASK must be set",
                !0,
                1002,
                "WS_ERR_EXPECTED_MASK",
              ),
            );
          }
        } else if (this._masked) {
          return void e(
            this.createError(
              RangeError,
              "MASK must be clear",
              !0,
              1002,
              "WS_ERR_UNEXPECTED_MASK",
            ),
          );
        }
        126 === this._payloadLength
          ? (this._state = 1)
          : 127 === this._payloadLength
            ? (this._state = 2)
            : this.haveLength(e);
      } else {
        e(
          this.createError(
            RangeError,
            "RSV1 must be clear",
            !0,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1",
          ),
        );
      }
    }
    getPayloadLength16(e) {
      this._bufferedBytes < 2
        ? (this._loop = !1)
        : ((this._payloadLength = this.consume(2).readUInt16BE(0)),
          this.haveLength(e));
    }
    getPayloadLength64(e) {
      if (this._bufferedBytes < 8) return void (this._loop = !1);
      const t = this.consume(8),
        s = t.readUInt32BE(0);
      if (s > Math.pow(2, 21) - 1) {
        e(
          this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH",
          ),
        );
      } else
        (this._payloadLength = s * Math.pow(2, 32) + t.readUInt32BE(4)),
          this.haveLength(e);
    }
    haveLength(e) {
      if (
        this._payloadLength &&
        this._opcode < 8 &&
        ((this._totalPayloadLength += this._payloadLength),
        this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)
      ) {
        e(
          this.createError(
            RangeError,
            "Max payload size exceeded",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",
          ),
        );
      } else this._masked ? (this._state = 3) : (this._state = 4);
    }
    getMask() {
      this._bufferedBytes < 4
        ? (this._loop = !1)
        : ((this._mask = this.consume(4)), (this._state = 4));
    }
    getData(e) {
      let t = n;
      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength)
          return void (this._loop = !1);
        (t = this.consume(this._payloadLength)),
          this._masked &&
            this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] &&
            l(t, this._mask);
      }
      if (this._opcode > 7) this.controlMessage(t, e);
      else {
        if (this._compressed)
          return (this._state = 5), void this.decompress(t, e);
        t.length &&
          ((this._messageLength = this._totalPayloadLength),
          this._fragments.push(t)),
          this.dataMessage(e);
      }
    }
    decompress(e, t) {
      this._extensions[s.extensionName].decompress(e, this._fin, (e, s) => {
        if (e) return t(e);
        if (s.length) {
          if (
            ((this._messageLength += s.length),
            this._messageLength > this._maxPayload && this._maxPayload > 0)
          ) {
            const e = this.createError(
              RangeError,
              "Max payload size exceeded",
              !1,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",
            );
            return void t(e);
          }
          this._fragments.push(s);
        }
        this.dataMessage(t), 0 === this._state && this.startLoop(t);
      });
    }
    dataMessage(e) {
      if (!this._fin) return void (this._state = 0);
      const t = this._messageLength,
        s = this._fragments;
      if (
        ((this._totalPayloadLength = 0),
        (this._messageLength = 0),
        (this._fragmented = 0),
        (this._fragments = []),
        2 === this._opcode)
      ) {
        let r;
        (r =
          "nodebuffer" === this._binaryType
            ? a(s, t)
            : "arraybuffer" === this._binaryType
              ? c(a(s, t))
              : "blob" === this._binaryType
                ? new Blob(s)
                : s),
          this._allowSynchronousEvents
            ? (this.emit("message", r, !0), (this._state = 0))
            : ((this._state = 6),
              setImmediate(() => {
                this.emit("message", r, !0),
                  (this._state = 0),
                  this.startLoop(e);
              }));
      } else {
        const r = a(s, t);
        if (!this._skipUTF8Validation && !d(r)) {
          const t = this.createError(
            Error,
            "invalid UTF-8 sequence",
            !0,
            1007,
            "WS_ERR_INVALID_UTF8",
          );
          return void e(t);
        }
        5 === this._state || this._allowSynchronousEvents
          ? (this.emit("message", r, !1), (this._state = 0))
          : ((this._state = 6),
            setImmediate(() => {
              this.emit("message", r, !1), (this._state = 0), this.startLoop(e);
            }));
      }
    }
    controlMessage(e, t) {
      if (8 !== this._opcode)
        this._allowSynchronousEvents
          ? (this.emit(9 === this._opcode ? "ping" : "pong", e),
            (this._state = 0))
          : ((this._state = 6),
            setImmediate(() => {
              this.emit(9 === this._opcode ? "ping" : "pong", e),
                (this._state = 0),
                this.startLoop(t);
            }));
      else {
        if (0 === e.length)
          (this._loop = !1), this.emit("conclude", 1005, n), this.end();
        else {
          const s = e.readUInt16BE(0);
          if (!h(s)) {
            const e = this.createError(
              RangeError,
              `invalid status code ${s}`,
              !0,
              1002,
              "WS_ERR_INVALID_CLOSE_CODE",
            );
            return void t(e);
          }
          const r = new u(e.buffer, e.byteOffset + 2, e.length - 2);
          if (!this._skipUTF8Validation && !d(r)) {
            const e = this.createError(
              Error,
              "invalid UTF-8 sequence",
              !0,
              1007,
              "WS_ERR_INVALID_UTF8",
            );
            return void t(e);
          }
          (this._loop = !1), this.emit("conclude", s, r), this.end();
        }
        this._state = 0;
      }
    }
    createError(e, t, s, r, n) {
      (this._loop = !1), (this._errored = !0);
      const o = new e(s ? `Invalid WebSocket frame: ${t}` : t);
      return (
        Error.captureStackTrace(o, this.createError),
        (o.code = n),
        (o[i] = r),
        o
      );
    }
  });
}
function H() {
  if ($) return A;
  $ = 1;
  const { Duplex: t } = e,
    { randomFillSync: s } = r,
    n = L(),
    { EMPTY_BUFFER: i, kWebSocket: o, NOOP: a } = I(),
    { isBlob: c, isValidStatusCode: l } = V(),
    { mask: h, toBuffer: d } = N(),
    u = Symbol("kByteLength"),
    f = Buffer.alloc(4),
    p = 8192;
  let _,
    m = p;
  class g {
    constructor(e, t, s) {
      (this._extensions = t || {}),
        s && ((this._generateMask = s), (this._maskBuffer = Buffer.alloc(4))),
        (this._socket = e),
        (this._firstFragment = !0),
        (this._compress = !1),
        (this._bufferedBytes = 0),
        (this._queue = []),
        (this._state = 0),
        (this.onerror = a),
        (this[o] = void 0);
    }
    static frame(e, t) {
      let r,
        n,
        i = !1,
        o = 2,
        a = !1;
      t.mask &&
        ((r = t.maskBuffer || f),
        t.generateMask
          ? t.generateMask(r)
          : (m === p &&
              (void 0 === _ && (_ = Buffer.alloc(p)), s(_, 0, p), (m = 0)),
            (r[0] = _[m++]),
            (r[1] = _[m++]),
            (r[2] = _[m++]),
            (r[3] = _[m++])),
        (a = !(r[0] | r[1] | r[2] | r[3])),
        (o = 6)),
        "string" == typeof e
          ? (n =
              (t.mask && !a) || void 0 === t[u]
                ? (e = Buffer.from(e)).length
                : t[u])
          : ((n = e.length), (i = t.mask && t.readOnly && !a));
      let c = n;
      n >= 65536 ? ((o += 8), (c = 127)) : n > 125 && ((o += 2), (c = 126));
      const l = Buffer.allocUnsafe(i ? n + o : o);
      return (
        (l[0] = t.fin ? 128 | t.opcode : t.opcode),
        t.rsv1 && (l[0] |= 64),
        (l[1] = c),
        126 === c
          ? l.writeUInt16BE(n, 2)
          : 127 === c && ((l[2] = l[3] = 0), l.writeUIntBE(n, 4, 6)),
        t.mask
          ? ((l[1] |= 128),
            (l[o - 4] = r[0]),
            (l[o - 3] = r[1]),
            (l[o - 2] = r[2]),
            (l[o - 1] = r[3]),
            a
              ? [l, e]
              : i
                ? (h(e, r, l, o, n), [l])
                : (h(e, r, e, 0, n), [l, e]))
          : [l, e]
      );
    }
    close(e, t, s, r) {
      let n;
      if (void 0 === e) n = i;
      else {
        if ("number" != typeof e || !l(e))
          throw new TypeError(
            "First argument must be a valid error code number",
          );
        if (void 0 !== t && t.length) {
          const s = Buffer.byteLength(t);
          if (s > 123)
            throw new RangeError(
              "The message must not be greater than 123 bytes",
            );
          (n = Buffer.allocUnsafe(2 + s)),
            n.writeUInt16BE(e, 0),
            "string" == typeof t ? n.write(t, 2) : n.set(t, 2);
        } else (n = Buffer.allocUnsafe(2)), n.writeUInt16BE(e, 0);
      }
      const o = {
        [u]: n.length,
        fin: !0,
        generateMask: this._generateMask,
        mask: s,
        maskBuffer: this._maskBuffer,
        opcode: 8,
        readOnly: !1,
        rsv1: !1,
      };
      0 !== this._state
        ? this.enqueue([this.dispatch, n, !1, o, r])
        : this.sendFrame(g.frame(n, o), r);
    }
    ping(e, t, s) {
      let r, n;
      if (
        ("string" == typeof e
          ? ((r = Buffer.byteLength(e)), (n = !1))
          : c(e)
            ? ((r = e.size), (n = !1))
            : ((r = (e = d(e)).length), (n = d.readOnly)),
        r > 125)
      )
        throw new RangeError(
          "The data size must not be greater than 125 bytes",
        );
      const i = {
        [u]: r,
        fin: !0,
        generateMask: this._generateMask,
        mask: t,
        maskBuffer: this._maskBuffer,
        opcode: 9,
        readOnly: n,
        rsv1: !1,
      };
      c(e)
        ? 0 !== this._state
          ? this.enqueue([this.getBlobData, e, !1, i, s])
          : this.getBlobData(e, !1, i, s)
        : 0 !== this._state
          ? this.enqueue([this.dispatch, e, !1, i, s])
          : this.sendFrame(g.frame(e, i), s);
    }
    pong(e, t, s) {
      let r, n;
      if (
        ("string" == typeof e
          ? ((r = Buffer.byteLength(e)), (n = !1))
          : c(e)
            ? ((r = e.size), (n = !1))
            : ((r = (e = d(e)).length), (n = d.readOnly)),
        r > 125)
      )
        throw new RangeError(
          "The data size must not be greater than 125 bytes",
        );
      const i = {
        [u]: r,
        fin: !0,
        generateMask: this._generateMask,
        mask: t,
        maskBuffer: this._maskBuffer,
        opcode: 10,
        readOnly: n,
        rsv1: !1,
      };
      c(e)
        ? 0 !== this._state
          ? this.enqueue([this.getBlobData, e, !1, i, s])
          : this.getBlobData(e, !1, i, s)
        : 0 !== this._state
          ? this.enqueue([this.dispatch, e, !1, i, s])
          : this.sendFrame(g.frame(e, i), s);
    }
    send(e, t, s) {
      const r = this._extensions[n.extensionName];
      let i,
        o,
        a = t.binary ? 2 : 1,
        l = t.compress;
      "string" == typeof e
        ? ((i = Buffer.byteLength(e)), (o = !1))
        : c(e)
          ? ((i = e.size), (o = !1))
          : ((i = (e = d(e)).length), (o = d.readOnly)),
        this._firstFragment
          ? ((this._firstFragment = !1),
            l &&
              r &&
              r.params[
                r._isServer
                  ? "server_no_context_takeover"
                  : "client_no_context_takeover"
              ] &&
              (l = i >= r._threshold),
            (this._compress = l))
          : ((l = !1), (a = 0)),
        t.fin && (this._firstFragment = !0);
      const h = {
        [u]: i,
        fin: t.fin,
        generateMask: this._generateMask,
        mask: t.mask,
        maskBuffer: this._maskBuffer,
        opcode: a,
        readOnly: o,
        rsv1: l,
      };
      c(e)
        ? 0 !== this._state
          ? this.enqueue([this.getBlobData, e, this._compress, h, s])
          : this.getBlobData(e, this._compress, h, s)
        : 0 !== this._state
          ? this.enqueue([this.dispatch, e, this._compress, h, s])
          : this.dispatch(e, this._compress, h, s);
    }
    getBlobData(e, t, s, r) {
      (this._bufferedBytes += s[u]),
        (this._state = 2),
        e
          .arrayBuffer()
          .then((e) => {
            if (this._socket.destroyed) {
              const e = new Error(
                "The socket was closed while the blob was being read",
              );
              return void process.nextTick(y, this, e, r);
            }
            this._bufferedBytes -= s[u];
            const n = d(e);
            t
              ? this.dispatch(n, t, s, r)
              : ((this._state = 0),
                this.sendFrame(g.frame(n, s), r),
                this.dequeue());
          })
          .catch((e) => {
            process.nextTick(v, this, e, r);
          });
    }
    dispatch(e, t, s, r) {
      if (!t) return void this.sendFrame(g.frame(e, s), r);
      const i = this._extensions[n.extensionName];
      (this._bufferedBytes += s[u]),
        (this._state = 1),
        i.compress(e, s.fin, (e, t) => {
          if (this._socket.destroyed) {
            y(
              this,
              new Error(
                "The socket was closed while data was being compressed",
              ),
              r,
            );
          } else
            (this._bufferedBytes -= s[u]),
              (this._state = 0),
              (s.readOnly = !1),
              this.sendFrame(g.frame(t, s), r),
              this.dequeue();
        });
    }
    dequeue() {
      for (; 0 === this._state && this._queue.length; ) {
        const e = this._queue.shift();
        (this._bufferedBytes -= e[3][u]), Reflect.apply(e[0], this, e.slice(1));
      }
    }
    enqueue(e) {
      (this._bufferedBytes += e[3][u]), this._queue.push(e);
    }
    sendFrame(e, t) {
      2 === e.length
        ? (this._socket.cork(),
          this._socket.write(e[0]),
          this._socket.write(e[1], t),
          this._socket.uncork())
        : this._socket.write(e[0], t);
    }
  }
  function y(e, t, s) {
    "function" == typeof s && s(t);
    for (let s = 0; s < e._queue.length; s++) {
      const r = e._queue[s],
        n = r[r.length - 1];
      "function" == typeof n && n(t);
    }
  }
  function v(e, t, s) {
    y(e, t, s), e.onerror(t);
  }
  return (A = g);
}
function J() {
  if (W) return j;
  W = 1;
  const { tokenChars: e } = V();
  function t(e, t, s) {
    void 0 === e[t] ? (e[t] = [s]) : e[t].push(s);
  }
  return (j = {
    format: function (e) {
      return Object.keys(e)
        .map((t) => {
          let s = e[t];
          return (
            Array.isArray(s) || (s = [s]),
            s
              .map((e) =>
                [t]
                  .concat(
                    Object.keys(e).map((t) => {
                      let s = e[t];
                      return (
                        Array.isArray(s) || (s = [s]),
                        s.map((e) => (!0 === e ? t : `${t}=${e}`)).join("; ")
                      );
                    }),
                  )
                  .join("; "),
              )
              .join(", ")
          );
        })
        .join(", ");
    },
    parse: function (s) {
      const r = Object.create(null);
      let n,
        i,
        o = Object.create(null),
        a = !1,
        c = !1,
        l = !1,
        h = -1,
        d = -1,
        u = -1,
        f = 0;
      for (; f < s.length; f++)
        if (((d = s.charCodeAt(f)), void 0 === n))
          if (-1 === u && 1 === e[d]) -1 === h && (h = f);
          else if (0 === f || (32 !== d && 9 !== d)) {
            if (59 !== d && 44 !== d)
              throw new SyntaxError(`Unexpected character at index ${f}`);
            {
              if (-1 === h)
                throw new SyntaxError(`Unexpected character at index ${f}`);
              -1 === u && (u = f);
              const e = s.slice(h, u);
              44 === d ? (t(r, e, o), (o = Object.create(null))) : (n = e),
                (h = u = -1);
            }
          } else -1 === u && -1 !== h && (u = f);
        else if (void 0 === i)
          if (-1 === u && 1 === e[d]) -1 === h && (h = f);
          else if (32 === d || 9 === d) -1 === u && -1 !== h && (u = f);
          else if (59 === d || 44 === d) {
            if (-1 === h)
              throw new SyntaxError(`Unexpected character at index ${f}`);
            -1 === u && (u = f),
              t(o, s.slice(h, u), !0),
              44 === d && (t(r, n, o), (o = Object.create(null)), (n = void 0)),
              (h = u = -1);
          } else {
            if (61 !== d || -1 === h || -1 !== u)
              throw new SyntaxError(`Unexpected character at index ${f}`);
            (i = s.slice(h, f)), (h = u = -1);
          }
        else if (c) {
          if (1 !== e[d])
            throw new SyntaxError(`Unexpected character at index ${f}`);
          -1 === h ? (h = f) : a || (a = !0), (c = !1);
        } else if (l)
          if (1 === e[d]) -1 === h && (h = f);
          else if (34 === d && -1 !== h) (l = !1), (u = f);
          else {
            if (92 !== d)
              throw new SyntaxError(`Unexpected character at index ${f}`);
            c = !0;
          }
        else if (34 === d && 61 === s.charCodeAt(f - 1)) l = !0;
        else if (-1 === u && 1 === e[d]) -1 === h && (h = f);
        else if (-1 === h || (32 !== d && 9 !== d)) {
          if (59 !== d && 44 !== d)
            throw new SyntaxError(`Unexpected character at index ${f}`);
          {
            if (-1 === h)
              throw new SyntaxError(`Unexpected character at index ${f}`);
            -1 === u && (u = f);
            let e = s.slice(h, u);
            a && ((e = e.replace(/\\/g, "")), (a = !1)),
              t(o, i, e),
              44 === d && (t(r, n, o), (o = Object.create(null)), (n = void 0)),
              (i = void 0),
              (h = u = -1);
          }
        } else -1 === u && (u = f);
      if (-1 === h || l || 32 === d || 9 === d)
        throw new SyntaxError("Unexpected end of input");
      -1 === u && (u = f);
      const p = s.slice(h, u);
      return (
        void 0 === n
          ? t(r, p, o)
          : (void 0 === i ? t(o, p, !0) : t(o, i, a ? p.replace(/\\/g, "") : p),
            t(r, n, o)),
        r
      );
    },
  });
}
function Y() {
  if (q) return G;
  q = 1;
  const t = n,
    s = i,
    h = o,
    d = a,
    u = c,
    { randomBytes: f, createHash: p } = r,
    { Duplex: _, Readable: m } = e,
    { URL: g } = l,
    y = L(),
    v = K(),
    b = H(),
    { isBlob: w } = V(),
    {
      BINARY_TYPES: S,
      EMPTY_BUFFER: E,
      GUID: k,
      kForOnEventAttribute: x,
      kListener: O,
      kStatusCode: T,
      kWebSocket: D,
      NOOP: P,
    } = I(),
    {
      EventTarget: { addEventListener: C, removeEventListener: R },
    } = (function () {
      if (M) return F;
      M = 1;
      const { kForOnEventAttribute: e, kListener: t } = I(),
        s = Symbol("kCode"),
        r = Symbol("kData"),
        n = Symbol("kError"),
        i = Symbol("kMessage"),
        o = Symbol("kReason"),
        a = Symbol("kTarget"),
        c = Symbol("kType"),
        l = Symbol("kWasClean");
      class h {
        constructor(e) {
          (this[a] = null), (this[c] = e);
        }
        get target() {
          return this[a];
        }
        get type() {
          return this[c];
        }
      }
      Object.defineProperty(h.prototype, "target", { enumerable: !0 }),
        Object.defineProperty(h.prototype, "type", { enumerable: !0 });
      class d extends h {
        constructor(e, t = {}) {
          super(e),
            (this[s] = void 0 === t.code ? 0 : t.code),
            (this[o] = void 0 === t.reason ? "" : t.reason),
            (this[l] = void 0 !== t.wasClean && t.wasClean);
        }
        get code() {
          return this[s];
        }
        get reason() {
          return this[o];
        }
        get wasClean() {
          return this[l];
        }
      }
      Object.defineProperty(d.prototype, "code", { enumerable: !0 }),
        Object.defineProperty(d.prototype, "reason", { enumerable: !0 }),
        Object.defineProperty(d.prototype, "wasClean", { enumerable: !0 });
      class u extends h {
        constructor(e, t = {}) {
          super(e),
            (this[n] = void 0 === t.error ? null : t.error),
            (this[i] = void 0 === t.message ? "" : t.message);
        }
        get error() {
          return this[n];
        }
        get message() {
          return this[i];
        }
      }
      Object.defineProperty(u.prototype, "error", { enumerable: !0 }),
        Object.defineProperty(u.prototype, "message", { enumerable: !0 });
      class f extends h {
        constructor(e, t = {}) {
          super(e), (this[r] = void 0 === t.data ? null : t.data);
        }
        get data() {
          return this[r];
        }
      }
      Object.defineProperty(f.prototype, "data", { enumerable: !0 });
      const p = {
        addEventListener(s, r, n = {}) {
          for (const i of this.listeners(s))
            if (!n[e] && i[t] === r && !i[e]) return;
          let i;
          if ("message" === s)
            i = function (e, t) {
              const s = new f("message", { data: t ? e : e.toString() });
              (s[a] = this), _(r, this, s);
            };
          else if ("close" === s)
            i = function (e, t) {
              const s = new d("close", {
                code: e,
                reason: t.toString(),
                wasClean: this._closeFrameReceived && this._closeFrameSent,
              });
              (s[a] = this), _(r, this, s);
            };
          else if ("error" === s)
            i = function (e) {
              const t = new u("error", { error: e, message: e.message });
              (t[a] = this), _(r, this, t);
            };
          else {
            if ("open" !== s) return;
            i = function () {
              const e = new h("open");
              (e[a] = this), _(r, this, e);
            };
          }
          (i[e] = !!n[e]), (i[t] = r), n.once ? this.once(s, i) : this.on(s, i);
        },
        removeEventListener(s, r) {
          for (const n of this.listeners(s))
            if (n[t] === r && !n[e]) {
              this.removeListener(s, n);
              break;
            }
        },
      };
      function _(e, t, s) {
        "object" == typeof e && e.handleEvent
          ? e.handleEvent.call(e, s)
          : e.call(t, s);
      }
      return (F = {
        CloseEvent: d,
        ErrorEvent: u,
        Event: h,
        EventTarget: p,
        MessageEvent: f,
      });
    })(),
    { format: U, parse: B } = J(),
    { toBuffer: A } = N(),
    $ = Symbol("kAborted"),
    j = [8, 13],
    W = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"],
    z = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
  class Y extends t {
    constructor(e, t, s) {
      super(),
        (this._binaryType = S[0]),
        (this._closeCode = 1006),
        (this._closeFrameReceived = !1),
        (this._closeFrameSent = !1),
        (this._closeMessage = E),
        (this._closeTimer = null),
        (this._errorEmitted = !1),
        (this._extensions = {}),
        (this._paused = !1),
        (this._protocol = ""),
        (this._readyState = Y.CONNECTING),
        (this._receiver = null),
        (this._sender = null),
        (this._socket = null),
        null !== e
          ? ((this._bufferedAmount = 0),
            (this._isServer = !1),
            (this._redirects = 0),
            void 0 === t
              ? (t = [])
              : Array.isArray(t) ||
                ("object" == typeof t && null !== t
                  ? ((s = t), (t = []))
                  : (t = [t])),
            X(this, e, t, s))
          : ((this._autoPong = s.autoPong), (this._isServer = !0));
    }
    get binaryType() {
      return this._binaryType;
    }
    set binaryType(e) {
      S.includes(e) &&
        ((this._binaryType = e),
        this._receiver && (this._receiver._binaryType = e));
    }
    get bufferedAmount() {
      return this._socket
        ? this._socket._writableState.length + this._sender._bufferedBytes
        : this._bufferedAmount;
    }
    get extensions() {
      return Object.keys(this._extensions).join();
    }
    get isPaused() {
      return this._paused;
    }
    get onclose() {
      return null;
    }
    get onerror() {
      return null;
    }
    get onopen() {
      return null;
    }
    get onmessage() {
      return null;
    }
    get protocol() {
      return this._protocol;
    }
    get readyState() {
      return this._readyState;
    }
    get url() {
      return this._url;
    }
    setSocket(e, t, s) {
      const r = new v({
          allowSynchronousEvents: s.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: s.maxPayload,
          skipUTF8Validation: s.skipUTF8Validation,
        }),
        n = new b(e, this._extensions, s.generateMask);
      (this._receiver = r),
        (this._sender = n),
        (this._socket = e),
        (r[D] = this),
        (n[D] = this),
        (e[D] = this),
        r.on("conclude", re),
        r.on("drain", ne),
        r.on("error", ie),
        r.on("message", ae),
        r.on("ping", ce),
        r.on("pong", le),
        (n.onerror = de),
        e.setTimeout && e.setTimeout(0),
        e.setNoDelay && e.setNoDelay(),
        t.length > 0 && e.unshift(t),
        e.on("close", fe),
        e.on("data", pe),
        e.on("end", _e),
        e.on("error", me),
        (this._readyState = Y.OPEN),
        this.emit("open");
    }
    emitClose() {
      if (!this._socket)
        return (
          (this._readyState = Y.CLOSED),
          void this.emit("close", this._closeCode, this._closeMessage)
        );
      this._extensions[y.extensionName] &&
        this._extensions[y.extensionName].cleanup(),
        this._receiver.removeAllListeners(),
        (this._readyState = Y.CLOSED),
        this.emit("close", this._closeCode, this._closeMessage);
    }
    close(e, t) {
      if (this.readyState !== Y.CLOSED)
        if (this.readyState !== Y.CONNECTING)
          this.readyState !== Y.CLOSING
            ? ((this._readyState = Y.CLOSING),
              this._sender.close(e, t, !this._isServer, (e) => {
                e ||
                  ((this._closeFrameSent = !0),
                  (this._closeFrameReceived ||
                    this._receiver._writableState.errorEmitted) &&
                    this._socket.end());
              }),
              ue(this))
            : this._closeFrameSent &&
              (this._closeFrameReceived ||
                this._receiver._writableState.errorEmitted) &&
              this._socket.end();
        else {
          const e =
            "WebSocket was closed before the connection was established";
          te(this, this._req, e);
        }
    }
    pause() {
      this.readyState !== Y.CONNECTING &&
        this.readyState !== Y.CLOSED &&
        ((this._paused = !0), this._socket.pause());
    }
    ping(e, t, s) {
      if (this.readyState === Y.CONNECTING)
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      "function" == typeof e
        ? ((s = e), (e = t = void 0))
        : "function" == typeof t && ((s = t), (t = void 0)),
        "number" == typeof e && (e = e.toString()),
        this.readyState === Y.OPEN
          ? (void 0 === t && (t = !this._isServer),
            this._sender.ping(e || E, t, s))
          : se(this, e, s);
    }
    pong(e, t, s) {
      if (this.readyState === Y.CONNECTING)
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      "function" == typeof e
        ? ((s = e), (e = t = void 0))
        : "function" == typeof t && ((s = t), (t = void 0)),
        "number" == typeof e && (e = e.toString()),
        this.readyState === Y.OPEN
          ? (void 0 === t && (t = !this._isServer),
            this._sender.pong(e || E, t, s))
          : se(this, e, s);
    }
    resume() {
      this.readyState !== Y.CONNECTING &&
        this.readyState !== Y.CLOSED &&
        ((this._paused = !1),
        this._receiver._writableState.needDrain || this._socket.resume());
    }
    send(e, t, s) {
      if (this.readyState === Y.CONNECTING)
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      if (
        ("function" == typeof t && ((s = t), (t = {})),
        "number" == typeof e && (e = e.toString()),
        this.readyState !== Y.OPEN)
      )
        return void se(this, e, s);
      const r = {
        binary: "string" != typeof e,
        mask: !this._isServer,
        compress: !0,
        fin: !0,
        ...t,
      };
      this._extensions[y.extensionName] || (r.compress = !1),
        this._sender.send(e || E, r, s);
    }
    terminate() {
      if (this.readyState !== Y.CLOSED)
        if (this.readyState !== Y.CONNECTING)
          this._socket &&
            ((this._readyState = Y.CLOSING), this._socket.destroy());
        else {
          const e =
            "WebSocket was closed before the connection was established";
          te(this, this._req, e);
        }
    }
  }
  function X(e, t, r, n) {
    const i = {
      allowSynchronousEvents: !0,
      autoPong: !0,
      protocolVersion: j[1],
      maxPayload: 104857600,
      skipUTF8Validation: !1,
      perMessageDeflate: !0,
      followRedirects: !1,
      maxRedirects: 10,
      ...n,
      socketPath: void 0,
      hostname: void 0,
      protocol: void 0,
      timeout: void 0,
      method: "GET",
      host: void 0,
      path: void 0,
      port: void 0,
    };
    if (((e._autoPong = i.autoPong), !j.includes(i.protocolVersion)))
      throw new RangeError(
        `Unsupported protocol version: ${i.protocolVersion} (supported versions: ${j.join(", ")})`,
      );
    let o;
    if (t instanceof g) o = t;
    else
      try {
        o = new g(t);
      } catch (e) {
        throw new SyntaxError(`Invalid URL: ${t}`);
      }
    "http:" === o.protocol
      ? (o.protocol = "ws:")
      : "https:" === o.protocol && (o.protocol = "wss:"),
      (e._url = o.href);
    const a = "wss:" === o.protocol,
      c = "ws+unix:" === o.protocol;
    let l;
    if (
      ("ws:" === o.protocol || a || c
        ? c && !o.pathname
          ? (l = "The URL's pathname is empty")
          : o.hash && (l = "The URL contains a fragment identifier")
        : (l =
            'The URL\'s protocol must be one of "ws:", "wss:", "http:", "https", or "ws+unix:"'),
      l)
    ) {
      const t = new SyntaxError(l);
      if (0 === e._redirects) throw t;
      return void Z(e, t);
    }
    const d = a ? 443 : 80,
      u = f(16).toString("base64"),
      _ = a ? s.request : h.request,
      m = new Set();
    let v, b;
    if (
      ((i.createConnection = i.createConnection || (a ? ee : Q)),
      (i.defaultPort = i.defaultPort || d),
      (i.port = o.port || d),
      (i.host = o.hostname.startsWith("[")
        ? o.hostname.slice(1, -1)
        : o.hostname),
      (i.headers = {
        ...i.headers,
        "Sec-WebSocket-Version": i.protocolVersion,
        "Sec-WebSocket-Key": u,
        Connection: "Upgrade",
        Upgrade: "websocket",
      }),
      (i.path = o.pathname + o.search),
      (i.timeout = i.handshakeTimeout),
      i.perMessageDeflate &&
        ((v = new y(
          !0 !== i.perMessageDeflate ? i.perMessageDeflate : {},
          !1,
          i.maxPayload,
        )),
        (i.headers["Sec-WebSocket-Extensions"] = U({
          [y.extensionName]: v.offer(),
        }))),
      r.length)
    ) {
      for (const e of r) {
        if ("string" != typeof e || !z.test(e) || m.has(e))
          throw new SyntaxError(
            "An invalid or duplicated subprotocol was specified",
          );
        m.add(e);
      }
      i.headers["Sec-WebSocket-Protocol"] = r.join(",");
    }
    if (
      (i.origin &&
        (i.protocolVersion < 13
          ? (i.headers["Sec-WebSocket-Origin"] = i.origin)
          : (i.headers.Origin = i.origin)),
      (o.username || o.password) && (i.auth = `${o.username}:${o.password}`),
      c)
    ) {
      const e = i.path.split(":");
      (i.socketPath = e[0]), (i.path = e[1]);
    }
    if (i.followRedirects) {
      if (0 === e._redirects) {
        (e._originalIpc = c),
          (e._originalSecure = a),
          (e._originalHostOrSocketPath = c ? i.socketPath : o.host);
        const t = n && n.headers;
        if (((n = { ...n, headers: {} }), t))
          for (const [e, s] of Object.entries(t))
            n.headers[e.toLowerCase()] = s;
      } else if (0 === e.listenerCount("redirect")) {
        const t = c
          ? !!e._originalIpc && i.socketPath === e._originalHostOrSocketPath
          : !e._originalIpc && o.host === e._originalHostOrSocketPath;
        (!t || (e._originalSecure && !a)) &&
          (delete i.headers.authorization,
          delete i.headers.cookie,
          t || delete i.headers.host,
          (i.auth = void 0));
      }
      i.auth &&
        !n.headers.authorization &&
        (n.headers.authorization =
          "Basic " + Buffer.from(i.auth).toString("base64")),
        (b = e._req = _(i)),
        e._redirects && e.emit("redirect", e.url, b);
    } else b = e._req = _(i);
    i.timeout &&
      b.on("timeout", () => {
        te(e, b, "Opening handshake has timed out");
      }),
      b.on("error", (t) => {
        null === b || b[$] || ((b = e._req = null), Z(e, t));
      }),
      b.on("response", (s) => {
        const o = s.headers.location,
          a = s.statusCode;
        if (o && i.followRedirects && a >= 300 && a < 400) {
          if (++e._redirects > i.maxRedirects)
            return void te(e, b, "Maximum redirects exceeded");
          let s;
          b.abort();
          try {
            s = new g(o, t);
          } catch (t) {
            const s = new SyntaxError(`Invalid URL: ${o}`);
            return void Z(e, s);
          }
          X(e, s, r, n);
        } else
          e.emit("unexpected-response", b, s) ||
            te(e, b, `Unexpected server response: ${s.statusCode}`);
      }),
      b.on("upgrade", (t, s, r) => {
        if ((e.emit("upgrade", t), e.readyState !== Y.CONNECTING)) return;
        b = e._req = null;
        const n = t.headers.upgrade;
        if (void 0 === n || "websocket" !== n.toLowerCase())
          return void te(e, s, "Invalid Upgrade header");
        const o = p("sha1")
          .update(u + k)
          .digest("base64");
        if (t.headers["sec-websocket-accept"] !== o)
          return void te(e, s, "Invalid Sec-WebSocket-Accept header");
        const a = t.headers["sec-websocket-protocol"];
        let c;
        if (
          (void 0 !== a
            ? m.size
              ? m.has(a) || (c = "Server sent an invalid subprotocol")
              : (c = "Server sent a subprotocol but none was requested")
            : m.size && (c = "Server sent no subprotocol"),
          c)
        )
          return void te(e, s, c);
        a && (e._protocol = a);
        const l = t.headers["sec-websocket-extensions"];
        if (void 0 !== l) {
          if (!v) {
            return void te(
              e,
              s,
              "Server sent a Sec-WebSocket-Extensions header but no extension was requested",
            );
          }
          let t;
          try {
            t = B(l);
          } catch (t) {
            return void te(e, s, "Invalid Sec-WebSocket-Extensions header");
          }
          const r = Object.keys(t);
          if (1 !== r.length || r[0] !== y.extensionName) {
            return void te(
              e,
              s,
              "Server indicated an extension that was not requested",
            );
          }
          try {
            v.accept(t[y.extensionName]);
          } catch (t) {
            return void te(e, s, "Invalid Sec-WebSocket-Extensions header");
          }
          e._extensions[y.extensionName] = v;
        }
        e.setSocket(s, r, {
          allowSynchronousEvents: i.allowSynchronousEvents,
          generateMask: i.generateMask,
          maxPayload: i.maxPayload,
          skipUTF8Validation: i.skipUTF8Validation,
        });
      }),
      i.finishRequest ? i.finishRequest(b, e) : b.end();
  }
  function Z(e, t) {
    (e._readyState = Y.CLOSING),
      (e._errorEmitted = !0),
      e.emit("error", t),
      e.emitClose();
  }
  function Q(e) {
    return (e.path = e.socketPath), d.connect(e);
  }
  function ee(e) {
    return (
      (e.path = void 0),
      e.servername ||
        "" === e.servername ||
        (e.servername = d.isIP(e.host) ? "" : e.host),
      u.connect(e)
    );
  }
  function te(e, t, s) {
    e._readyState = Y.CLOSING;
    const r = new Error(s);
    Error.captureStackTrace(r, te),
      t.setHeader
        ? ((t[$] = !0),
          t.abort(),
          t.socket && !t.socket.destroyed && t.socket.destroy(),
          process.nextTick(Z, e, r))
        : (t.destroy(r),
          t.once("error", e.emit.bind(e, "error")),
          t.once("close", e.emitClose.bind(e)));
  }
  function se(e, t, s) {
    if (t) {
      const s = w(t) ? t.size : A(t).length;
      e._socket ? (e._sender._bufferedBytes += s) : (e._bufferedAmount += s);
    }
    if (s) {
      const t = new Error(
        `WebSocket is not open: readyState ${e.readyState} (${W[e.readyState]})`,
      );
      process.nextTick(s, t);
    }
  }
  function re(e, t) {
    const s = this[D];
    (s._closeFrameReceived = !0),
      (s._closeMessage = t),
      (s._closeCode = e),
      void 0 !== s._socket[D] &&
        (s._socket.removeListener("data", pe),
        process.nextTick(he, s._socket),
        1005 === e ? s.close() : s.close(e, t));
  }
  function ne() {
    const e = this[D];
    e.isPaused || e._socket.resume();
  }
  function ie(e) {
    const t = this[D];
    void 0 !== t._socket[D] &&
      (t._socket.removeListener("data", pe),
      process.nextTick(he, t._socket),
      t.close(e[T])),
      t._errorEmitted || ((t._errorEmitted = !0), t.emit("error", e));
  }
  function oe() {
    this[D].emitClose();
  }
  function ae(e, t) {
    this[D].emit("message", e, t);
  }
  function ce(e) {
    const t = this[D];
    t._autoPong && t.pong(e, !this._isServer, P), t.emit("ping", e);
  }
  function le(e) {
    this[D].emit("pong", e);
  }
  function he(e) {
    e.resume();
  }
  function de(e) {
    const t = this[D];
    t.readyState !== Y.CLOSED &&
      (t.readyState === Y.OPEN && ((t._readyState = Y.CLOSING), ue(t)),
      this._socket.end(),
      t._errorEmitted || ((t._errorEmitted = !0), t.emit("error", e)));
  }
  function ue(e) {
    e._closeTimer = setTimeout(e._socket.destroy.bind(e._socket), 3e4);
  }
  function fe() {
    const e = this[D];
    let t;
    this.removeListener("close", fe),
      this.removeListener("data", pe),
      this.removeListener("end", _e),
      (e._readyState = Y.CLOSING),
      this._readableState.endEmitted ||
        e._closeFrameReceived ||
        e._receiver._writableState.errorEmitted ||
        null === (t = e._socket.read()) ||
        e._receiver.write(t),
      e._receiver.end(),
      (this[D] = void 0),
      clearTimeout(e._closeTimer),
      e._receiver._writableState.finished ||
      e._receiver._writableState.errorEmitted
        ? e.emitClose()
        : (e._receiver.on("error", oe), e._receiver.on("finish", oe));
  }
  function pe(e) {
    this[D]._receiver.write(e) || this.pause();
  }
  function _e() {
    const e = this[D];
    (e._readyState = Y.CLOSING), e._receiver.end(), this.end();
  }
  function me() {
    const e = this[D];
    this.removeListener("error", me),
      this.on("error", P),
      e && ((e._readyState = Y.CLOSING), this.destroy());
  }
  return (
    Object.defineProperty(Y, "CONNECTING", {
      enumerable: !0,
      value: W.indexOf("CONNECTING"),
    }),
    Object.defineProperty(Y.prototype, "CONNECTING", {
      enumerable: !0,
      value: W.indexOf("CONNECTING"),
    }),
    Object.defineProperty(Y, "OPEN", {
      enumerable: !0,
      value: W.indexOf("OPEN"),
    }),
    Object.defineProperty(Y.prototype, "OPEN", {
      enumerable: !0,
      value: W.indexOf("OPEN"),
    }),
    Object.defineProperty(Y, "CLOSING", {
      enumerable: !0,
      value: W.indexOf("CLOSING"),
    }),
    Object.defineProperty(Y.prototype, "CLOSING", {
      enumerable: !0,
      value: W.indexOf("CLOSING"),
    }),
    Object.defineProperty(Y, "CLOSED", {
      enumerable: !0,
      value: W.indexOf("CLOSED"),
    }),
    Object.defineProperty(Y.prototype, "CLOSED", {
      enumerable: !0,
      value: W.indexOf("CLOSED"),
    }),
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url",
    ].forEach((e) => {
      Object.defineProperty(Y.prototype, e, { enumerable: !0 });
    }),
    ["open", "error", "close", "message"].forEach((e) => {
      Object.defineProperty(Y.prototype, `on${e}`, {
        enumerable: !0,
        get() {
          for (const t of this.listeners(e)) if (t[x]) return t[O];
          return null;
        },
        set(t) {
          for (const t of this.listeners(e))
            if (t[x]) {
              this.removeListener(e, t);
              break;
            }
          "function" == typeof t && this.addEventListener(e, t, { [x]: !0 });
        },
      });
    }),
    (Y.prototype.addEventListener = C),
    (Y.prototype.removeEventListener = R),
    (G = Y)
  );
}
K(), H();
var X,
  Z,
  Q,
  ee,
  te = S(Y());
function se() {
  if (Z) return X;
  Z = 1;
  const { tokenChars: e } = V();
  return (X = {
    parse: function (t) {
      const s = new Set();
      let r = -1,
        n = -1,
        i = 0;
      for (; i < t.length; i++) {
        const o = t.charCodeAt(i);
        if (-1 === n && 1 === e[o]) -1 === r && (r = i);
        else if (0 === i || (32 !== o && 9 !== o)) {
          if (44 !== o)
            throw new SyntaxError(`Unexpected character at index ${i}`);
          {
            if (-1 === r)
              throw new SyntaxError(`Unexpected character at index ${i}`);
            -1 === n && (n = i);
            const e = t.slice(r, n);
            if (s.has(e))
              throw new SyntaxError(`The "${e}" subprotocol is duplicated`);
            s.add(e), (r = n = -1);
          }
        } else -1 === n && -1 !== r && (n = i);
      }
      if (-1 === r || -1 !== n)
        throw new SyntaxError("Unexpected end of input");
      const o = t.slice(r, i);
      if (s.has(o))
        throw new SyntaxError(`The "${o}" subprotocol is duplicated`);
      return s.add(o), s;
    },
  });
}
!(function () {
  if (ee) return Q;
  ee = 1;
  const t = n,
    s = o,
    { Duplex: i } = e,
    { createHash: a } = r,
    c = J(),
    l = L(),
    h = se(),
    d = Y(),
    { GUID: u, kWebSocket: f } = I(),
    p = /^[+/0-9A-Za-z]{22}==$/;
  function _(e) {
    (e._state = 2), e.emit("close");
  }
  function m() {
    this.destroy();
  }
  function g(e, t, r, n) {
    (r = r || s.STATUS_CODES[t]),
      (n = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(r),
        ...n,
      }),
      e.once("finish", e.destroy),
      e.end(
        `HTTP/1.1 ${t} ${s.STATUS_CODES[t]}\r\n` +
          Object.keys(n)
            .map((e) => `${e}: ${n[e]}`)
            .join("\r\n") +
          "\r\n\r\n" +
          r,
      );
  }
  function y(e, t, s, r, n) {
    if (e.listenerCount("wsClientError")) {
      const r = new Error(n);
      Error.captureStackTrace(r, y), e.emit("wsClientError", r, s, t);
    } else g(s, r, n);
  }
  Q = class extends t {
    constructor(e, t) {
      if (
        (super(),
        (null ==
          (e = {
            allowSynchronousEvents: !0,
            autoPong: !0,
            maxPayload: 104857600,
            skipUTF8Validation: !1,
            perMessageDeflate: !1,
            handleProtocols: null,
            clientTracking: !0,
            verifyClient: null,
            noServer: !1,
            backlog: null,
            server: null,
            host: null,
            path: null,
            port: null,
            WebSocket: d,
            ...e,
          }).port &&
          !e.server &&
          !e.noServer) ||
          (null != e.port && (e.server || e.noServer)) ||
          (e.server && e.noServer))
      )
        throw new TypeError(
          'One and only one of the "port", "server", or "noServer" options must be specified',
        );
      if (
        (null != e.port
          ? ((this._server = s.createServer((e, t) => {
              const r = s.STATUS_CODES[426];
              t.writeHead(426, {
                "Content-Length": r.length,
                "Content-Type": "text/plain",
              }),
                t.end(r);
            })),
            this._server.listen(e.port, e.host, e.backlog, t))
          : e.server && (this._server = e.server),
        this._server)
      ) {
        const e = this.emit.bind(this, "connection");
        this._removeListeners = (function (e, t) {
          for (const s of Object.keys(t)) e.on(s, t[s]);
          return function () {
            for (const s of Object.keys(t)) e.removeListener(s, t[s]);
          };
        })(this._server, {
          listening: this.emit.bind(this, "listening"),
          error: this.emit.bind(this, "error"),
          upgrade: (t, s, r) => {
            this.handleUpgrade(t, s, r, e);
          },
        });
      }
      !0 === e.perMessageDeflate && (e.perMessageDeflate = {}),
        e.clientTracking &&
          ((this.clients = new Set()), (this._shouldEmitClose = !1)),
        (this.options = e),
        (this._state = 0);
    }
    address() {
      if (this.options.noServer)
        throw new Error('The server is operating in "noServer" mode');
      return this._server ? this._server.address() : null;
    }
    close(e) {
      if (2 === this._state)
        return (
          e &&
            this.once("close", () => {
              e(new Error("The server is not running"));
            }),
          void process.nextTick(_, this)
        );
      if ((e && this.once("close", e), 1 !== this._state))
        if (((this._state = 1), this.options.noServer || this.options.server))
          this._server &&
            (this._removeListeners(),
            (this._removeListeners = this._server = null)),
            this.clients && this.clients.size
              ? (this._shouldEmitClose = !0)
              : process.nextTick(_, this);
        else {
          const e = this._server;
          this._removeListeners(),
            (this._removeListeners = this._server = null),
            e.close(() => {
              _(this);
            });
        }
    }
    shouldHandle(e) {
      if (this.options.path) {
        const t = e.url.indexOf("?");
        if ((-1 !== t ? e.url.slice(0, t) : e.url) !== this.options.path)
          return !1;
      }
      return !0;
    }
    handleUpgrade(e, t, s, r) {
      t.on("error", m);
      const n = e.headers["sec-websocket-key"],
        i = e.headers.upgrade,
        o = +e.headers["sec-websocket-version"];
      if ("GET" !== e.method) {
        return void y(this, e, t, 405, "Invalid HTTP method");
      }
      if (void 0 === i || "websocket" !== i.toLowerCase()) {
        return void y(this, e, t, 400, "Invalid Upgrade header");
      }
      if (void 0 === n || !p.test(n)) {
        return void y(
          this,
          e,
          t,
          400,
          "Missing or invalid Sec-WebSocket-Key header",
        );
      }
      if (8 !== o && 13 !== o) {
        return void y(
          this,
          e,
          t,
          400,
          "Missing or invalid Sec-WebSocket-Version header",
        );
      }
      if (!this.shouldHandle(e)) return void g(t, 400);
      const a = e.headers["sec-websocket-protocol"];
      let d = new Set();
      if (void 0 !== a)
        try {
          d = h.parse(a);
        } catch (s) {
          return void y(
            this,
            e,
            t,
            400,
            "Invalid Sec-WebSocket-Protocol header",
          );
        }
      const u = e.headers["sec-websocket-extensions"],
        f = {};
      if (this.options.perMessageDeflate && void 0 !== u) {
        const s = new l(
          this.options.perMessageDeflate,
          !0,
          this.options.maxPayload,
        );
        try {
          const e = c.parse(u);
          e[l.extensionName] &&
            (s.accept(e[l.extensionName]), (f[l.extensionName] = s));
        } catch (s) {
          return void y(
            this,
            e,
            t,
            400,
            "Invalid or unacceptable Sec-WebSocket-Extensions header",
          );
        }
      }
      if (this.options.verifyClient) {
        const i = {
          origin: e.headers["" + (8 === o ? "sec-websocket-origin" : "origin")],
          secure: !(!e.socket.authorized && !e.socket.encrypted),
          req: e,
        };
        if (2 === this.options.verifyClient.length)
          return void this.options.verifyClient(i, (i, o, a, c) => {
            if (!i) return g(t, o || 401, a, c);
            this.completeUpgrade(f, n, d, e, t, s, r);
          });
        if (!this.options.verifyClient(i)) return g(t, 401);
      }
      this.completeUpgrade(f, n, d, e, t, s, r);
    }
    completeUpgrade(e, t, s, r, n, i, o) {
      if (!n.readable || !n.writable) return n.destroy();
      if (n[f])
        throw new Error(
          "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration",
        );
      if (this._state > 0) return g(n, 503);
      const h = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${a("sha1")
            .update(t + u)
            .digest("base64")}`,
        ],
        d = new this.options.WebSocket(null, void 0, this.options);
      if (s.size) {
        const e = this.options.handleProtocols
          ? this.options.handleProtocols(s, r)
          : s.values().next().value;
        e && (h.push(`Sec-WebSocket-Protocol: ${e}`), (d._protocol = e));
      }
      if (e[l.extensionName]) {
        const t = e[l.extensionName].params,
          s = c.format({ [l.extensionName]: [t] });
        h.push(`Sec-WebSocket-Extensions: ${s}`), (d._extensions = e);
      }
      this.emit("headers", h, r),
        n.write(h.concat("\r\n").join("\r\n")),
        n.removeListener("error", m),
        d.setSocket(n, i, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation,
        }),
        this.clients &&
          (this.clients.add(d),
          d.on("close", () => {
            this.clients.delete(d),
              this._shouldEmitClose &&
                !this.clients.size &&
                process.nextTick(_, this);
          })),
        o(d, r);
    }
  };
})();
/**!
 * @author Elgato
 * @module elgato/streamdeck
 * @license MIT
 * @copyright Copyright (c) Corsair Memory Inc.
 */
const re = ["de", "en", "es", "fr", "ja", "ko", "zh_CN", "zh_TW"];
var ne, ie, oe;
function ae(e) {
  null == e ||
    "object" != typeof e ||
    Object.isFrozen(e) ||
    (Object.freeze(e), Object.values(e).forEach(ae));
}
function ce(e, t) {
  return e.split(".").reduce((e, t) => e && e[t], t);
}
!(function (e) {
  (e.Port = "-port"),
    (e.Info = "-info"),
    (e.PluginUUID = "-pluginUUID"),
    (e.RegisterEvent = "-registerEvent");
})(ne || (ne = {})),
  (function (e) {
    (e[(e.HardwareAndSoftware = 0)] = "HardwareAndSoftware"),
      (e[(e.Hardware = 1)] = "Hardware"),
      (e[(e.Software = 2)] = "Software");
  })(ie || (ie = {}));
class le {
  language;
  readTranslations;
  static DEFAULT_LANGUAGE = "en";
  _translations = new Map();
  constructor(e, t) {
    (this.language = e), (this.readTranslations = t);
  }
  t(e, t = this.language) {
    return this.translate(e, t);
  }
  translate(e, t = this.language) {
    return t === le.DEFAULT_LANGUAGE
      ? ce(e, this.getTranslations(t))?.toString() || e
      : ce(e, this.getTranslations(t))?.toString() ||
          ce(e, this.getTranslations(le.DEFAULT_LANGUAGE))?.toString() ||
          e;
  }
  getTranslations(e) {
    let t = this._translations.get(e);
    return (
      void 0 === t &&
        ((t = re.includes(e) ? this.readTranslations(e) : null),
        ae(t),
        this._translations.set(e, t)),
      t
    );
  }
}
!(function (e) {
  (e[(e.ERROR = 0)] = "ERROR"),
    (e[(e.WARN = 1)] = "WARN"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.DEBUG = 3)] = "DEBUG"),
    (e[(e.TRACE = 4)] = "TRACE");
})(oe || (oe = {}));
class he {
  write(e) {
    switch (e.level) {
      case oe.ERROR:
        console.error(...e.data);
        break;
      case oe.WARN:
        console.warn(...e.data);
        break;
      default:
        console.log(...e.data);
    }
  }
}
const de = "\n";
class ue {
  _level;
  options;
  scope;
  constructor(e) {
    (this.options = { minimumLevel: oe.TRACE, ...e }),
      (this.scope =
        void 0 === this.options.scope || "" === this.options.scope.trim()
          ? ""
          : this.options.scope),
      "function" != typeof this.options.level &&
        this.setLevel(this.options.level);
  }
  get level() {
    return void 0 !== this._level
      ? this._level
      : "function" == typeof this.options.level
        ? this.options.level()
        : this.options.level;
  }
  createScope(e) {
    return "" === (e = e.trim())
      ? this
      : new ue({
          ...this.options,
          level: () => this.level,
          scope: this.options.scope ? `${this.options.scope}->${e}` : e,
        });
  }
  debug(...e) {
    return this.write({ level: oe.DEBUG, data: e, scope: this.scope });
  }
  error(...e) {
    return this.write({ level: oe.ERROR, data: e, scope: this.scope });
  }
  info(...e) {
    return this.write({ level: oe.INFO, data: e, scope: this.scope });
  }
  setLevel(e) {
    return (
      void 0 !== e && e > this.options.minimumLevel
        ? ((this._level = oe.INFO),
          this.warn(
            `Log level cannot be set to ${oe[e]} whilst not in debug mode.`,
          ))
        : (this._level = e),
      this
    );
  }
  trace(...e) {
    return this.write({ level: oe.TRACE, data: e, scope: this.scope });
  }
  warn(...e) {
    return this.write({ level: oe.WARN, data: e, scope: this.scope });
  }
  write(e) {
    return (
      e.level <= this.level && this.options.targets.forEach((t) => t.write(e)),
      this
    );
  }
}
Symbol.dispose ??= Symbol("Symbol.dispose");
class fe {
  events = new Map();
  addListener(e, t) {
    return this.on(e, t);
  }
  disposableOn(e, t) {
    return (
      this.addListener(e, t),
      (function (e) {
        let t = !1;
        const s = () => {
          t || (e(), (t = !0));
        };
        return { [Symbol.dispose]: s, dispose: s };
      })(() => this.removeListener(e, t))
    );
  }
  emit(e, ...t) {
    const s = this.events.get(e);
    if (void 0 === s) return !1;
    for (let e = 0; e < s.length; ) {
      const { listener: r, once: n } = s[e];
      n ? s.splice(e, 1) : e++, r(...t);
    }
    return !0;
  }
  eventNames() {
    return Array.from(this.events.keys());
  }
  listenerCount(e, t) {
    const s = this.events.get(e);
    if (void 0 === s || null == t) return s?.length || 0;
    let r = 0;
    return (
      s.forEach((e) => {
        e.listener === t && r++;
      }),
      r
    );
  }
  listeners(e) {
    return Array.from(this.events.get(e) || []).map(({ listener: e }) => e);
  }
  off(e, t) {
    const s = this.events.get(e) || [];
    for (let e = s.length - 1; e >= 0; e--)
      s[e].listener === t && s.splice(e, 1);
    return this;
  }
  on(e, t) {
    return this.add(e, (e) => e.push({ listener: t }));
  }
  once(e, t) {
    return this.add(e, (e) => e.push({ listener: t, once: !0 }));
  }
  prependListener(e, t) {
    return this.add(e, (e) => e.splice(0, 0, { listener: t }));
  }
  prependOnceListener(e, t) {
    return this.add(e, (e) => e.splice(0, 0, { listener: t, once: !0 }));
  }
  removeAllListeners(e) {
    return this.events.delete(e), this;
  }
  removeListener(e, t) {
    return this.off(e, t);
  }
  add(e, t) {
    let s = this.events.get(e);
    return void 0 === s && ((s = []), this.events.set(e, s)), t(s), this;
  }
}
function pe(e, t) {
  return (
    null != e &&
    "object" == typeof e &&
    "__type" in e &&
    e.__type === t &&
    _e(e, "id", "string") &&
    _e(e, "path", "string")
  );
}
function _e(e, t, s) {
  return t in e && typeof e[t] === s;
}
class me {
  request;
  proxy;
  _responded = !1;
  constructor(e, t) {
    (this.request = e), (this.proxy = t);
  }
  get canRespond() {
    return !this._responded;
  }
  fail(e) {
    return this.send(500, e);
  }
  async send(e, t) {
    this.canRespond &&
      (await this.proxy({
        __type: "response",
        id: this.request.id,
        path: this.request.path,
        body: t,
        status: e,
      }),
      (this._responded = !0));
  }
  success(e) {
    return this.send(200, e);
  }
}
const ge = 5e3,
  ye = "public:";
class ve {
  body;
  status;
  constructor(e) {
    (this.body = e.body), (this.status = e.status);
  }
  get ok() {
    return this.status >= 200 && this.status < 300;
  }
}
class be {
  type;
  constructor(e) {
    this.type = e.event;
  }
}
class we extends be {
  action;
  constructor(e, t) {
    super(t), (this.action = e);
  }
}
class Se extends we {
  payload;
  constructor(e, t) {
    super(e, t), (this.payload = t.payload);
  }
}
class Ee extends be {
  settings;
  constructor(e) {
    super(e), (this.settings = e.payload.settings);
  }
}
class ke {
  _promise;
  _reject;
  _resolve;
  constructor() {
    this._promise = new Promise((e, t) => {
      (this._resolve = e), (this._reject = t);
    });
  }
  get promise() {
    return this._promise;
  }
  setException(e) {
    this._reject && this._reject(e);
  }
  setResult(e) {
    this._resolve && this._resolve(e);
  }
}
class xe {
  build;
  major;
  minor;
  patch;
  constructor(e) {
    const t = e.match(
      /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?$/,
    );
    if (null === t)
      throw new Error(
        `Invalid format; expected "{major}[.{minor}[.{patch}[.{build}]]]" but was "${e}"`,
      );
    [, this.major, this.minor, this.patch, this.build] = [
      ...t.map((e) => parseInt(e) || 0),
    ];
  }
  compareTo(e) {
    const t = ({ major: e, minor: t, build: s, patch: r }) => [e, t, s, r],
      s = t(this),
      r = t(e);
    for (let e = 0; e < 4; e++) {
      if (s[e] < r[e]) return -1;
      if (s[e] > r[e]) return 1;
    }
    return 0;
  }
  toString() {
    return `${this.major}.${this.minor}`;
  }
}
let Oe;
function Te() {
  return (
    void 0 === Oe &&
      (Oe = process.execArgv.some((e) => {
        const t = e.split("=")[0];
        return (
          "--inspect" === t || "--inspect-brk" === t || "--inspect-port" === t
        );
      })),
    Oe
  );
}
const De = [
  new (class {
    options;
    filePath;
    size = 0;
    constructor(e) {
      (this.options = e),
        (this.filePath = this.getLogFilePath()),
        this.reIndex();
    }
    write(e) {
      const t = f.openSync(this.filePath, "a");
      try {
        const s = this.options.format(e);
        f.writeSync(t, s + "\n"), (this.size += s.length);
      } finally {
        f.closeSync(t);
      }
      this.size >= this.options.maxSize && (this.reIndex(), (this.size = 0));
    }
    getLogFilePath(e = 0) {
      return h.join(this.options.dest, `${this.options.fileName}.${e}.log`);
    }
    getLogFiles() {
      const e = /^\.(\d+)\.log$/;
      return f
        .readdirSync(this.options.dest, { withFileTypes: !0 })
        .reduce((t, s) => {
          if (s.isDirectory() || s.name.indexOf(this.options.fileName) < 0)
            return t;
          const r = s.name.substring(this.options.fileName.length).match(e);
          return (
            2 !== r?.length ||
              t.push({
                path: h.join(this.options.dest, s.name),
                index: parseInt(r[1]),
              }),
            t
          );
        }, [])
        .sort(({ index: e }, { index: t }) => (e < t ? -1 : e > t ? 1 : 0));
    }
    reIndex() {
      if (!f.existsSync(this.options.dest))
        return void f.mkdirSync(this.options.dest);
      const e = this.getLogFiles();
      for (let t = e.length - 1; t >= 0; t--) {
        const s = e[t];
        t >= this.options.maxFileCount - 1
          ? f.rmSync(s.path)
          : f.renameSync(s.path, this.getLogFilePath(t + 1));
      }
    }
  })({
    dest: h.join(u(), "logs"),
    fileName: (function () {
      const e = h.basename(process.cwd()),
        t = e.lastIndexOf(".sdPlugin");
      return t < 0 ? e : e.substring(0, t);
    })(),
    format: (e) => {
      const { data: t, level: s, scope: r } = e;
      let n = `${new Date().toISOString()} ${oe[s].padEnd(5)} `;
      return (
        r && (n += `${r}: `),
        `${n}${(function (e) {
          let t = "",
            s = !1;
          for (const r of e)
            "object" == typeof r && r instanceof Error
              ? ((t += `${de}${r.stack}`), (s = !0))
              : (s && ((t += de), (s = !1)),
                (t += "object" == typeof r ? JSON.stringify(r) : r),
                (t += " "));
          return t.trimEnd();
        })(t)}`
      );
    },
    maxFileCount: 10,
    maxSize: 52428800,
  }),
];
Te() && De.splice(0, 0, new he());
const Pe = new ue({
  level: Te() ? oe.DEBUG : oe.INFO,
  minimumLevel: Te() ? oe.TRACE : oe.DEBUG,
  targets: De,
});
process.once("uncaughtException", (e) =>
  Pe.error("Process encountered uncaught exception", e),
);
const Ce = new (class extends fe {
  _registrationParameters;
  _version;
  canConnect = !0;
  connection = new ke();
  logger = Pe.createScope("Connection");
  get registrationParameters() {
    return (this._registrationParameters ??= this.getRegistrationParameters());
  }
  get version() {
    return (this._version ??= new xe(
      this.registrationParameters.info.application.version,
    ));
  }
  async connect() {
    if (this.canConnect) {
      this.canConnect = !1;
      const e = new te(`ws://127.0.0.1:${this.registrationParameters.port}`);
      (e.onmessage = (e) => this.tryEmit(e)),
        (e.onopen = () => {
          e.send(
            JSON.stringify({
              event: this.registrationParameters.registerEvent,
              uuid: this.registrationParameters.pluginUUID,
            }),
          ),
            this.connection.setResult(e),
            this.emit("connected", this.registrationParameters.info);
        });
    }
    await this.connection.promise;
  }
  async send(e) {
    const t = await this.connection.promise,
      s = JSON.stringify(e);
    this.logger.trace(s), t.send(s);
  }
  getRegistrationParameters() {
    const e = {
        port: void 0,
        info: void 0,
        pluginUUID: void 0,
        registerEvent: void 0,
      },
      t = Pe.createScope("RegistrationParameters");
    for (let s = 0; s < process.argv.length - 1; s++) {
      const r = process.argv[s],
        n = process.argv[++s];
      switch (r) {
        case ne.Port:
          t.debug(`port=${n}`), (e.port = n);
          break;
        case ne.PluginUUID:
          t.debug(`pluginUUID=${n}`), (e.pluginUUID = n);
          break;
        case ne.RegisterEvent:
          t.debug(`registerEvent=${n}`), (e.registerEvent = n);
          break;
        case ne.Info:
          t.debug(`info=${n}`), (e.info = JSON.parse(n));
          break;
        default:
          s--;
      }
    }
    const s = [],
      r = (e, t) => {
        void 0 === t && s.push(e);
      };
    if (
      (r(ne.Port, e.port),
      r(ne.PluginUUID, e.pluginUUID),
      r(ne.RegisterEvent, e.registerEvent),
      r(ne.Info, e.info),
      s.length > 0)
    )
      throw new Error(
        `Unable to establish a connection with Stream Deck, missing command line arguments: ${s.join(", ")}`,
      );
    return e;
  }
  tryEmit(e) {
    try {
      const t = JSON.parse(e.data.toString());
      t.event
        ? (this.logger.trace(e.data.toString()), this.emit(t.event, t))
        : this.logger.warn(`Received unknown message: ${e.data}`);
    } catch (t) {
      this.logger.error(`Failed to parse message: ${e.data}`, t);
    }
  }
})();
let Ie, Ne;
function Le() {
  return (Ie ??= (function () {
    const e = d(process.cwd(), "manifest.json");
    if (!p(e))
      throw new Error(
        "Failed to read manifest.json as the file does not exist.",
      );
    return JSON.parse(_(e, { encoding: "utf-8", flag: "r" }).toString());
  })());
}
class Re {
  #e;
  #t;
  #s;
  constructor(e) {
    e instanceof Re
      ? ((this.#e = e.#e), (this.#t = e.#t))
      : Array.isArray(e)
        ? ((this.#e = () => e.values()), (this.#t = () => e.length))
        : e instanceof Map || e instanceof Set
          ? ((this.#e = () => e.values()), (this.#t = () => e.size))
          : ((this.#e = e),
            (this.#t = () => {
              let e = 0;
              for (const t of this) e++;
              return e;
            }));
  }
  get length() {
    return this.#t();
  }
  *[Symbol.iterator]() {
    for (const e of this.#e()) yield e;
  }
  asIndexedPairs() {
    return new Re(
      function* () {
        let e = 0;
        for (const t of this) yield [e++, t];
      }.bind(this),
    );
  }
  drop(e) {
    if (isNaN(e) || e < 0)
      throw new RangeError("limit must be 0, or a positive number");
    return new Re(
      function* () {
        let t = 0;
        for (const s of this) t++ >= e && (yield s);
      }.bind(this),
    );
  }
  every(e) {
    for (const t of this) if (!e(t)) return !1;
    return !0;
  }
  filter(e) {
    return new Re(
      function* () {
        for (const t of this) e(t) && (yield t);
      }.bind(this),
    );
  }
  find(e) {
    for (const t of this) if (e(t)) return t;
  }
  findLast(e) {
    let t;
    for (const s of this) e(s) && (t = s);
    return t;
  }
  flatMap(e) {
    return new Re(
      function* () {
        for (const t of this) for (const s of e(t)) yield s;
      }.bind(this),
    );
  }
  forEach(e) {
    for (const t of this) e(t);
  }
  includes(e) {
    return this.some((t) => t === e);
  }
  map(e) {
    return new Re(
      function* () {
        for (const t of this) yield e(t);
      }.bind(this),
    );
  }
  next(...e) {
    this.#s ??= this.#e();
    const t = this.#s.next(...e);
    return t.done && (this.#s = void 0), t;
  }
  reduce(e, t) {
    if (0 === this.length) {
      if (void 0 === t)
        throw new TypeError(
          "Reduce of empty enumerable with no initial value.",
        );
      return t;
    }
    let s = t;
    for (const t of this) s = void 0 === s ? t : e(s, t);
    return s;
  }
  return(e) {
    return (this.#s = void 0), { done: !0, value: e };
  }
  some(e) {
    for (const t of this) if (e(t)) return !0;
    return !1;
  }
  take(e) {
    if (isNaN(e) || e < 0)
      throw new RangeError("limit must be 0, or a positive number");
    return new Re(
      function* () {
        let t = 0;
        for (const s of this) t++ < e && (yield s);
      }.bind(this),
    );
  }
  throw(e) {
    throw e;
  }
  toArray() {
    return Array.from(this);
  }
  toJSON() {
    return this.toArray();
  }
  toString() {
    return `${this.toArray()}`;
  }
}
const Ue = new Map();
class Be extends Re {
  constructor() {
    super(Ue);
  }
  getActionById(e) {
    return Ue.get(e);
  }
}
const Ae = new (class extends Be {
  delete(e) {
    Ue.delete(e);
  }
  set(e) {
    Ue.set(e.id, e);
  }
})();
class $e extends be {
  application;
  constructor(e) {
    super(e), (this.application = e.payload.application);
  }
}
class Fe extends be {
  device;
  constructor(e, t) {
    super(e), (this.device = t);
  }
}
class Me extends be {
  url;
  constructor(e) {
    super(e), (this.url = new We(e.payload.url));
  }
}
const je = "streamdeck://";
class We {
  fragment;
  href;
  path;
  query;
  queryParameters;
  constructor(e) {
    const t = new URL(`${je}${e}`);
    (this.fragment = t.hash.substring(1)),
      (this.href = t.href.substring(13)),
      (this.path = We.parsePath(this.href)),
      (this.query = t.search.substring(1)),
      (this.queryParameters = t.searchParams);
  }
  static parsePath(e) {
    const t = (t) => {
      const s = e.indexOf(t);
      return s >= 0 ? s : e.length;
    };
    return e.substring(0, Math.min(t("?"), t("#")));
  }
}
class Ge extends be {
  action;
  payload;
  constructor(e, t) {
    super(t), (this.action = e), (this.payload = t.payload);
  }
}
function qe(e) {
  return Ce.disposableOn("didReceiveSettings", (t) => {
    const s = Ae.getActionById(t.context);
    s && e(new Se(s, t));
  });
}
var ze = Object.freeze({
  __proto__: null,
  getGlobalSettings: function () {
    return new Promise((e) => {
      Ce.once("didReceiveGlobalSettings", (t) => e(t.payload.settings)),
        Ce.send({
          event: "getGlobalSettings",
          context: Ce.registrationParameters.pluginUUID,
        });
    });
  },
  onDidReceiveGlobalSettings: function (e) {
    return Ce.disposableOn("didReceiveGlobalSettings", (t) => e(new Ee(t)));
  },
  onDidReceiveSettings: qe,
  setGlobalSettings: function (e) {
    return Ce.send({
      event: "setGlobalSettings",
      context: Ce.registrationParameters.pluginUUID,
      payload: e,
    });
  },
});
class Ve {
  router;
  action;
  constructor(e, t) {
    (this.router = e), (this.action = Ae.getActionById(t.context));
  }
  async fetch(e, t) {
    return "string" == typeof e
      ? this.router.fetch(`${ye}${e}`, t)
      : this.router.fetch({ ...e, path: `${ye}${e.path}` });
  }
  sendToPropertyInspector(e) {
    return Ce.send({
      event: "sendToPropertyInspector",
      context: this.action.id,
      payload: e,
    });
  }
}
let Ke,
  He = 0;
function Je() {
  return Ke;
}
const Ye = new (class extends fe {
  proxy;
  actionProvider;
  requests = new Map();
  routes = new fe();
  constructor(e, t) {
    super(), (this.proxy = e), (this.actionProvider = t);
  }
  async fetch(e, t) {
    const s = crypto.randomUUID(),
      {
        body: r,
        path: n,
        timeout: i = ge,
        unidirectional: o = !1,
      } = "string" == typeof e ? { body: t, path: e } : e,
      a = new Promise((e) => {
        this.requests.set(s, (t) => {
          408 !== t.status && clearTimeout(c), e(t);
        });
      }),
      c = setTimeout(
        () =>
          this.handleResponse({
            __type: "response",
            id: s,
            path: n,
            status: 408,
          }),
        i,
      );
    return (
      (await this.proxy({
        __type: "request",
        body: r,
        id: s,
        path: n,
        unidirectional: o,
      })) ||
        this.handleResponse({
          __type: "response",
          id: s,
          path: n,
          status: 406,
        }),
      a
    );
  }
  async process(e) {
    if (pe((t = e.payload), "request") && _e(t, "unidirectional", "boolean")) {
      const t = this.actionProvider(e);
      if (await this.handleRequest(t, e.payload)) return;
      this.emit("unhandledRequest", e);
    } else if (
      (function (e) {
        return pe(e, "response") && _e(e, "status", "number");
      })(e.payload) &&
      this.handleResponse(e.payload)
    )
      return;
    var t;
    this.emit("unhandledMessage", e);
  }
  route(e, t, s) {
    return (
      (s = { filter: () => !0, ...s }),
      this.routes.disposableOn(e, async (e) => {
        if (s?.filter && s.filter(e.request.action)) {
          await e.routed();
          try {
            const s = await t(e.request, e.responder);
            void 0 !== s && (await e.responder.send(200, s));
          } catch (t) {
            throw (await e.responder.send(500), t);
          }
        }
      })
    );
  }
  async handleRequest(e, t) {
    const s = new me(t, this.proxy),
      r = {
        action: e,
        path: t.path,
        unidirectional: t.unidirectional,
        body: t.body,
      };
    let n = !1;
    const i = this.routes.listeners(t.path);
    for (const e of i)
      await e({
        request: r,
        responder: s,
        routed: async () => {
          r.unidirectional && (await s.send(202)), (n = !0);
        },
      });
    return n ? (await s.send(200), !0) : (await s.send(501), !1);
  }
  handleResponse(e) {
    const t = this.requests.get(e.id);
    return this.requests.delete(e.id), !!t && (t(new ve(e)), !0);
  }
})(
  async (e) => {
    const t = Je();
    return (
      !!t &&
      (await Ce.send({
        event: "sendToPropertyInspector",
        context: t.action.id,
        payload: e,
      }),
      !0)
    );
  },
  (e) => Ae.getActionById(e.context),
);
function Xe(e) {
  return (
    Ke?.action?.id === e.context &&
    Ke?.action?.manifestId === e.action &&
    Ke?.action?.device?.id === e.device
  );
}
Ce.on("propertyInspectorDidAppear", (e) => {
  Xe(e) ? He++ : ((He = 1), (Ke = new Ve(Ye, e)));
}),
  Ce.on("propertyInspectorDidDisappear", (e) => {
    Xe(e) && (He--, He <= 0 && (Ke = void 0));
  }),
  Ce.on("sendToPlugin", (e) => Ye.process(e));
const Ze = new (class {
    get current() {
      return Je();
    }
    onDidAppear(e) {
      return Ce.disposableOn("propertyInspectorDidAppear", (t) => {
        const s = Ae.getActionById(t.context);
        s && e(new we(s, t));
      });
    }
    onDidDisappear(e) {
      return Ce.disposableOn("propertyInspectorDidDisappear", (t) => {
        const s = Ae.getActionById(t.context);
        s && e(new we(s, t));
      });
    }
    onSendToPlugin(e) {
      return Ye.disposableOn("unhandledMessage", (t) => {
        const s = Ae.getActionById(t.context);
        s && e(new Ge(s, t));
      });
    }
    registerRoute(e, t, s) {
      return Ye.route(`${ye}${e}`, t, s);
    }
  })(),
  Qe = new Map();
class et extends Re {
  constructor() {
    super(Qe);
  }
  getDeviceById(e) {
    return Qe.get(e);
  }
}
const tt = new (class extends et {
  set(e) {
    Qe.set(e.id, e);
  }
})();
class st {
  #r;
  #n;
  constructor(e) {
    this.#n = e;
    const t = tt.getDeviceById(e.device);
    if (!t)
      throw new Error(
        `Failed to initialize action; device ${e.device} not found`,
      );
    this.#r = t;
  }
  get controllerType() {
    return this.#n.payload.controller;
  }
  get device() {
    return this.#r;
  }
  get id() {
    return this.#n.context;
  }
  get manifestId() {
    return this.#n.action;
  }
  toJSON() {
    return {
      controllerType: this.controllerType,
      device: this.device,
      id: this.id,
      manifestId: this.manifestId,
    };
  }
}
class rt extends st {
  getSettings() {
    return new Promise((e) => {
      const t = (s) => {
        s.context == this.id &&
          (e(s.payload.settings), Ce.removeListener("didReceiveSettings", t));
      };
      Ce.on("didReceiveSettings", t),
        Ce.send({ event: "getSettings", context: this.id });
    });
  }
  isDial() {
    return "Encoder" === this.controllerType;
  }
  isKey() {
    return "Keypad" === this.controllerType;
  }
  setSettings(e) {
    return Ce.send({ event: "setSettings", context: this.id, payload: e });
  }
  showAlert() {
    return Ce.send({ event: "showAlert", context: this.id });
  }
}
class nt extends rt {
  #i;
  constructor(e) {
    if ((super(e), "Encoder" !== e.payload.controller))
      throw new Error(
        "Unable to create DialAction; source event is not a Encoder",
      );
    this.#i = Object.freeze(e.payload.coordinates);
  }
  get coordinates() {
    return this.#i;
  }
  setFeedback(e) {
    return Ce.send({ event: "setFeedback", context: this.id, payload: e });
  }
  setFeedbackLayout(e) {
    return Ce.send({
      event: "setFeedbackLayout",
      context: this.id,
      payload: { layout: e },
    });
  }
  setImage(e) {
    return Ce.send({
      event: "setImage",
      context: this.id,
      payload: { image: e },
    });
  }
  setTitle(e) {
    return this.setFeedback({ title: e });
  }
  setTriggerDescription(e) {
    return Ce.send({
      event: "setTriggerDescription",
      context: this.id,
      payload: e || {},
    });
  }
  toJSON() {
    return { ...super.toJSON(), coordinates: this.coordinates };
  }
}
class it extends rt {
  #i;
  #n;
  constructor(e) {
    if ((super(e), "Keypad" !== e.payload.controller))
      throw new Error(
        "Unable to create KeyAction; source event is not a Keypad",
      );
    (this.#i = e.payload.isInMultiAction
      ? void 0
      : Object.freeze(e.payload.coordinates)),
      (this.#n = e);
  }
  get coordinates() {
    return this.#i;
  }
  isInMultiAction() {
    return this.#n.payload.isInMultiAction;
  }
  setImage(e, t) {
    return Ce.send({
      event: "setImage",
      context: this.id,
      payload: { image: e, ...t },
    });
  }
  setState(e) {
    return Ce.send({
      event: "setState",
      context: this.id,
      payload: { state: e },
    });
  }
  setTitle(e, t) {
    return Ce.send({
      event: "setTitle",
      context: this.id,
      payload: { title: e, ...t },
    });
  }
  showOk() {
    return Ce.send({ event: "showOk", context: this.id });
  }
  toJSON() {
    return {
      ...super.toJSON(),
      coordinates: this.coordinates,
      isInMultiAction: this.isInMultiAction(),
    };
  }
}
const ot = Le();
const at = new (class extends Be {
  constructor() {
    super(),
      Ce.prependListener("willAppear", (e) => {
        const t = "Encoder" === e.payload.controller ? new nt(e) : new it(e);
        Ae.set(t);
      }),
      Ce.prependListener("willDisappear", (e) => Ae.delete(e.context));
  }
  onDialDown(e) {
    return Ce.disposableOn("dialDown", (t) => {
      const s = Ae.getActionById(t.context);
      s?.isDial() && e(new Se(s, t));
    });
  }
  onDialRotate(e) {
    return Ce.disposableOn("dialRotate", (t) => {
      const s = Ae.getActionById(t.context);
      s?.isDial() && e(new Se(s, t));
    });
  }
  onDialUp(e) {
    return Ce.disposableOn("dialUp", (t) => {
      const s = Ae.getActionById(t.context);
      s?.isDial() && e(new Se(s, t));
    });
  }
  onKeyDown(e) {
    return Ce.disposableOn("keyDown", (t) => {
      const s = Ae.getActionById(t.context);
      s?.isKey() && e(new Se(s, t));
    });
  }
  onKeyUp(e) {
    return Ce.disposableOn("keyUp", (t) => {
      const s = Ae.getActionById(t.context);
      s?.isKey() && e(new Se(s, t));
    });
  }
  onTitleParametersDidChange(e) {
    return Ce.disposableOn("titleParametersDidChange", (t) => {
      const s = Ae.getActionById(t.context);
      s && e(new Se(s, t));
    });
  }
  onTouchTap(e) {
    return Ce.disposableOn("touchTap", (t) => {
      const s = Ae.getActionById(t.context);
      s?.isDial() && e(new Se(s, t));
    });
  }
  onWillAppear(e) {
    return Ce.disposableOn("willAppear", (t) => {
      const s = Ae.getActionById(t.context);
      s && e(new Se(s, t));
    });
  }
  onWillDisappear(e) {
    return Ce.disposableOn("willDisappear", (t) => e(new Se(new st(t), t)));
  }
  registerAction(e) {
    if (void 0 === e.manifestId)
      throw new Error("The action's manifestId cannot be undefined.");
    if (!ot.Actions.some((t) => t.UUID === e.manifestId))
      throw new Error(
        `The action's manifestId was not found within the manifest: ${e.manifestId}`,
      );
    const { manifestId: t } = e,
      s = (s, r) => {
        const n = r?.bind(e);
        void 0 !== n &&
          s.bind(e)(async (e) => {
            e.action.manifestId == t && (await n(e));
          });
      };
    s(this.onDialDown, e.onDialDown),
      s(this.onDialUp, e.onDialUp),
      s(this.onDialRotate, e.onDialRotate),
      s(Ze.onSendToPlugin, e.onSendToPlugin),
      s(qe, e.onDidReceiveSettings),
      s(this.onKeyDown, e.onKeyDown),
      s(this.onKeyUp, e.onKeyUp),
      s(Ze.onDidAppear, e.onPropertyInspectorDidAppear),
      s(Ze.onDidDisappear, e.onPropertyInspectorDidDisappear),
      s(this.onTitleParametersDidChange, e.onTitleParametersDidChange),
      s(this.onTouchTap, e.onTouchTap),
      s(this.onWillAppear, e.onWillAppear),
      s(this.onWillDisappear, e.onWillDisappear);
  }
})();
class ct {
  #o = !1;
  #a;
  id;
  constructor(e, t, s) {
    (this.id = e),
      (this.#a = t),
      (this.#o = s),
      Ce.prependListener("deviceDidConnect", (e) => {
        e.device === this.id && ((this.#a = e.deviceInfo), (this.#o = !0));
      }),
      Ce.prependListener("deviceDidDisconnect", (e) => {
        e.device === this.id && (this.#o = !1);
      });
  }
  get actions() {
    return Ae.filter((e) => e.device.id === this.id);
  }
  get isConnected() {
    return this.#o;
  }
  get name() {
    return this.#a.name;
  }
  get size() {
    return this.#a.size;
  }
  get type() {
    return this.#a.type;
  }
}
const lt = new (class extends et {
  constructor() {
    super(),
      Ce.once("connected", (e) => {
        e.devices.forEach((e) => tt.set(new ct(e.id, e, !1)));
      }),
      Ce.on("deviceDidConnect", ({ device: e, deviceInfo: t }) => {
        tt.getDeviceById(e) || tt.set(new ct(e, t, !0));
      });
  }
  onDeviceDidConnect(e) {
    return Ce.disposableOn("deviceDidConnect", (t) =>
      e(new Fe(t, this.getDeviceById(t.device))),
    );
  }
  onDeviceDidDisconnect(e) {
    return Ce.disposableOn("deviceDidDisconnect", (t) =>
      e(new Fe(t, this.getDeviceById(t.device))),
    );
  }
})();
function ht(e) {
  const t = h.join(process.cwd(), `${e}.json`);
  if (!f.existsSync(t)) return null;
  try {
    const e = f.readFileSync(t, { flag: "r" })?.toString();
    return (function (e) {
      const t = JSON.parse(e);
      if (null != t && "object" == typeof t && "Localization" in t)
        return t.Localization;
      throw new TypeError(
        'Translations must be a JSON object nested under a property named "Localization"',
      );
    })(e);
  } catch (e) {
    return Pe.error(`Failed to load translations from ${t}`, e), null;
  }
}
function dt(e, t, s) {
  const r = { major: Math.floor(e), minor: (e % 1) * 10, patch: 0, build: 0 };
  if (-1 === t.compareTo(r))
    throw new Error(
      `[ERR_NOT_SUPPORTED]: ${s} requires Stream Deck version ${r.major}.${r.minor} or higher, but current version is ${t.major}.${t.minor}; please update Stream Deck and the "Software.MinimumVersion" in the plugin's manifest to "${r.major}.${r.minor}" or higher.`,
    );
  if (-1 === (Ne ??= new xe(Le().Software.MinimumVersion)).compareTo(r))
    throw new Error(
      `[ERR_NOT_SUPPORTED]: ${s} requires Stream Deck version ${r.major}.${r.minor} or higher; please update the "Software.MinimumVersion" in the plugin's manifest to "${r.major}.${r.minor}" or higher.`,
    );
}
var ut = Object.freeze({
  __proto__: null,
  switchToProfile: function (e, t, s) {
    return (
      void 0 !== s && dt(6.5, Ce.version, "Switching to a profile page"),
      Ce.send({
        event: "switchToProfile",
        context: Ce.registrationParameters.pluginUUID,
        device: e,
        payload: { page: s, profile: t },
      })
    );
  },
});
var ft = Object.freeze({
  __proto__: null,
  onApplicationDidLaunch: function (e) {
    return Ce.disposableOn("applicationDidLaunch", (t) => e(new $e(t)));
  },
  onApplicationDidTerminate: function (e) {
    return Ce.disposableOn("applicationDidTerminate", (t) => e(new $e(t)));
  },
  onDidReceiveDeepLink: function (e) {
    return (
      dt(6.5, Ce.version, "Receiving deep-link messages"),
      Ce.disposableOn("didReceiveDeepLink", (t) => e(new Me(t)))
    );
  },
  onSystemDidWakeUp: function (e) {
    return Ce.disposableOn("systemDidWakeUp", (t) => e(new be(t)));
  },
  openUrl: function (e) {
    return Ce.send({ event: "openUrl", payload: { url: e } });
  },
});
function pt(e) {
  const t = e.UUID;
  return function (e, s) {
    return class extends e {
      manifestId = t;
    };
  };
}
class _t {
  manifestId;
  get actions() {
    return Ae.filter((e) => e.manifestId === this.manifestId);
  }
}
let mt;
const gt = {
  get actions() {
    return at;
  },
  get devices() {
    return lt;
  },
  get i18n() {
    return (mt ??= new le(this.info.application.language, ht));
  },
  get info() {
    return Ce.registrationParameters.info;
  },
  get logger() {
    return Pe;
  },
  get manifest() {
    return Le();
  },
  get profiles() {
    return ut;
  },
  get settings() {
    return ze;
  },
  get system() {
    return ft;
  },
  get ui() {
    return Ze;
  },
  connect: () => Ce.connect(),
};
!(function (e, t) {
  e.route("internal:logger.write", (e, s) => {
    if (void 0 === e.body) return s.fail();
    const { level: r, message: n, scope: i } = e.body;
    return void 0 === r
      ? s.fail()
      : (t.write({ level: r, data: [n], scope: i }), s.success());
  });
})(Ye, Pe),
  "function" == typeof SuppressedError && SuppressedError;
let yt = (() => {
  let e,
    t,
    s = [pt({ UUID: "com.dylan-phelps.counter.increment" })],
    r = [],
    n = _t;
  return (
    class extends n {
      static {
        t = this;
      }
      static {
        const i =
          "function" == typeof Symbol && Symbol.metadata
            ? Object.create(n[Symbol.metadata] ?? null)
            : void 0;
        !(function (e, t, s, r, n, i) {
          function o(e) {
            if (void 0 !== e && "function" != typeof e)
              throw new TypeError("Function expected");
            return e;
          }
          for (
            var a,
              c = r.kind,
              l = "getter" === c ? "get" : "setter" === c ? "set" : "value",
              h = !t && e ? (r.static ? e : e.prototype) : null,
              d = t || (h ? Object.getOwnPropertyDescriptor(h, r.name) : {}),
              u = !1,
              f = s.length - 1;
            f >= 0;
            f--
          ) {
            var p = {};
            for (var _ in r) p[_] = "access" === _ ? {} : r[_];
            for (var _ in r.access) p.access[_] = r.access[_];
            p.addInitializer = function (e) {
              if (u)
                throw new TypeError(
                  "Cannot add initializers after decoration has completed",
                );
              i.push(o(e || null));
            };
            var m = (0, s[f])(
              "accessor" === c ? { get: d.get, set: d.set } : d[l],
              p,
            );
            if ("accessor" === c) {
              if (void 0 === m) continue;
              if (null === m || "object" != typeof m)
                throw new TypeError("Object expected");
              (a = o(m.get)) && (d.get = a),
                (a = o(m.set)) && (d.set = a),
                (a = o(m.init)) && n.unshift(a);
            } else (a = o(m)) && ("field" === c ? n.unshift(a) : (d[l] = a));
          }
          h && Object.defineProperty(h, r.name, d), (u = !0);
        })(
          null,
          (e = { value: t }),
          s,
          { kind: "class", name: t.name, metadata: i },
          null,
          r,
        ),
          (t = e.value),
          i &&
            Object.defineProperty(t, Symbol.metadata, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: i,
            }),
          (function (e, t, s) {
            for (var r = arguments.length > 2, n = 0; n < t.length; n++)
              s = r ? t[n].call(e, s) : t[n].call(e);
          })(t, r);
      }
      onWillAppear(e) {
        const t = e.payload.settings.filePath;
        if (!t) return e.action.showAlert();
        const s = m(t, "utf-8");
        return e.action.isDial()
          ? e.action.setFeedback({ value: s ?? "0" })
          : e.action.setTitle(s ?? "0");
      }
      onDidReceiveSettings(e) {
        const t = e.payload.settings.filePath;
        if (!t) return e.action.showAlert();
        const s = m(t, "utf-8");
        return e.action.isDial()
          ? e.action.setFeedback({ value: s ?? "0" })
          : e.action.setTitle(s ?? "0");
      }
      async onKeyDown(e) {
        return e.action.setSettings({
          ...e.payload.settings,
          time: Date.now(),
        });
      }
      onKeyUp(e) {
        const t = e.payload.settings.filePath;
        if (!t) return e.action.showAlert();
        const s = m(t, "utf-8");
        let r = Number(s ?? 0);
        const n = e.payload.settings.time
          ? Date.now() - e.payload.settings.time
          : 0;
        return (
          (r =
            n >= 5e3
              ? 0
              : n >= 1e3 && n < 5e3
                ? r - 1
                : r + (e.payload.settings.incrementBy ?? 1)),
          g(t, `${r}`),
          e.action.setTitle(`${r}`)
        );
      }
      onDialDown(e) {
        return e.action.setSettings({
          ...e.payload.settings,
          time: Date.now(),
        });
      }
      onDialUp(e) {
        const t = e.payload.settings.filePath;
        if (!t) return e.action.showAlert();
        return (e.payload.settings.time
          ? Date.now() - e.payload.settings.time
          : 0) >= 5e3
          ? (g(t, "0"), e.action.setFeedback({ value: "0" }))
          : void 0;
      }
      onDialRotate(e) {
        const t = e.payload.settings.filePath;
        if (!t) return e.action.showAlert();
        const s = m(t, "utf-8");
        let r = Number(s ?? 0);
        return (
          e.payload.ticks < 0
            ? (r -= 1)
            : (r += e.payload.settings.incrementBy ?? 1),
          g(t, `${r}`),
          e.action.setFeedback({ value: r })
        );
      }
    },
    t
  );
})();
gt.logger.setLevel(oe.TRACE), gt.actions.registerAction(new yt()), gt.connect();
