import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Bell,
  Bot,
  ChartNoAxesCombined,
  CheckCircle2,
  Compass,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  PiggyBank,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const productPillars = [
  {
    icon: LayoutDashboard,
    title: "Financial health dashboard",
    description:
      "See income, expenses, savings rate, debt, goals, and investment readiness in one calm view.",
  },
  {
    icon: Bot,
    title: "AI financial assistant",
    description:
      "Ask plain-language questions and get guidance grounded in your financial profile.",
  },
  {
    icon: Target,
    title: "Goal planner",
    description:
      "Turn goals like emergency savings, travel, debt payoff, or a home fund into monthly action steps.",
  },
  {
    icon: Bell,
    title: "Proactive nudges",
    description:
      "Surface helpful alerts for spending spikes, savings milestones, debt risk, and goal delays.",
  },
];

const workflowSteps = [
  "Share your financial picture",
  "Review your health score",
  "Ask the AI what to do next",
  "Track goals and nudges over time",
];

const guidanceAreas = [
  {
    icon: PiggyBank,
    title: "Budget and savings clarity",
    description:
      "Understand cash flow, emergency fund coverage, and tradeoffs before making big plans.",
  },
  {
    icon: Landmark,
    title: "Debt prioritization",
    description:
      "Compare payoff paths and learn why avalanche or snowball methods may fit different situations.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Investment readiness",
    description:
      "Learn allocation, concentration risk, and diversification without trade execution or hype.",
  },
  {
    icon: GraduationCap,
    title: "Financial education",
    description:
      "Ask beginner questions about Roth IRAs, credit scores, compound interest, taxes, and risk.",
  },
];

const HeroSection = () => (
  <section className="border-b border-border bg-background">
    <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 gap-12 px-4 py-8 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-14">
      <div className="flex flex-col gap-8">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight text-foreground">
            FinWise
          </Link>
          <Link to="/auth">
            <Button variant="outline" className="border-border bg-secondary text-foreground hover:bg-muted">
              Sign in
            </Button>
          </Link>
        </nav>

        <div className="max-w-3xl space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground">
            <Compass className="h-4 w-4 text-primary" />
            AI wealth guidance for people still building wealth
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Your AI wealth associate for everyday money decisions.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              FinWise helps young professionals and middle-income earners understand their financial picture, plan goals, manage debt, and learn what to do next.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/onboarding" className="w-full sm:w-auto">
              <Button className="h-12 w-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto">
                Start onboarding
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="h-12 w-full border-border bg-transparent px-6 text-base text-foreground hover:bg-secondary sm:w-auto">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                View dashboard demo
              </Button>
            </Link>
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Educational guidance
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              No trading inside app
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Beginner-friendly language
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary p-4 shadow-2xl shadow-black/20 md:p-6">
        <div className="space-y-5 rounded-md border border-border bg-background p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Financial health score</p>
              <p className="mt-2 text-5xl font-semibold text-foreground">72</p>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
              Good start
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Savings rate</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">18%</p>
            </div>
            <div className="rounded-md bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Debt risk</p>
              <p className="mt-2 text-2xl font-semibold text-primary">Medium</p>
            </div>
            <div className="rounded-md bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Emergency fund</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">2.4 mo</p>
            </div>
            <div className="rounded-md bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Goal progress</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">41%</p>
            </div>
          </div>

          <div className="rounded-md border border-primary/30 bg-primary/10 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Next best action</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Pay down high-interest credit card debt before increasing investing contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="border-b border-border bg-secondary py-16 md:py-24">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Why FinWise</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Personal finance tools are fragmented. Advice is expensive. Users still need a plan.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {productPillars.map((feature) => (
          <article key={feature.title} className="rounded-lg border border-border bg-background p-5">
            <feature.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-3 leading-7 text-muted-foreground">{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="border-b border-border bg-background py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">How it works</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            From financial confusion to a next step you can actually act on.
          </h2>
          <p className="max-w-2xl leading-8 text-muted-foreground">
            The MVP should collect structured data, interpret it, explain the reasoning, and turn recommendations into goal and debt workflows.
          </p>
        </div>

        <ol className="grid gap-3">
          {workflowSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <span className="font-medium text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

const GuidanceSection = () => (
  <section className="border-b border-border bg-secondary py-16 md:py-24">
    <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">MVP guidance areas</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Built for education, planning, and accountability.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {guidanceAreas.map((area) => (
          <article key={area.title} className="rounded-lg border border-border bg-background p-5">
            <area.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{area.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const SafetySection = () => (
  <section className="bg-background py-16 md:py-24">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/15">
        <ShieldCheck className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Guidance, not trade execution.
          </h2>
          <p className="max-w-3xl leading-8 text-muted-foreground">
            FinWise should help users understand decisions, compare tradeoffs, and learn financial concepts. It should not guarantee returns, provide legally binding tax advice, or tell users to buy or sell specific securities.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/onboarding" className="w-full sm:w-auto">
            <Button className="h-12 w-full bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto">
              Start with your profile
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="h-12 w-full border-border bg-transparent px-6 text-base text-foreground hover:bg-secondary sm:w-auto">
              Explore demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => (
  <main className="min-h-screen bg-background">
    <HeroSection />
    <ProblemSection />
    <HowItWorksSection />
    <GuidanceSection />
    <SafetySection />
  </main>
);

export default Index;
