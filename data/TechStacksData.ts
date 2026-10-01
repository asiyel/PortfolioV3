import { Category } from "@/types/TechStackTypes";

export const techStack: Category[] = [
  {
    id: "01",
    label: "Frontend",
    icon: "/icons/01-frontend/_category-monitor.png",
    stacks: [
      {
        name: "Next.js (App Router)",
        content: "The App Router framework for nearly every web build.",
        icon: "/icons/01-frontend/next-js-app-router.png",
      },
      {
        name: "React",
        content: "Component model for all interfaces, hooks-first.",
        icon: "/icons/01-frontend/react.png",
      },
      {
        name: "Tailwind CSS",
        content: "Utility styling wired to design tokens.",
        icon: "/icons/01-frontend/tailwind-css.png",
      },
      {
        name: "React Hooks",
        content: "State, effects and refs — useRef for imperative control.",
        icon: "/icons/01-frontend/react-hooks.png",
      },
      {
        name: "Server Components",
        content: "Render on the server, ship less JavaScript.",
        icon: "/icons/01-frontend/server-components.png",
      },
      {
        name: "Server Actions",
        content: "Mutations without a hand-written API layer.",
        icon: "/icons/01-frontend/server-actions.png",
      },
      {
        name: "Next.js Proxy",
        content: "Request interception and rewrites in Next.js 16.",
        icon: "/icons/01-frontend/next-js-proxy.png",
      },
      {
        name: "SSR · SSG · ISR · CSR",
        content: "Picking the right rendering strategy per route.",
        icon: "/icons/01-frontend/ssr-ssg-isr-csr.png",
      },
      {
        name: "Framer Motion",
        content: "Purposeful motion and layout transitions.",
        icon: "/icons/01-frontend/framer-motion.png",
      },
      {
        name: "shadcn/ui",
        content: "Accessible, owned component primitives.",
        icon: "/icons/01-frontend/shadcn-ui.png",
      },
      {
        name: "Base UI",
        content: "Unstyled, accessible building blocks.",
        icon: "/icons/01-frontend/base-ui.png",
      },
      {
        name: "Recharts",
        content: "Composable charts for dashboards.",
        icon: "/icons/01-frontend/recharts.png",
      },
      {
        name: "Embla Carousel",
        content: "Lightweight, fluid carousels.",
        icon: "/icons/01-frontend/embla-carousel.png",
      },
      {
        name: "next-intl",
        content: "Internationalised routing and messages.",
        icon: "/icons/01-frontend/next-intl.png",
      },
      {
        name: "Plain CSS",
        content: "When a framework would be overkill.",
        icon: "/icons/01-frontend/plain-css.png",
      },
      {
        name: "HSL custom properties",
        content: "Themeable colour systems via CSS variables.",
        icon: "/icons/01-frontend/hsl-custom-properties.png",
      },
    ],
  },
  {
    id: "02",
    label: "Backend",
    icon: "/icons/02-backend/_category-server.png",
    stacks: [
      {
        name: "ASP.NET Core",
        content: "High-performance .NET web services.",
        icon: "/icons/02-backend/asp-net-core.png",
      },
      {
        name: "ASP.NET Core Web API",
        content: "RESTful APIs with clean contracts.",
        icon: "/icons/02-backend/asp-net-core-web-api.png",
      },
      {
        name: "EF Core",
        content: "Typed data access and migrations for .NET.",
        icon: "/icons/02-backend/ef-core.png",
      },
      {
        name: "Express.js",
        content: "Minimal Node.js servers and middleware.",
        icon: "/icons/02-backend/express-js.png",
      },
      {
        name: "Supabase RPC",
        content: "Business logic in PostgreSQL functions.",
        icon: "/icons/02-backend/supabase-rpc.png",
      },
      {
        name: "Row Level Security",
        content: "Authorisation enforced at the database row.",
        icon: "/icons/02-backend/row-level-security.png",
      },
      {
        name: "Supabase Storage",
        content: "Files and media with policy-based access.",
        icon: "/icons/02-backend/supabase-storage.png",
      },
      {
        name: "Supabase Auth",
        content: "Sign-in, sessions and providers.",
        icon: "/icons/02-backend/supabase-auth.png",
      },
      {
        name: "Supabase SSR",
        content: "Auth-aware server rendering.",
        icon: "/icons/02-backend/supabase-ssr.png",
      },
    ],
  },
  {
    id: "03",
    label: "Database",
    icon: "/icons/03-database/_category-database.png",
    stacks: [
      {
        name: "SQL / MySQL",
        content: "Relational modelling and query tuning.",
        icon: "/icons/03-database/sql-mysql.png",
      },
      {
        name: "MSSQL",
        content: "SQL Server for enterprise workloads.",
        icon: "/icons/03-database/mssql.png",
      },
      {
        name: "Stored Procedures",
        content: "Encapsulated, performant MSSQL logic.",
        icon: "/icons/03-database/stored-procedures.png",
      },
      {
        name: "PostgreSQL",
        content: "The relational database of choice.",
        icon: "/icons/03-database/postgresql.png",
      },
      {
        name: "Supabase PostgreSQL",
        content: "Managed Postgres with realtime and auth.",
        icon: "/icons/03-database/supabase-postgresql.png",
      },
    ],
  },
  {
    id: "04",
    label: "CMS",
    icon: "/icons/04-cms/_category-file-text.png",
    stacks: [
      {
        name: "Hygraph",
        content: "Headless content, modelled and federated.",
        icon: "/icons/04-cms/hygraph.png",
      },
      {
        name: "GraphQL",
        content: "Querying exactly the content a page needs.",
        icon: "/icons/04-cms/graphql.png",
      },
    ],
  },
  {
    id: "05",
    label: "Cloud & APIs",
    icon: "/icons/05-cloud-apis/_category-cloud.png",
    stacks: [
      {
        name: "Google Sheets API",
        content: "Sheets as a lightweight data source.",
        icon: "/icons/05-cloud-apis/google-sheets-api.png",
      },
      {
        name: "Google Drive API",
        content: "Automated file handling and sharing.",
        icon: "/icons/05-cloud-apis/google-drive-api.png",
      },
      {
        name: "Gmail API",
        content: "Programmatic mail reading and sending.",
        icon: "/icons/05-cloud-apis/gmail-api.png",
      },
      {
        name: "Resend",
        content: "Transactional email that just delivers.",
        icon: "/icons/05-cloud-apis/resend.png",
      },
    ],
  },
  {
    id: "06",
    label: "Automation",
    icon: "/icons/06-automation/_category-workflow.png",
    stacks: [
      {
        name: "n8n (self-hosted)",
        content: "Self-hosted workflow automation.",
        icon: "/icons/06-automation/n8n-self-hosted.png",
      },
      {
        name: "n8n AI Agent",
        content: "LLM agents inside automation flows.",
        icon: "/icons/06-automation/n8n-ai-agent.png",
      },
      {
        name: "Zapier",
        content: "Quick no-code integrations.",
        icon: "/icons/06-automation/zapier.png",
      },
      {
        name: "Telegram Bot API",
        content: "Bots for alerts and conversations.",
        icon: "/icons/06-automation/telegram-bot-api.png",
      },
      {
        name: "BotFather",
        content: "Provisioning and configuring Telegram bots.",
        icon: "/icons/06-automation/botfather.png",
      },
      {
        name: "Webhooks",
        content: "Event-driven glue between services.",
        icon: "/icons/06-automation/webhooks.png",
      },
    ],
  },
  {
    id: "07",
    label: "DevOps",
    icon: "/icons/07-devops/_category-container.png",
    stacks: [
      {
        name: "Docker",
        content: "Reproducible, containerised environments.",
        icon: "/icons/07-devops/docker.png",
      },
      {
        name: "Docker Compose",
        content: "Multi-service stacks in one file.",
        icon: "/icons/07-devops/docker-compose.png",
      },
      {
        name: "Vercel",
        content: "Deploys, previews and the edge.",
        icon: "/icons/07-devops/vercel.png",
      },
      {
        name: "Git",
        content: "Version control for everything.",
        icon: "/icons/07-devops/git.png",
      },
      {
        name: "GitHub",
        content: "Repositories, reviews and collaboration.",
        icon: "/icons/07-devops/github.png",
      },
      {
        name: "PowerShell / Windows CLI",
        content: "Scripting and automation on Windows.",
        icon: "/icons/07-devops/powershell-windows-cli.png",
      },
    ],
  },
  {
    id: "08",
    label: "Dev Tools",
    icon: "/icons/08-dev-tools/_category-wrench.png",
    stacks: [
      {
        name: "Postman",
        content: "Designing, testing and documenting APIs.",
        icon: "/icons/08-dev-tools/postman.png",
      },
    ],
  },
  {
    id: "09",
    label: "Project Management",
    icon: "/icons/09-project-management/_category-kanban.png",
    stacks: [
      {
        name: "Asana",
        content: "Planning, tracking and shipping projects.",
        icon: "/icons/09-project-management/asana.png",
      },
    ],
  },
  {
    id: "10",
    label: "AI / ML",
    icon: "/icons/10-ai-ml/_category-brain-circuit.png",
    stacks: [
      {
        name: "PyTorch (CUDA)",
        content: "GPU-accelerated training and inference.",
        icon: "/icons/10-ai-ml/pytorch-cuda.png",
      },
      {
        name: "Transformers",
        content: "Pretrained models for language tasks.",
        icon: "/icons/10-ai-ml/transformers.png",
      },
      {
        name: "PEFT",
        content: "Parameter-efficient fine-tuning with LoRA.",
        icon: "/icons/10-ai-ml/peft.png",
      },
      {
        name: "Hugging Face",
        content: "Models, datasets and the wider ecosystem.",
        icon: "/icons/10-ai-ml/hugging-face.png",
      },
      {
        name: "Llama / local LLMs",
        content: "Running open models on local hardware.",
        icon: "/icons/10-ai-ml/llama-local-llms.png",
      },
      {
        name: "Claude",
        content: "Reasoning and writing in day-to-day work.",
        icon: "/icons/10-ai-ml/claude.png",
      },
      {
        name: "GPT",
        content: "General-purpose models across projects.",
        icon: "/icons/10-ai-ml/gpt.png",
      },
    ],
  },
  {
    id: "11",
    label: "Web Scraping",
    icon: "/icons/11-web-scraping/_category-scan-search.png",
    stacks: [
      {
        name: "requests",
        content: "Simple, reliable HTTP for scraping.",
        icon: "/icons/11-web-scraping/requests.png",
      },
      {
        name: "BeautifulSoup",
        content: "Parsing and extracting structured HTML.",
        icon: "/icons/11-web-scraping/beautifulsoup.png",
      },
    ],
  },
  {
    id: "12",
    label: "SEO",
    icon: "/icons/12-seo/_category-search.png",
    stacks: [
      {
        name: "Google Analytics",
        content: "Traffic and behaviour insight.",
        icon: "/icons/12-seo/google-analytics.png",
      },
      {
        name: "Search Console",
        content: "Indexing, queries and search health.",
        icon: "/icons/12-seo/search-console.png",
      },
      {
        name: "Screaming Frog",
        content: "Technical SEO crawls and audits.",
        icon: "/icons/12-seo/screaming-frog.png",
      },
      {
        name: "CMS platforms",
        content: "SEO across a range of content systems.",
        icon: "/icons/12-seo/cms-platforms.png",
      },
    ],
  },
  {
    id: "13",
    label: "Design & Media",
    icon: "/icons/13-design-media/_category-palette.png",
    stacks: [
      {
        name: "Photoshop",
        content: "Image editing and compositing.",
        icon: "/icons/13-design-media/photoshop.png",
      },
      {
        name: "Premiere",
        content: "Video editing and post-production.",
        icon: "/icons/13-design-media/premiere.png",
      },
      {
        name: "Canva",
        content: "Fast layouts for social and marketing.",
        icon: "/icons/13-design-media/canva.png",
      },
      {
        name: "Figma",
        content: "Interface design and prototyping.",
        icon: "/icons/13-design-media/figma.png",
      },
    ],
  },
];
