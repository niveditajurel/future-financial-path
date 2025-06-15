
import React from "react";

type GoalStep = {
  label: string;
  tip: string;
  date: string;
  progress: number;
};

type GoalTimelineProps = {
  goalSteps: GoalStep[];
};

export const GoalTimeline: React.FC<GoalTimelineProps> = ({ goalSteps }) => {
  return (
    <div className="w-full max-w-md mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Goal Journey Timeline</h2>
      <ol className="relative border-l-4 border-primary bg-muted rounded-xl shadow p-6 min-h-[250px]">
        {goalSteps.map((step, idx) => (
          <li key={step.label + step.date} className="mb-10 last:mb-0 pl-6 relative">
            {/* Circle Step Dots */}
            <span className={`
              absolute -left-6 flex items-center justify-center w-7 h-7 
              rounded-full ring-4 ${step.progress === 100 ? 'bg-green-500' : 'bg-primary'} ring-background transition-colors
            `}>
              <span className="text-white font-semibold">
                {idx + 1}
              </span>
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{step.label}</h3>
                <span className="text-xs text-muted-foreground">
                  {new Date(step.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full mt-1 h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${step.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Progress: <span className="font-semibold">{step.progress}%</span></span>
              </div>
              {/* AI Tip */}
              <div className="mt-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm italic border-l-4 border-blue-400 shadow">
                💡 <span>{step.tip}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

// ----- Example usage (copy this to a parent page/component) ------

// import { GoalTimeline } from "@/components/GoalTimeline";

// const goalSteps = [
//   {
//     label: 'Start Emergency Fund',
//     tip: 'Begin with $500 for unplanned expenses.',
//     date: '2024-07-01',
//     progress: 30
//   },
//   {
//     label: 'Reach $2,000',
//     tip: 'Automate $200 per month from your paycheck.',
//     date: '2024-12-01',
//     progress: 60
//   },
//   {
//     label: 'Buy a House',
//     tip: 'Research loan options at least 6 months beforehand.',
//     date: '2026-08-15',
//     progress: 90
//   }
// ];

// <GoalTimeline goalSteps={goalSteps} />

