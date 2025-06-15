
import { Button } from "@/components/ui/button";

// Hero Section Component
const HeroSection = () => (
  <section className="max-w-3xl mx-auto py-12 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary animate-fade-in">
      Unlock Your Financial Future with Smart, Personalized Advice
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in">
      Your AI Coach for Money Confidence—No Experience Needed
    </p>
    <Button className="px-8 py-4 text-lg mt-2 animate-scale-in">Start Your Wealth Journey Today</Button>
  </section>
);

const Section = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`max-w-2xl mx-auto py-8 px-4 ${className}`}>
    <h2 className="text-2xl font-semibold mb-2 text-primary">{title}</h2>
    <div className="text-base text-foreground">{children}</div>
  </section>
);

const HowItWorksStep = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <div className="flex items-start space-x-4 py-2">
    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
      {number}
    </div>
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-muted-foreground">{description}</div>
    </div>
  </div>
);

const BenefitsList = () => (
  <ul className="grid gap-3">
    <li>
      <span className="font-medium text-primary">Made for Beginners:</span> No jargon, no judgment, just simple steps.
    </li>
    <li>
      <span className="font-medium text-primary">Always On Your Side:</span> Your data stays private, your goals drive the plan.
    </li>
    <li>
      <span className="font-medium text-primary">Affordable &amp; Accessible:</span> Get expert guidance—no more high fees or intimidating processes.
    </li>
    <li>
      <span className="font-medium text-primary">Empower Your Success:</span> Learn as you grow, build strong habits, and celebrate big wins.
    </li>
  </ul>
);

const CTASection = () => (
  <section className="text-center py-12">
    <h2 className="text-3xl font-bold mb-4 text-primary">Take the guesswork out of money.</h2>
    <p className="text-lg text-muted-foreground mb-6">
      Join thousands of people starting their path to financial freedom.
    </p>
    <Button className="px-8 py-4 text-lg animate-scale-in">Get Started Now</Button>
  </section>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <HeroSection />

      <Section title="The Problem">
        Financial advice often feels confusing, intimidating, and way too expensive. Most guides speak in jargon or require minimum balances—leaving beginners overwhelmed and unsure where to start.
      </Section>

      <Section title="The Solution">
        Meet your new AI financial coach—an easy-to-use app designed to empower you from day one. Get clear, personalized strategies for saving, spending, and building wealth, all tailored to your unique goals and lifestyle. It’s like having a friendly money expert in your pocket, 24/7.
      </Section>

      <Section title="How It Works" className="pb-0">
        <div className="space-y-2">
          <HowItWorksStep
            number={1}
            title="Answer a Few Questions"
            description="Tell us about your goals—whether it’s building savings, getting out of debt, or investing for your first major milestone."
          />
          <HowItWorksStep
            number={2}
            title="Get Your Personalized Plan"
            description="Instantly receive easy-to-follow action steps and budgets, designed just for you."
          />
          <HowItWorksStep
            number={3}
            title="Ongoing Guidance"
            description="Chat with your AI coach anytime to ask questions, adjust your plan, or get support when things change."
          />
        </div>
      </Section>

      <Section title="Why Choose Us?" className="pb-0">
        <BenefitsList />
      </Section>

      <CTASection />
    </main>
  );
};

export default Index;
