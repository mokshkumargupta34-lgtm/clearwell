/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldAlert, AlertCircle, Info, CalendarRange } from "lucide-react";
import { Item, Interaction } from "../types";

interface ResultCardProps {
  key?: string;
  itemA: Item;
  itemB: Item;
  interaction?: Interaction;
  index?: number;
}

export default function ResultCard({ itemA, itemB, interaction, index = 0 }: ResultCardProps) {
  // If undefined interaction, it is routine/clear
  const isFlagged = !!interaction;

  // Render severe, moderate, or minor configurations
  const getSeverityConfig = (level?: number) => {
    switch (level) {
      case 3:
        return {
          bgClass: "bg-[#fdf9f7] border-[#f2d8cf]",
          badgeBgClass: "bg-[#fcf3ef] border-[#f2d8cf] text-[#a85232]",
          textClass: "text-[#a85232]",
          barClass: "bg-[#a85232]",
          label: "Severe: Talk to a pharmacist or doctor before combining",
          icon: <ShieldAlert className="h-5 w-5" />
        };
      case 2:
        return {
          bgClass: "bg-[#fefcf8] border-[#f5e6ce]",
          badgeBgClass: "bg-[#fffcf5] border-[#f5e6ce] text-[#b47a1c]",
          textClass: "text-[#b47a1c]",
          barClass: "bg-[#b47a1c]",
          label: "Moderate: Worth discussing at your next visit",
          icon: <AlertCircle className="h-5 w-5" />
        };
      case 1:
        return {
          bgClass: "bg-[#f5fafe]/40 border-[#dae6ee]",
          badgeBgClass: "bg-[#f2f7fa] border-[#dae6ee] text-[#47657b]",
          textClass: "text-[#47657b]",
          barClass: "bg-[#47657b]",
          label: "Minor: Good to know — usually easy to manage",
          icon: <Info className="h-5 w-5" />
        };
      default:
        return {
          bgClass: "bg-[#fcfcfa] border-[#f0ece4]",
          badgeBgClass: "bg-[#f0f6f3] border-[#d6e6de] text-[#2b5a47]",
          textClass: "text-[#2b5a47]",
          barClass: "bg-[#2b5a47]",
          label: "Routine: No interaction flagged in the demo database",
          icon: <CalendarRange className="h-5 w-5" />
        };
    }
  };

  const severityLevel = interaction?.severity;
  const config = getSeverityConfig(severityLevel);

  const formatItemType = (type: string) => {
    switch (type) {
      case "medication":
        return "Medication";
      case "supplement":
        return "Supplement";
      case "food":
        return "Food/Dietary";
      default:
        return "Substance";
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.5), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group border rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-[#122e2a]/5 ${config.bgClass} flex flex-col md:flex-row print:shadow-none print:transform-none`}
      id={`result-card-${itemA.id}-${itemB.id}`}
    >
      {/* Visual Accent Side Ribbon */}
      <div className={`relative w-full md:w-2 shrink-0 h-2 md:h-auto overflow-hidden ${config.barClass}`}>
        {/* subtle sheen travelling along the accent bar on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-y-full bg-white/30 transition-transform duration-700 ease-out group-hover:translate-y-full" aria-hidden="true" />
      </div>

      {/* Main Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Header section representing the contrasted pair */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0ece4] pb-3.5 mb-4">
            <h4 className="font-sans text-base font-bold text-[#122e2a] flex items-center gap-1.5 flex-wrap">
              <span className="text-[#122e2a]">{itemA.name}</span>
              <span className="text-[#a0aaa7] font-normal text-xs font-mono">({formatItemType(itemA.type)})</span>
              <span className="text-[#4c7c6a] font-normal font-sans px-1">✢</span>
              <span className="text-[#122e2a]">{itemB.name}</span>
              <span className="text-[#a0aaa7] font-normal text-xs font-mono">({formatItemType(itemB.type)})</span>
            </h4>

            {/* Severity Badge (Color + Label + Icon) */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-tight ${config.badgeBgClass}`}
              id={`badge-tag-${itemA.id}-${itemB.id}`}
            >
              {config.icon}
              <span className="font-sans">{config.label}</span>
            </div>
          </div>

          {/* Description elements */}
          {isFlagged ? (
            <div className="space-y-4 text-xs font-sans text-[#526662]">
              <div>
                <h5 className="font-semibold text-[#122e2a] mb-1 font-sans">
                  What happens & why:
                </h5>
                <p className="leading-relaxed ">{interaction.what}</p>
              </div>

              <div>
                <h5 className="font-semibold text-[#122e2a] mb-1 font-sans">
                  Actionable recommendation:
                </h5>
                <p className="leading-relaxed text-[#122e2a] bg-white border border-[#ece7dc] p-3 rounded-lg font-medium">
                  {interaction.advice}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs font-sans text-[#526662]">
              <p className="leading-relaxed">
                No well-documented text-book clinical overlaps currently exist between{" "}
                <strong className="text-[#122e2a]">{itemA.name}</strong> and{" "}
                <strong className="text-[#122e2a]">{itemB.name}</strong> inside our demo dataset.
              </p>
              <p className="leading-relaxed text-[#7d8f8b] italic">
                Absence of an interaction record in this system never guarantees compound compatibility. Maintain alert awareness and monitor for bodily signals.
              </p>
            </div>
          )}
        </div>

        {/* Source citation watermark at card bottom (looks like medical summary printout) */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#93a29f] border-t border-[#f2eee6] pt-3 mt-1">
          <div>
            Ref: {isFlagged ? "CLINICAL-PAIR" : "DEMO-UNLISTED"}-
            {Math.abs(itemA.id.charCodeAt(4) + itemB.id.charCodeAt(4))}
          </div>
          <div className="text-right">
            Source: {interaction?.source || "Standard Pharmaceutical Literature"}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
