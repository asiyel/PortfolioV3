"use client";
// DSA learnings — Lora (headings/body) + Geist Mono (labels/code).
// Icons live in /public/images/dsa/
import Image from "next/image";
import { useEffect, useState } from "react";

type CellState = "n" | "a" | "d" | "x"; // normal · active · done · discarded
type Cell = { v: number; st: CellState; tag: string };
type TreeFrame = {
  present: number[];
  active: number[];
  path: number[];
  found?: number;
};
type Frame = {
  caption: string;
  line: number;
  cells?: Cell[];
  tree?: TreeFrame;
  rows?: [string, number[][]][];
};
type Topic = {
  title: string;
  kind: string;
  layout: "stack" | "row" | "tree" | "rows";
  time: string;
  space: string;
  use: string;
  summary: string;
  code: string[];
  frames: Frame[];
};

const POS: Record<number, [number, number]> = {
  50: [0, 0],
  30: [1, 0],
  70: [1, 1],
  20: [2, 0],
  40: [2, 1],
  60: [2, 2],
  80: [2, 3],
};
const PARENT: Record<number, number> = {
  30: 50,
  70: 50,
  20: 30,
  40: 30,
  60: 70,
  80: 70,
};

function buildTopics(): Topic[] {
  const C = (v: number, st: CellState = "n", tag = ""): Cell => ({
    v,
    st,
    tag,
  });

  // Stack
  const stack: number[] = [],
    sf: Frame[] = [];
  const snap = (caption: string, line: number, act = -1, tagTop = "top") =>
    sf.push({
      caption,
      line,
      cells: stack.map((v, i) =>
        C(v, i === act ? "a" : "n", i === stack.length - 1 ? tagTop : ""),
      ),
    });
  snap("An empty stack — last in, first out.", 1);
  for (const v of [3, 7, 5]) {
    stack.push(v);
    snap(`push(${v}) places ${v} on top.`, 2, stack.length - 1);
  }
  snap(
    "peek() reads the top — 5 — without removing it.",
    4,
    stack.length - 1,
    "peek",
  );
  stack.pop();
  snap("pop() removes 5, the last item in.", 3);
  stack.push(9);
  snap("push(9) — the newest item is always on top.", 2, stack.length - 1);

  // Queue
  const q: number[] = [],
    qf: Frame[] = [];
  const qs = (caption: string, line: number, act = -1) =>
    qf.push({
      caption,
      line,
      cells: q.map((v, i) =>
        C(
          v,
          i === act ? "a" : "n",
          q.length === 1
            ? "front·rear"
            : i === 0
              ? "front"
              : i === q.length - 1
                ? "rear"
                : "",
        ),
      ),
    });
  qs("An empty queue — first in, first out.", 1);
  for (const v of [4, 8, 1]) {
    q.push(v);
    qs(`enqueue(${v}) joins at the rear.`, 2, q.length - 1);
  }
  qs("front() looks at the oldest item — 4.", 4, 0);
  q.shift();
  qs("dequeue() removes 4 from the front.", 3);
  q.push(6);
  qs("enqueue(6) — new arrivals always wait at the back.", 2, q.length - 1);

  // BST
  const order = [50, 30, 70, 20, 40, 60, 80],
    tf: Frame[] = [];
  order.forEach((v, i) => {
    const p = PARENT[v],
      left = v < p;
    tf.push({
      caption:
        i === 0
          ? "insert(50) — the first value becomes the root."
          : `insert(${v}) — ${left ? "smaller" : "larger"} than ${p}, so it goes ${left ? "left" : "right"}.`,
      line: i === 0 ? 1 : left ? 2 : 3,
      tree: { present: order.slice(0, i + 1), active: [v], path: [] },
    });
  });
  tf.push({
    caption: "search(60): start at the root — 60 > 50, go right.",
    line: 8,
    tree: { present: order, active: [50], path: [] },
  });
  tf.push({
    caption: "60 < 70, go left.",
    line: 8,
    tree: { present: order, active: [70], path: [50] },
  });
  tf.push({
    caption: "Found 60 in three comparisons — O(log n) on a balanced tree.",
    line: 9,
    tree: { present: order, active: [], path: [50, 70], found: 60 },
  });

  // Binary search
  const a = [3, 8, 12, 17, 23, 31, 42, 56, 64, 79],
    target = 42,
    bf: Frame[] = [];
  let lo = 0,
    hi = a.length - 1;
  const bs = (caption: string, line: number, mid = -1, found = false) =>
    bf.push({
      caption,
      line,
      cells: a.map((v, i) => {
        const tag = [i === lo && "lo", i === mid && "mid", i === hi && "hi"]
          .filter(Boolean)
          .join("·");
        return C(
          v,
          found && i === mid
            ? "d"
            : i === mid
              ? "a"
              : i < lo || i > hi
                ? "x"
                : "n",
          tag,
        );
      }),
    });
  bs(`Find ${target} in a sorted array. Search the whole range.`, 1);
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (a[mid] === target) {
      bs(`a[${mid}] = ${a[mid]} — found at index ${mid}.`, 4, mid, true);
      break;
    }
    const go = a[mid] < target;
    bs(
      `mid = ${mid}: ${a[mid]} ${go ? "<" : ">"} ${target}, discard the ${go ? "left" : "right"} half.`,
      go ? 5 : 6,
      mid,
    );
    if (go) lo = mid + 1;
    else hi = mid - 1;
  }

  // Merge sort
  const R: [string, number[][]][] = [
    ["input", [[38, 27, 43, 3, 9, 82, 10, 15]]],
    [
      "divide",
      [
        [38, 27, 43, 3],
        [9, 82, 10, 15],
      ],
    ],
    [
      "divide",
      [
        [38, 27],
        [43, 3],
        [9, 82],
        [10, 15],
      ],
    ],
    ["base", [[38], [27], [43], [3], [9], [82], [10], [15]]],
    [
      "merge",
      [
        [27, 38],
        [3, 43],
        [9, 82],
        [10, 15],
      ],
    ],
    [
      "merge",
      [
        [3, 27, 38, 43],
        [9, 10, 15, 82],
      ],
    ],
    ["sorted", [[3, 9, 10, 15, 27, 38, 43, 82]]],
  ];
  const caps = [
    "Unsorted input of eight numbers.",
    "Divide: split the array in half.",
    "Divide again — the problems get smaller.",
    "Base case: single items are already sorted.",
    "Conquer: merge pairs back in order.",
    "Merge the sorted halves of four.",
    "Final merge — sorted in O(n log n).",
  ];
  const mf: Frame[] = R.map((_, k) => ({
    caption: caps[k],
    line: k === 0 ? 0 : k < 3 ? 2 : k === 3 ? 1 : 5,
    rows: R.slice(0, k + 1),
  }));

  return [
    {
      title: "Stack",
      kind: "Data structure · LIFO",
      layout: "stack",
      time: "O(1) push · pop",
      space: "O(n)",
      use: "Undo history, call stacks, bracket matching.",
      summary:
        "A pile where the last item added is the first one out — every operation happens at the top.",
      code: [
        "class Stack<T> {",
        "  private items: T[] = [];",
        "  push(x: T) { this.items.push(x); }",
        "  pop() { return this.items.pop(); }",
        "  peek() { return this.items.at(-1); }",
        "}",
      ],
      frames: sf,
    },
    {
      title: "Queue",
      kind: "Data structure · FIFO",
      layout: "row",
      time: "O(1) enqueue",
      space: "O(n)",
      use: "Task schedulers, BFS, print and message queues.",
      summary:
        "A line where the first to arrive is the first served — items join at the rear and leave from the front.",
      code: [
        "class Queue<T> {",
        "  private items: T[] = [];",
        "  enqueue(x: T) { this.items.push(x); }",
        "  dequeue() { return this.items.shift(); }",
        "  front() { return this.items[0]; }",
        "}",
      ],
      frames: qf,
    },
    {
      title: "Binary Search Tree",
      kind: "Data structure · Tree",
      layout: "tree",
      time: "O(log n) avg",
      space: "O(n)",
      use: "Ordered sets and maps, range queries, autocomplete.",
      summary:
        "Every node keeps smaller values on its left and larger on its right, so each comparison halves the search.",
      code: [
        "function insert(node, v) {",
        "  if (!node) return new Node(v);",
        "  if (v < node.val) node.left = insert(node.left, v);",
        "  else node.right = insert(node.right, v);",
        "  return node;",
        "}",
        "function search(node, v) {",
        "  while (node && node.val !== v)",
        "    node = v < node.val ? node.left : node.right;",
        "  return node;",
        "}",
      ],
      frames: tf,
    },
    {
      title: "Binary Search",
      kind: "Algorithm · Divide & conquer",
      layout: "row",
      time: "O(log n)",
      space: "O(1)",
      use: "Lookups in sorted data, finding boundaries, guessing games.",
      summary:
        "Look at the middle, throw away the half that can’t hold the answer, and repeat.",
      code: [
        "function binarySearch(a, t) {",
        "  let lo = 0, hi = a.length - 1;",
        "  while (lo <= hi) {",
        "    const mid = (lo + hi) >> 1;",
        "    if (a[mid] === t) return mid;",
        "    if (a[mid] < t) lo = mid + 1;",
        "    else hi = mid - 1;",
        "  }",
        "  return -1;",
        "}",
      ],
      frames: bf,
    },
    {
      title: "Merge Sort",
      kind: "Algorithm · Divide & conquer",
      layout: "rows",
      time: "O(n log n)",
      space: "O(n)",
      use: "Stable sorting, linked lists, external sorting of large files.",
      summary:
        "Split the array until each piece is trivially sorted, then merge the pieces back together in order.",
      code: [
        "function mergeSort(a) {",
        "  if (a.length <= 1) return a;",
        "  const mid = a.length >> 1;",
        "  const left = mergeSort(a.slice(0, mid));",
        "  const right = mergeSort(a.slice(mid));",
        "  return merge(left, right);",
        "}",
      ],
      frames: mf,
    },
  ];
}

// Static data, built once at module load
const TOPICS = buildTopics();

// ---------- styling helpers ----------
const mono = "font-mono";
const lora = "font-serif";
const dots =
  "bg-[#1a1919] [background-image:radial-gradient(rgba(243,242,242,.08)_1px,transparent_1px)]";
const pad = (n: number) => String(n + 1).padStart(2, "0");
const CELL: Record<CellState, string> = {
  n: "border-[#f3f2f2]/25 bg-[#252323] text-[#f3f2f2]",
  a: "border-[#b68235] bg-[#b68235]/15 text-[#facb8d]",
  d: "border-[#9fbf8f] bg-[#9fbf8f]/15 text-[#cfe3c4]",
  x: "border-[#f3f2f2]/25 bg-[#252323] text-[#f3f2f2] opacity-30",
};
const icon = (n: string) => `/images/dsa/${n}.png`;

// ---------- visualizers ----------
function Linear({
  cells,
  stack,
  compact,
}: {
  cells: Cell[];
  stack: boolean;
  compact?: boolean;
}) {
  const box = stack
    ? compact
      ? "h-9 w-[120px] text-[13px]"
      : "h-12 w-40 text-xl"
    : compact
      ? "h-[34px] w-[27px] text-[13px]"
      : "size-16 text-xl";
  return (
    <div
      className={`flex items-center justify-center ${stack ? "flex-col-reverse" : "flex-row"} ${compact ? "gap-[5px]" : "gap-2.5"}`}
    >
      {cells.length === 0 && (
        <span className={`${mono} text-xs text-[#7d7979] md:text-[13px]`}>
          [ empty ]
        </span>
      )}
      {cells.map((c, i) => (
        <div
          key={i}
          className={`flex items-center transition-opacity duration-300 ${stack ? "flex-row" : "flex-col"} ${compact ? "gap-1.5" : "gap-2.5"} ${c.st === "x" ? "opacity-30" : ""}`}
        >
          <span
            className={`${mono} flex items-center justify-center rounded border transition-colors duration-300 ${box} ${CELL[c.st === "x" ? "n" : c.st]}`}
          >
            {c.v}
          </span>
          <span
            className={`${mono} text-center text-[#facb8d] ${compact ? "h-3 min-w-6 text-[9px]" : "h-3.5 min-w-11 text-[11px]"}`}
          >
            {c.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function Tree({
  fr,
  W,
  H,
  r,
}: {
  fr: TreeFrame;
  W: number;
  H: number;
  r: number;
}) {
  const { present, active, path, found } = fr;
  const xy = (v: number): [number, number] => {
    const [d, i] = POS[v];
    return [((i + 0.5) / 2 ** d) * W, r + 6 + d * ((H - 2 * r - 12) / 2)];
  };
  const nodeCls = (v: number) =>
    v === found
      ? CELL.d
      : active.includes(v)
        ? CELL.a
        : path.includes(v)
          ? "border-[#b68235] bg-[#252323] text-[#facb8d]"
          : CELL.n;
  const onPath = (v: number) =>
    (path.includes(v) || v === found || active.includes(v)) &&
    path.includes(PARENT[v]);
  return (
    <div className="relative" style={{ width: W, height: H }}>
      {present
        .filter((v) => PARENT[v])
        .map((v) => {
          const [x1, y1] = xy(PARENT[v]),
            [x2, y2] = xy(v);
          return (
            <span
              key={`e${v}`}
              className={`absolute h-px origin-left transition-colors duration-300 ${onPath(v) ? "bg-[#b68235]" : "bg-[#f3f2f2]/20"}`}
              style={{
                left: x1,
                top: y1,
                width: Math.hypot(x2 - x1, y2 - y1),
                transform: `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`,
              }}
            />
          );
        })}
      {present.map((v) => {
        const [x, y] = xy(v);
        return (
          <span
            key={v}
            className={`${mono} absolute flex items-center justify-center rounded-full border transition-colors duration-300 ${nodeCls(v)}`}
            style={{
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              margin: `${-r}px 0 0 ${-r}px`,
              fontSize: r > 20 ? 18 : 13,
            }}
          >
            {v}
          </span>
        );
      })}
    </div>
  );
}

function Rows({
  rows,
  compact,
}: {
  rows: [string, number[][]][];
  compact?: boolean;
}) {
  const last = rows.length - 1;
  return (
    <div className={`flex flex-col ${compact ? "gap-[7px]" : "gap-2.5"}`}>
      {rows.map(([label, groups], k) => {
        const on = k === last,
          done = label === "sorted";
        const g = done
          ? "border-[#9fbf8f]"
          : on
            ? "border-[#b68235]"
            : "border-[#f3f2f2]/20";
        const c = done
          ? "bg-[#9fbf8f]/15 text-[#cfe3c4]"
          : on
            ? "bg-[#b68235]/15 text-[#facb8d]"
            : "bg-[#252323] text-[#bab6b6]";
        return (
          <div
            key={k}
            className={
              compact
                ? "flex justify-center"
                : "grid grid-cols-[80px_auto] items-center gap-4"
            }
          >
            {!compact && (
              <span
                className={`${mono} text-[11px] ${on ? "text-[#facb8d]" : "text-[#7d7979]"}`}
              >
                {label}
              </span>
            )}
            <div
              className={`flex justify-center ${compact ? "gap-1" : "gap-3"}`}
            >
              {groups.map((grp, gi) => (
                <div
                  key={gi}
                  className={`flex rounded border ${g} ${compact ? "gap-0.5 p-0.5" : "gap-[3px] p-[3px]"}`}
                >
                  {grp.map((n, ni) => (
                    <span
                      key={ni}
                      className={`${mono} flex items-center justify-center rounded-sm ${c} ${compact ? "h-6 w-[26px] text-[10px]" : "h-[30px] w-[34px] text-[13px]"}`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Visual({
  topic,
  fr,
  compact,
}: {
  topic: Topic;
  fr: Frame;
  compact?: boolean;
}) {
  if (topic.layout === "tree" && fr.tree)
    return compact ? (
      <Tree fr={fr.tree} W={300} H={220} r={18} />
    ) : (
      <Tree fr={fr.tree} W={760} H={300} r={28} />
    );
  if (topic.layout === "rows" && fr.rows)
    return <Rows rows={fr.rows} compact={compact} />;
  return (
    <Linear
      cells={fr.cells ?? []}
      stack={topic.layout === "stack"}
      compact={compact}
    />
  );
}

function Controls({
  prev,
  next,
  toggle,
  playing,
  size,
}: {
  prev: () => void;
  next: () => void;
  toggle: () => void;
  playing: boolean;
  size: string;
}) {
  const base = `flex ${size} cursor-pointer items-center justify-center rounded-full border bg-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68235]`;
  return (
    <div className="flex gap-2">
      <button
        onClick={prev}
        aria-label="Previous step"
        className={`${base} border-[#f3f2f2]/25 hover:border-[#b68235]`}
      >
        <Image src={icon("chevron-left-light")} alt="" width={16} height={16} />
      </button>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className={`${base} border-[#b68235] hover:bg-[#b68235]/15`}
      >
        <Image
          src={icon(playing ? "pause-gold" : "play-gold")}
          alt=""
          width={16}
          height={16}
        />
      </button>
      <button
        onClick={next}
        aria-label="Next step"
        className={`${base} border-[#f3f2f2]/25 hover:border-[#b68235]`}
      >
        <Image src={icon("chevron-right-light")} alt="" width={16} height={16} />
      </button>
    </div>
  );
}

// ---------- page ----------
export default function DSALearnings({
  autoplay = true,
}: {
  autoplay?: boolean;
}) {
  const topics = TOPICS;
  const [t, setT] = useState(0);
  const [f, setF] = useState(0);
  const [playing, setPlaying] = useState(true);
  const topic = topics[t];
  const n = topic.frames.length;
  const fr = topic.frames[Math.min(f, n - 1)];
  const step = (d: number) => setF((x) => (x + d + n) % n);
  const pick = (k: number) => {
    setT(k);
    setF(0);
  };

  useEffect(() => {
    if (!autoplay || !playing) return;
    const id = setInterval(() => setF((x) => (x + 1) % n), 1500);
    return () => clearInterval(id);
  }, [autoplay, playing, n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const stepLabel = `${pad(f)} / ${String(n).padStart(2, "0")}`;
  const ctl = {
    prev: () => step(-1),
    next: () => step(1),
    toggle: () => setPlaying((p) => !p),
    playing,
  };
  const meta = [
    ["time", topic.time, true],
    ["space", topic.space, true],
    ["used_for", topic.use, false],
  ] as const;

  return (
    <section
      className={`${lora} flex flex-col gap-6 bg-[#252323] pb-14 pt-16 text-[#f3f2f2] md:gap-12 md:px-20 md:pb-[88px] md:pt-24`}
    >
      {/* Header */}
      <header className="mx-6 flex flex-col gap-3 border-b border-[#f3f2f2]/15 pb-5 md:mx-0 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 md:pb-7">
        <div className="flex flex-col gap-3 md:gap-3.5">
          <span className={`${mono} text-xs text-[#bab6b6] md:text-[13px]`}>
            {"// the_notebook"}
          </span>
          <h2 className="m-0 text-[40px] font-normal leading-none tracking-[-0.01em] md:text-[72px]">
            Structures &amp; <em className="text-[#facb8d]">Algorithms</em>
          </h2>
        </div>
        <p className="m-0 hidden max-w-[36ch] text-right text-[17px] italic leading-relaxed text-[#d7d3d3] md:block">
          Notes from learning DSA — each one traced step by step.
        </p>
      </header>

      <div className="flex flex-col gap-6 md:grid md:grid-cols-[320px_minmax(0,1fr)] md:items-start md:gap-14">
        {/* Topics: pills on mobile, list on desktop */}
        <nav
          aria-label="Topics"
          className="flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:flex-col md:overflow-visible md:px-0 md:pb-0"
        >
          {topics.map((x, k) => {
            const on = k === t;
            return (
              <button
                key={x.title}
                onClick={() => pick(k)}
                aria-pressed={on}
                className={`flex min-h-11 flex-none cursor-pointer items-center gap-2 rounded-full border px-3.5 text-left text-sm transition-colors hover:border-[#b68235] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68235] md:grid md:grid-cols-[36px_minmax(0,1fr)] md:items-baseline md:gap-x-3 md:gap-y-1 md:rounded md:px-[18px] md:py-4 ${on ? "border-[#b68235] bg-[#b68235]/10 text-[#facb8d]" : "border-[#f3f2f2]/15 text-[#f3f2f2]"}`}
              >
                <span
                  className={`${mono} text-[11px] text-[#b68235] md:text-xs`}
                >
                  {pad(k)}
                </span>
                <span className="md:text-[21px] md:leading-tight">
                  {x.title}
                </span>
                <span className="hidden md:block" />
                <span
                  className={`${mono} hidden text-[11px] text-[#7d7979] md:block`}
                >
                  {x.kind}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex min-w-0 flex-col gap-6 md:gap-7">
          {/* Intro */}
          <div className="mx-6 flex flex-col gap-2.5 md:mx-0 md:gap-4">
            <div
              className={`${mono} flex items-center gap-3.5 text-[11px] tracking-[0.06em] text-[#bab6b6] md:text-xs`}
            >
              <span className="text-[#facb8d]">No. {pad(t)}</span>
              <span className="hidden h-px w-8 bg-[#b68235] md:block" />
              <span>{topic.kind}</span>
            </div>
            <h3 className="m-0 text-[32px] font-normal leading-[1.05] md:text-[60px] md:leading-none md:tracking-[-0.015em]">
              {topic.title}
            </h3>
            <p className="m-0 max-w-[62ch] text-base italic leading-relaxed text-[#d7d3d3] [text-wrap:pretty] md:text-lg">
              {topic.summary}
            </p>
          </div>

          {/* Mobile visualizer */}
          <div
            className={`${dots} mx-6 flex flex-col rounded border border-[#b68235]/55 [background-size:18px_18px] md:hidden`}
          >
            <div className="flex h-[280px] items-center justify-center p-4">
              <Visual topic={topic} fr={fr} compact />
            </div>
            <div className="mx-4 flex flex-col gap-3 border-t border-[#f3f2f2]/10 pb-4 pt-3.5">
              <p className="m-0 text-[15px] leading-normal">
                <span className={`${mono} text-[11px] text-[#facb8d]`}>
                  step_{stepLabel}
                </span>{" "}
                {fr.caption}
              </p>
              <Controls {...ctl} size="size-11" />
            </div>
          </div>

          {/* Desktop visualizer */}
          <figure className="m-0 hidden rounded border border-[#b68235]/55 bg-[#1d1c1c] p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] md:block">
            <div
              className={`${dots} flex flex-col rounded-sm [background-size:22px_22px]`}
            >
              <div className="flex h-[360px] items-center justify-center p-7">
                <Visual topic={topic} fr={fr} />
              </div>
              <div className="mx-7 flex items-center gap-5 border-t border-[#f3f2f2]/10 pb-[22px] pt-[18px]">
                <Controls {...ctl} size="size-10" />
                <span
                  className={`${mono} whitespace-nowrap text-xs text-[#facb8d]`}
                >
                  step_{stepLabel}
                </span>
                <span className="flex-1 text-[17px] leading-snug">
                  {fr.caption}
                </span>
              </div>
            </div>
          </figure>

          {/* Code + complexity */}
          <div className="mx-6 flex flex-col gap-6 md:mx-0 md:grid md:grid-cols-[minmax(0,1fr)_260px] md:items-start md:gap-8">
            <div
              className={`${mono} hidden rounded border border-[#f3f2f2]/10 bg-[#1d1c1c] py-[18px] text-[13px] leading-[1.75] md:block`}
            >
              {topic.code.map((line, i) => {
                const on = i === fr.line;
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-[44px_minmax(0,1fr)] transition-colors duration-300 ${on ? "bg-[#b68235]/15 shadow-[inset_2px_0_0_#b68235]" : ""}`}
                  >
                    <span className="pr-4 text-right text-[#5f5c5c]">
                      {i + 1}
                    </span>
                    <span
                      className={`whitespace-pre ${on ? "text-[#facb8d]" : "text-[#d7d3d3]"}`}
                    >
                      {line}
                    </span>
                  </div>
                );
              })}
            </div>
            <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm md:gap-x-5 md:gap-y-3 md:border-l md:border-[#f3f2f2]/15 md:pl-6 md:text-base">
              {meta.map(([k, v, isMono]) => (
                <div key={k} className="contents">
                  <dt className={`${mono} pt-[3px] text-[11px] text-[#7d7979]`}>
                    {k}
                  </dt>
                  <dd
                    className={`m-0 ${isMono ? `${mono} text-[13px] text-[#facb8d] md:text-sm` : "leading-normal"}`}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
