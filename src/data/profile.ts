/**
 * Single source of truth for every word on this site.
 * Both the website mode and the nvim mode render from here — the nvim buffers
 * in `buffers.ts` are generated from this file at import time.
 *
 * Prose supports two inline markers: **bold** and `code`.
 */

export type Principle = { title: string; body: string }
export type SkillGroup = { key: string; label: string; blurb: string; items: string[] }
export type Role = { role: string; company: string; period: string; summary: string; bullets: string[] }
export type Project = {
  slug: string
  name: string
  desc: string
  stack: string[]
  notes: string[]
  url?: string
  featured?: boolean
}

export const PROFILE = {
  name: 'Mohamad Krayem',
  initials: 'MK',
  roles: ['Full Stack Developer', 'Agentic Systems Engineer', '.NET · Node.js · React'],
  tagline: 'I build backends that stay up and agents that do real work.',
  available: 'Open to full stack & agentic systems work',

  intro: [
    'I build systems end to end: the API that holds the data honest, the queue that keeps it moving, and the interface that makes it feel instant. Lately most of that work has agents somewhere in the loop.',
    'That means **.NET** and **Node.js** on the server, **React** in the browser, **PostgreSQL** underneath, and **Redis**, **RabbitMQ**, **Docker** and **AWS** filling in the gaps between them.',
  ],

  doing: [
    'Design and ship full stack products, from schema to deploy.',
    'Write services in **.NET** and **Node.js**, and interfaces in **React**.',
    'Model data in **PostgreSQL**, cache it in **Redis**, and move it through **RabbitMQ** when it should not be a request/response call.',
    'Package with **Docker** and run it on **AWS**.',
    'Build **agentic systems**: tool-calling loops, retries, evals, and the context plumbing that keeps them from going sideways.',
  ],

  principles: [
    {
      title: 'Correctness first',
      body: 'Then latency, then cleverness. In that order, every time.',
    },
    {
      title: 'Boring infrastructure',
      body: 'Interesting product. The database should be the least surprising thing in the stack.',
    },
    {
      title: 'Observable by default',
      body: 'If a failure mode is not observable, it is not handled — it is just quiet.',
    },
  ] satisfies Principle[],

  skills: [
    {
      key: 'languages',
      label: 'Languages',
      blurb: 'What I think in',
      items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Python'],
    },
    {
      key: 'backend',
      label: 'Backend',
      blurb: 'Services that hold up',
      items: [
        'ASP.NET Core',
        'Entity Framework Core',
        'Minimal APIs',
        'NestJS',
        'Express',
        'Fastify',
        'REST',
        'event-driven',
        'CQRS',
        'background workers',
      ],
    },
    {
      key: 'frontend',
      label: 'Frontend',
      blurb: 'Interfaces that feel instant',
      items: ['React', 'TypeScript', 'Vite', 'React Query', 'Zustand', 'Redux', 'Tailwind CSS'],
    },
    {
      key: 'data',
      label: 'Data & messaging',
      blurb: 'Where the truth lives',
      items: ['PostgreSQL', 'Redis', 'RabbitMQ', 'SQL Server', 'MongoDB', 'Elasticsearch'],
    },
    {
      key: 'infra',
      label: 'Infrastructure',
      blurb: 'Getting it to production',
      items: [
        'Docker',
        'docker compose',
        'AWS (EC2, S3, RDS, SQS, Lambda)',
        'GitHub Actions',
        'Azure DevOps',
        'OpenTelemetry',
        'Grafana',
      ],
    },
    {
      key: 'agentic',
      label: 'Agentic',
      blurb: 'Models with a job to do',
      items: [
        'Claude API',
        'MCP',
        'tool calling',
        'retrieval',
        'evals & regression suites',
        'context management',
        'multi-agent orchestration',
        'guardrails',
      ],
    },
  ] satisfies SkillGroup[],

  // TODO: replace the placeholders with your real roles, dates and numbers.
  experience: [
    {
      role: 'Senior Full Stack Engineer',
      company: '<Company>',
      period: '<Month Year> — Present',
      summary: 'Owning a .NET service end to end, from schema to the dashboards it pages on.',
      bullets: [
        'Owned <service name>: a .NET API backed by PostgreSQL, serving <n> requests/day behind a Redis read cache.',
        'Moved <workflow> off the request path onto RabbitMQ, cutting p95 from <before> to <after>.',
        'Containerised the stack with Docker and shipped it to AWS (<ECS / EKS / EC2>), with <CI system> running the deploys.',
      ],
    },
    {
      role: 'Full Stack Engineer',
      company: '<Company>',
      period: '<Month Year> — <Month Year>',
      summary: 'First commit to production on a React + Node.js product surface.',
      bullets: [
        'Built <product surface> in React + TypeScript against a Node.js API, from first commit to production.',
        'Designed the PostgreSQL schema and the migration path off <legacy>.',
        'Set up the observability that turned "it feels slow" into a number.',
      ],
    },
    {
      role: 'Agentic Systems',
      company: 'independent / side work',
      period: '<Month Year> — Present',
      summary: 'Agents built like distributed systems, not like prompts.',
      bullets: [
        'Designed tool-calling agents with explicit budgets, retries, and structured failure states instead of hopeful prompting.',
        'Built the eval harness first, so a prompt change is a measurable change rather than a vibe.',
      ],
    },
  ] satisfies Role[],

  // TODO: swap these for your real projects.
  projects: [
    {
      slug: 'project-one',
      name: 'Event-driven order pipeline',
      desc: 'A synchronous checkout, split into durable queue stages that can be replayed.',
      stack: ['.NET 8', 'PostgreSQL', 'RabbitMQ', 'Redis', 'Docker'],
      notes: [
        'Split a synchronous checkout into durable queue stages.',
        'Idempotent consumers, dead-letter queue, replay tooling.',
        '<n>x throughput at the same instance count.',
      ],
      url: 'https://github.com/<you>/<project-one>',
      featured: true,
    },
    {
      slug: 'project-two',
      name: 'Realtime dashboard',
      desc: 'Streaming updates with optimistic UI, reconnects and backfill that nobody notices.',
      stack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Redis'],
      notes: [
        'Streaming updates with optimistic UI and reconnect/backfill.',
        'Redis pub/sub fan-out to <n> concurrent clients.',
      ],
      url: 'https://github.com/<you>/<project-two>',
    },
    {
      slug: 'project-three',
      name: 'Agentic operations assistant',
      desc: 'A tool-calling agent over internal services, gated by evals and a human on writes.',
      stack: ['Claude API', 'MCP', 'Node.js', 'PostgreSQL'],
      notes: [
        'Tool-calling agent over internal services with scoped access.',
        'Eval suite gating every prompt and tool change.',
        'Human approval step on anything that writes.',
      ],
      url: 'https://github.com/<you>/<project-three>',
      featured: true,
    },
    {
      slug: 'portfolio',
      name: 'This site',
      desc: 'A portfolio with two personalities: a modern site, and the editor I actually live in.',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind'],
      notes: [
        'Two modes over one content source.',
        'Modal keybindings, buffers, telescope, statusline — all hand-written.',
      ],
    },
  ] satisfies Project[],

  agentic: {
    lead: 'Most agent demos work once. Making one work on a Tuesday afternoon with real data is a different engineering problem, and it looks a lot more like distributed systems than like prompting.',
    points: [
      {
        title: 'Loops with budgets',
        body: 'Every run has a step limit, a token budget, and a timeout. An agent without a budget is an outage with good intentions.',
      },
      {
        title: 'Tools as APIs',
        body: 'Tool definitions get the same care as public endpoints: narrow inputs, typed outputs, explicit errors. If the model can misread it, it will.',
      },
      {
        title: 'Structured failure',
        body: 'Tools return `{ ok: false, reason }`, not prose. A loop can branch on a reason code; it cannot branch on an apology.',
      },
      {
        title: 'Evals before prompts',
        body: 'A regression suite over recorded cases, run on every change. Otherwise "improving the prompt" is a coin flip you cannot audit.',
      },
      {
        title: 'Context as a resource',
        body: 'Retrieval, summarisation and pruning are budget decisions, not afterthoughts. The context window is the working set.',
      },
      {
        title: 'Humans where it writes',
        body: 'Reads are cheap to get wrong. Writes are not, so writes get an approval step.',
      },
    ] satisfies Principle[],
    stack: [
      ['runtime', 'Node.js / TypeScript, .NET where the domain already lives'],
      ['models', 'Claude (Opus / Sonnet), tool use + MCP servers'],
      ['state', 'PostgreSQL for runs and traces, Redis for locks and rate limits, RabbitMQ for long jobs'],
      ['ops', 'Docker, AWS, OpenTelemetry traces per agent step'],
    ] as [string, string][],
    closing:
      'An agent is a control loop wrapped around a fallible function call. Treat the model as the fallible part, engineer everything around it accordingly, and most of the magic becomes ordinary reliability work.',
  },

  contact: {
    email: 'moekrayem12321@gmail.com',
    github: 'https://github.com/<your-handle>',
    linkedin: 'https://linkedin.com/in/<your-handle>',
    location: '<City, Country> · remote-friendly',
    responseTime: 'Usually replies within a day.',
    prompts: [
      'a backend that outgrew its architecture',
      'an agent that works in the demo and not in production',
      'a .NET/Node service that needs to get boring again',
    ],
  },
}

export type Profile = typeof PROFILE
