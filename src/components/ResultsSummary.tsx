/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { AnalysisSummary } from "../types";
import AnimatedNumber from "./AnimatedNumber";

interface ResultsSummaryProps {
  summary: AnalysisSummary;
  hasRunCheck: boolean;
}

export default function ResultsSummary({ summary, hasRunCheck }: ResultsSummaryProps) {
  if (!hasRunCheck) return null;

  const { severeCount, moderateCount, minorCount, noInteractionCount } = summary;

  // Compute overall vibe for the alert header
  const getResultsVibe = () => {
    if (severeCount > 0) {
      return {
        title: "Important notes to review",
        colorClass: "bg-[#fcf3ef] border-[#f2d8cf] text-[#a85232]",
        description: "Some checked pairs are worth noting. We've compiled them below to help you have a constructive, calm conversation with your pharmacist or doctor.",
        icon: <ShieldAlert className="h-5 w-5 text-[#a85232]" />
      };
    } else if (moderateCount > 0 || minorCount > 0) {
      return {
        title: "Routine observations identified",
        colorClass: "bg-[#fffcf5] border-[#f6e5c9] text-[#b47a1c]",
        description: "A few common, mild-to-moderate pairings have been observed. Most are routine and easy to schedule around (such as spacing calcium supplements), but are good to check or note down.",
        icon: <Info className="h-5 w-5 text-[#b47a1c]" />
      };
    } else {
      return {
        title: "No known interactions flagged",
        colorClass: "bg-[#f0f6f3] border-[#d6e6de] text-[#2b5a47]",
        description: "Great news — no interactions exist for your selected combinations in our current database. Please remember this doesn't guarantee absolute safety, as our system uses a simplified demo dataset.",
        icon: <CheckCircle2 className="h-5 w-5 text-[#2b5a47]" />
      };
    }
  };

  const vibe = getResultsVibe();

  // Tally cards described declaratively so they can be staggered cleanly
  const tallies = [
    {
      id: "tally-severe-count",
      count: severeCount,
      label: "Severe",
      sub: "Actionable check with doctor",
      cardClass: "bg-[#fcf3ef]/50 border-[#f2d8cf]",
      numClass: "text-[#a85232]"
    },
    {
      id: "tally-moderate-count",
      count: moderateCount,
      label: "Moderate",
      sub: "Discuss on next visit",
      cardClass: "bg-[#fffcf5]/50 border-[#f6e5c9]",
      numClass: "text-[#b47a1c]"
    },
    {
      id: "tally-minor-count",
      count: minorCount,
      label: "Minor",
      sub: "Usually simple to manage",
      cardClass: "bg-[#f2f7fa]/60 border-[#dae6ee]",
      numClass: "text-[#47657b]"
    },
    {
      id: "tally-clean-count",
      count: noInteractionCount,
      label: "Routine / Clear",
      sub: "No interaction flagged",
      cardClass: "bg-[#f0f6f3]/50 border-[#d6e6de]",
      numClass: "text-[#2b5a47]"
    }
  ];

  return (
    <div className="w-full bg-white border border-[#e8e4db] rounded-2xl p-6 mb-8 shadow-sm" id="interaction-results-summary-board">
      <div className="border-b border-[#f0ece4] pb-5 mb-5">
        <h3 className="font-sans text-xs font-semibold text-[#526662] uppercase tracking-wider mb-3">
          Analysis Status Report
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`border rounded-xl p-4 flex items-start gap-3.5 ${vibe.colorClass}`}
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
            className="mt-0.5 shrink-0"
          >
            {vibe.icon}
          </motion.div>
          <div>
            <h4 className="text-sm font-bold font-sans tracking-tight">{vibe.title}</h4>
            <p className="text-xs mt-1 text-[#40524e] leading-relaxed font-sans">{vibe.description}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="severity-tally-grid">
        {tallies.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, scale: 1.02 }}
            className={`border rounded-xl p-4 text-center cursor-default transition-shadow duration-200 hover:shadow-md ${t.cardClass}`}
          >
            <AnimatedNumber
              id={t.id}
              value={t.count}
              className={`block font-mono text-2xl font-bold ${t.numClass}`}
            />
            <div className="text-xs font-semibold text-[#122e2a] mt-1 font-sans">{t.label}</div>
            <div className="text-[10px] text-[#526662] mt-0.5 font-sans leading-tight">{t.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Persistent Note reminding that absence of findings does not guarantee safety */}
      <div className="mt-5 p-3.5 bg-[#fbfaf7] border border-[#e8e4db] rounded-xl text-center">
        <p className="text-[11px] text-[#526662] leading-relaxed font-sans">
          ⚠️ <strong className="text-[#122e2a]">A Note on Clinical Completeness:</strong> Even if most items return "Routine/Clear", remember that our database is a simplified illustration. Always confirm the compatibility of your medications with a real healthcare provider or pharmacist, as hundreds of ingredients are omitted here.
        </p>
      </div>
    </div>
  );
}
