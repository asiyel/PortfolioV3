"use client";
// Automation showcase — Lora (headings/body) + Geist Mono (labels).
// Icons live in /public/images/automations/{name}-{gold|light}.png
import Image from "next/image";
import { useEffect, useState } from "react";

type Node = { tool: string; sub: string; icon: string; trigger?: boolean };
type Stage = { title: string; detail: string; nodes: Node[] };
type Workflow = {
  title: string;
  short: string;
  count: string;
  summary: string;
  trigger: string;
  runs: string;
  replaces: string;
  stages: Stage[];
};

const WORKFLOWS: Workflow[] = [
  {
    title: "Tracker Error Notifier",
    short: "Error notifier",
    count: "2 nodes",
    summary:
      "A safety net for the budget tracker — the moment a run fails, the error lands in Telegram instead of going unnoticed.",
    trigger: "Error in the tracker workflow",
    runs: "n8n · Telegram Bot API",
    replaces: "Finding out days later that a run failed",
    stages: [
      {
        title: "Error Trigger",
        detail: "fires whenever the tracker workflow fails during a run.",
        nodes: [
          {
            tool: "Error Trigger",
            sub: "on workflow error",
            icon: "circle-x",
            trigger: true,
          },
        ],
      },
      {
        title: "Send a text message",
        detail:
          "sends the failure details to my Telegram bot, so I know straight away.",
        nodes: [
          {
            tool: "Send a text message",
            sub: "sendMessage: message",
            icon: "telegram",
          },
        ],
      },
    ],
  },
  {
    title: "Budget Entries Tracker",
    short: "Budget tracker",
    count: "12 nodes",
    summary:
      "Pulls budget entries from four Google Sheets and the Net table on a schedule, combines and calculates them in JavaScript, then emails a summary and updates Net when the check passes.",
    trigger: "Schedule",
    runs: "n8n · Google Sheets · Gmail",
    replaces: "Totalling four sheets by hand",
    stages: [
      {
        title: "Schedule Trigger",
        detail: "starts the run automatically on a fixed schedule.",
        nodes: [
          {
            tool: "Schedule Trigger",
            sub: "on schedule",
            icon: "clock",
            trigger: true,
          },
        ],
      },
      {
        title: "Get rows",
        detail:
          "reads rows from the General, Motor, Home and AJ Tracker sheets, plus the Net table, in parallel.",
        nodes: [
          { tool: "General Sheet", sub: "read: sheet", icon: "googlesheets" },
          { tool: "Motor Sheet", sub: "read: sheet", icon: "googlesheets" },
          { tool: "Home Sheet", sub: "read: sheet", icon: "googlesheets" },
          { tool: "AJ Tracker", sub: "read: sheet", icon: "googlesheets" },
          { tool: "Net", sub: "get: rows", icon: "table" },
        ],
      },
      {
        title: "Merge",
        detail: "appends all five inputs into a single list of entries.",
        nodes: [{ tool: "Merge", sub: "append", icon: "merge" }],
      },
      {
        title: "Code in JavaScript",
        detail:
          "calculates the totals and net figures from the combined entries.",
        nodes: [
          { tool: "Code in JavaScript", sub: "run: code", icon: "braces" },
        ],
      },
      {
        title: "If",
        detail:
          "checks the result and routes it down the true or false branch.",
        nodes: [{ tool: "If", sub: "true / false", icon: "split" }],
      },
      {
        title: "Outcome",
        detail:
          "true — emails the summary through Gmail and updates the Net row; false — does nothing.",
        nodes: [
          {
            tool: "Send a message",
            sub: "true · send: message",
            icon: "gmail",
          },
          { tool: "Update Net", sub: "true · update: row", icon: "table" },
          {
            tool: "No Operation",
            sub: "false · do nothing",
            icon: "chevrons-right",
          },
        ],
      },
    ],
  },
];

const icon = (name: string, on: boolean) =>
  `/images/automations/${name}-${on ? "gold" : "light"}.png`;
const pad = (n: number) => String(n + 1).padStart(2, "0");
const subColor = (s: string) =>
  s.startsWith("true")
    ? "text-[#5f7f4f]"
    : s.startsWith("false")
      ? "text-[#a5543f]"
      : "text-[#8d8579]";
const mono = "font-mono";
const lora = "font-serif";
const dots =
  "bg-[#ebe7e1] [background-image:radial-gradient(rgba(20,20,20,.12)_1px,transparent_1px)] [background-size:22px_22px]";

function NodeBox({
  node,
  on,
  size = "sm",
}: {
  node: Node;
  on: boolean;
  size?: "sm" | "lg";
}) {
  const box = size === "lg" ? "size-[68px]" : "size-11";
  const img = size === "lg" ? 30 : 20;
  const radius =
    node.trigger && size === "lg"
      ? "rounded-l-[34px] rounded-r-md"
      : "rounded-md";
  return (
    <span
      className={`flex flex-none items-center justify-center border transition-colors duration-300 ${box} ${radius} ${on ? "border-[#b8862b] bg-[#b8862b]/15" : "border-[#d9d3ca] bg-[#f6f4f1]"}`}
    >
      <Image
        src={icon(node.icon, on)}
        alt=""
        aria-hidden
        width={img}
        height={img}
        className={on ? undefined : "brightness-[0.4]"}
      />
    </span>
  );
}

export default function AutomationShowcase({
  autoplay = true,
}: {
  autoplay?: boolean;
}) {
  const [wi, setWi] = useState(1);
  const [step, setStep] = useState(0);
  const w = WORKFLOWS[wi];
  const last = w.stages.length - 1;
  const act = w.stages[step] ?? w.stages[0];

  const pickWorkflow = (i: number) => {
    setWi(i);
    setStep(0);
  };

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(
      () => setStep((s) => (s + 1) % WORKFLOWS[wi].stages.length),
      1700,
    );
    return () => clearInterval(id);
  }, [autoplay, wi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") pickWorkflow((wi + 1) % WORKFLOWS.length);
      if (e.key === "ArrowLeft")
        pickWorkflow((wi - 1 + WORKFLOWS.length) % WORKFLOWS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wi]);

  const line = (k: number) => (k < step ? "bg-[#b8862b]" : "bg-[#d9d3ca]");
  const reached = (k: number) => (k <= step ? "bg-[#b8862b]" : "bg-[#d9d3ca]");
  const label = (on: boolean) => (on ? "text-[#a87a2c]" : "text-[#4a453f]");

  return (
    <section
      className={`${lora} flex flex-col gap-6 bg-[#F3F0EC] px-6 pb-14 pt-16 text-[#141414] md:gap-11 md:px-20 md:pb-[88px] md:pt-24`}
    >
      {/* Header */}
      <header className="grid gap-5 border-b border-[#d9d3ca] pb-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 md:pb-7">
        <div className="flex flex-col gap-3 md:gap-3.5">
          <span className={`${mono} text-xs text-[#8d8579] md:text-[13px]`}>
            {"// the_workshop"}
          </span>
          <h2 className="m-0 text-[40px] font-normal leading-none tracking-[-0.01em] md:text-[72px]">
            Workflows &amp; <em className="text-[#b8862b]">Automations</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex md:gap-2.5">
          {WORKFLOWS.map((x, i) => {
            const on = i === wi;
            return (
              <button
                key={x.title}
                onClick={() => pickWorkflow(i)}
                aria-pressed={on}
                className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-left text-sm leading-tight transition-colors hover:border-[#b8862b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8862b] md:gap-3 md:px-5 md:py-3 md:text-[17px] ${on ? "border-[#141414] bg-[#f6f4f1] text-[#141414]" : "border-[#e0dad2] bg-[#ebe7e1] text-[#4a453f] hover:text-[#141414]"}`}
              >
                <span
                  className={`${mono} text-[11px] text-[#a87a2c] md:text-xs`}
                >
                  {pad(i)}
                </span>
                <span className="md:hidden">{x.short}</span>
                <span className="hidden md:inline">{x.title}</span>
                <span
                  className={`${mono} hidden text-[11px] text-[#8d8579] md:inline`}
                >
                  {x.count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Intro + meta */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:items-end md:gap-16">
        <div className="flex flex-col gap-3 md:gap-[18px]">
          <div
            className={`${mono} flex items-center gap-3.5 text-[11px] tracking-[0.06em] text-[#8d8579] md:text-xs`}
          >
            <span className="text-[#a87a2c]">No. {pad(wi)}</span>
            <span className="hidden h-px w-8 bg-[#b8862b]/70 md:block" />
            <span>n8n workflow</span>
          </div>
          <h3 className="m-0 text-[32px] font-normal leading-[1.05] md:text-[60px] md:leading-none md:tracking-[-0.015em]">
            {w.title}
          </h3>
          <p className="m-0 max-w-[60ch] text-base italic leading-relaxed text-[#4a453f] [text-wrap:pretty] md:text-[19px]">
            {w.summary}
          </p>
        </div>
        <dl className="order-last m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-[#d9d3ca] pt-4 text-sm md:order-none md:gap-x-5 md:gap-y-2.5 md:border-l md:border-t-0 md:pl-7 md:pt-0 md:text-base">
          {(
            [
              ["trigger", w.trigger],
              ["runs_on", w.runs],
              ["replaces", w.replaces],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="contents">
              <dt className={`${mono} pt-[3px] text-[11px] text-[#8d8579]`}>
                {k}
              </dt>
              <dd className="m-0">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Mobile diagram (stacked) */}
        <div
          className={`${dots} flex flex-col rounded border border-[#b8862b]/55 p-5 [background-size:18px_18px] md:hidden`}
        >
          {w.stages.map((s, k) => {
            const on = k === step;
            const multi = s.nodes.length > 1;
            return (
              <div key={s.title} className="flex flex-col">
                <button
                  onClick={() => setStep(k)}
                  className="flex cursor-pointer flex-col gap-2.5 border-0 bg-transparent p-0 text-left text-inherit"
                >
                  <span className={`${mono} text-[10px] text-[#a87a2c]`}>
                    {pad(k)} · {s.title}
                  </span>
                  <span
                    className={`flex flex-col gap-2 border-l transition-colors ${multi ? `pl-3.5 ${k <= step ? "border-[#b8862b]" : "border-[#d9d3ca]"}` : "border-transparent"}`}
                  >
                    {s.nodes.map((n) => (
                      <span key={n.tool} className="flex items-center gap-3">
                        <NodeBox node={n} on={on} />
                        <span
                          className={`${mono} flex min-w-0 flex-col gap-0.5`}
                        >
                          <span className={`text-xs ${label(on)}`}>
                            {n.tool}
                          </span>
                          <span className={`text-[10px] ${subColor(n.sub)}`}>
                            {n.sub}
                          </span>
                        </span>
                      </span>
                    ))}
                  </span>
                </button>
                {k < last && (
                  <span
                    className={`my-1.5 ml-[22px] h-6 w-px transition-colors ${line(k)}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop diagram */}
      <figure className="m-0 hidden rounded border border-[#b8862b]/55 bg-[#f6f4f1] p-3 shadow-[0_24px_48px_-28px_rgba(20,20,20,.25)] md:block">
        <div className={`${dots} flex flex-col rounded-sm`}>
          <div className="flex h-[420px] items-center justify-center px-8 pb-14 pt-6">
            {w.stages.map((s, k) => {
              const on = k === step;
              const multi = s.nodes.length > 1;
              return (
                <div
                  key={s.title}
                  className={`flex items-center ${k < last ? "flex-1" : "flex-none"} max-w-[490px]`}
                >
                  {!multi ? (
                    <button
                      onClick={() => setStep(k)}
                      aria-label={s.title}
                      className="relative flex-none cursor-pointer border-0 bg-transparent p-0"
                    >
                      <NodeBox node={s.nodes[0]} on={on} size="lg" />
                      <span
                        className={`${mono} absolute left-1/2 top-[calc(100%+12px)] flex w-[150px] -translate-x-1/2 flex-col items-center gap-[3px] text-center`}
                      >
                        <span className={`text-xs leading-tight ${label(on)}`}>
                          {s.nodes[0].tool}
                        </span>
                        <span className="text-[10px] text-[#8d8579]">
                          {s.nodes[0].sub}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep(k)}
                      aria-label={s.title}
                      className="relative flex w-[230px] flex-none cursor-pointer flex-col gap-3 border-0 bg-transparent p-0 text-left text-inherit"
                    >
                      <span
                        className={`absolute bottom-[22px] left-0 top-[22px] w-px transition-colors ${reached(k)}`}
                      />
                      {k < last && (
                        <span
                          className={`absolute bottom-[22px] right-0 top-[22px] w-px transition-colors ${line(k)}`}
                        />
                      )}
                      {s.nodes.map((n) => (
                        <span key={n.tool} className="flex h-11 items-center">
                          <span
                            className={`h-px w-4 flex-none ${reached(k)}`}
                          />
                          <NodeBox node={n} on={on} />
                          <span
                            className={`${mono} flex min-w-0 flex-col gap-0.5 pl-2.5`}
                          >
                            <span
                              className={`whitespace-nowrap text-xs ${label(on)}`}
                            >
                              {n.tool}
                            </span>
                            <span
                              className={`whitespace-nowrap text-[10px] ${subColor(n.sub)}`}
                            >
                              {n.sub}
                            </span>
                          </span>
                          {k < last && (
                            <span
                              className={`ml-2.5 h-px min-w-2.5 flex-1 ${line(k)}`}
                            />
                          )}
                        </span>
                      ))}
                    </button>
                  )}
                  {k < last && (
                    <span
                      className={`relative h-px min-w-9 flex-1 transition-colors ${line(k)}`}
                    >
                      <Image
                        src={icon("chevron-right", k < step)}
                        alt=""
                        aria-hidden
                        width={16}
                        height={16}
                        className={`absolute -right-1.5 -top-2 size-4 ${k < step ? "" : "brightness-[0.4]"}`}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mx-8 flex items-baseline gap-4 border-t border-[#d9d3ca] pb-6 pt-5">
            <span
              className={`${mono} whitespace-nowrap text-xs text-[#a87a2c]`}
            >
              stage_{pad(step)}
            </span>
            <span className="text-lg leading-normal">
              <span className="italic text-[#a87a2c]">{act.title}</span> —{" "}
              {act.detail}
            </span>
          </div>
        </div>
      </figure>

      {/* Mobile active stage */}
      <p className="m-0 text-[15px] leading-relaxed md:hidden">
        <span className={`${mono} text-[11px] text-[#a87a2c]`}>
          stage_{pad(step)}
        </span>{" "}
        <span className="italic text-[#a87a2c]">{act.title}</span> —{" "}
        {act.detail}
      </p>
    </section>
  );
}
