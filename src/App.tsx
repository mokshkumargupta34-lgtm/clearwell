/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Activity, RefreshCw } from "lucide-react";

import { Item, CheckedPairResult, AnalysisSummary } from "./types";
import { CLINICAL_ITEMS, findInteraction } from "./data";

import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";
import SearchAutocomplete from "./components/SearchAutocomplete";
import SelectedItems from "./components/SelectedItems";
import ResultsSummary from "./components/ResultsSummary";
import ResultCard from "./components/ResultCard";
import AboutSection from "./components/AboutSection";

export default function App() {
  // State for user-selected substances
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  // Simulated deep clinical check scanning sequence
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // Whether the user has triggered an evaluation run yet
  const [hasChecked, setHasChecked] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load a realistic subset containing severe, moderate, and minor interactions on load
  const loadExampleSet = () => {
    const examples = ["med_warfarin", "med_aspirin", "food_leafy_greens", "supp_garlic"];
    const found = CLINICAL_ITEMS.filter((item) => examples.includes(item.id));
    setSelectedItems(found);
    setHasChecked(false); // Reset check so they can explicitly click "Run Safety Check" to see the scanning effect
  };

  const handleSelectItem = (item: Item) => {
    setSelectedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    setHasChecked(false);
  };

  // Run Safety Check simulation
  const handleRunCheck = () => {
    if (selectedItems.length < 2) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasChecked(true);
      
      // Smooth scroll triggers after the state updates
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }, 800);
  };

  // Run the clinical checker algorithm dynamically when items change, if checking has already been activated once
  const checkedPairsResults = useMemo<CheckedPairResult[]>(() => {
    if (selectedItems.length < 2) return [];

    const pairs: CheckedPairResult[] = [];
    for (let i = 0; i < selectedItems.length; i++) {
      for (let j = i + 1; j < selectedItems.length; j++) {
        const itemA = selectedItems[i];
        const itemB = selectedItems[j];
        const interaction = findInteraction(itemA.id, itemB.id);
        
        pairs.push({
          itemA,
          itemB,
          interaction,
          isFlagged: !!interaction
        });
      }
    }

    // Sort results: Flagged interactions first, ordered by highest severity (3 > 2 > 1), then alphabetically
    return pairs.sort((x, y) => {
      if (x.isFlagged && !y.isFlagged) return -1;
      if (!x.isFlagged && y.isFlagged) return 1;
      
      if (x.isFlagged && y.isFlagged && x.interaction && y.interaction) {
        if (x.interaction.severity !== y.interaction.severity) {
          return y.interaction.severity - x.interaction.severity;
        }
      }
      return x.itemA.name.localeCompare(y.itemA.name);
    });
  }, [selectedItems]);

  // Compute interaction tallies
  const analysisSummary = useMemo<AnalysisSummary>(() => {
    const totalPairs = checkedPairsResults.length;
    const severe = checkedPairsResults.filter((p) => p.interaction?.severity === 3).length;
    const moderate = checkedPairsResults.filter((p) => p.interaction?.severity === 2).length;
    const minor = checkedPairsResults.filter((p) => p.interaction?.severity === 1).length;
    const noInteraction = totalPairs - (severe + moderate + minor);

    return {
      checkedItemsCount: selectedItems.length,
      checkedPairsCount: totalPairs,
      severeCount: severe,
      moderateCount: moderate,
      minorCount: minor,
      noInteractionCount: noInteraction
    };
  }, [checkedPairsResults, selectedItems.length]);

  const handlePrint = () => {
    window.print();
  };

  // Dynamic values for report timestamp
  const reportDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fbfaf7] text-[#122e2a] overflow-x-clip" id="clearwell-app-root">

      {/* Ambient, slowly drifting background accents (decorative only) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden" aria-hidden="true">
        <div className="cw-float absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#4c7c6a]/10 blur-3xl" />
        <div className="cw-float-slow absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#a8c5b8]/15 blur-3xl" />
        <div className="cw-float absolute -bottom-32 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[#e7d9c2]/25 blur-3xl" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Brand Header */}
      <Header
        onLoadExample={loadExampleSet}
        onClearAll={handleClearAll}
        hasSelectedItems={selectedItems.length > 0}
        onPrint={handlePrint}
      />

      {/* Main Single Page Layout Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-2">
        
        {/* Printable/Clinical Summary Title Header only visible during Prints */}
        <div className="hidden print:block border-b-2 border-black pb-5 mb-8">
          <div className="flex justify-between items-baseline">
            <h1 className="text-3xl font-bold tracking-tight">Clearwell Patient Safety Report</h1>
            <span className="font-mono text-xs uppercase tracking-wider border border-black px-2 py-0.5 rounded">
              Clinical Sandbox Summary
            </span>
          </div>
          <p className="text-xs text-gray-700 mt-1">
            Generated on: <strong>{reportDate}</strong> at clearwell.sandbox
          </p>
          <div className="mt-4 p-3 border border-dashed border-gray-400 bg-gray-50 text-xs rounded text-gray-800">
            <strong>Important Clinical Warning:</strong> This report is generated from a simplified, illustrative, educational demonstration database. It does not reflect a full pharmacopoeia or commercial pharmaceutical checker. The absence of interaction warnings does not prove compatibility. Consult a licensed pharmacist or physician for custom, comprehensive pharmacological verification.
          </div>
        </div>

        {/* Persistent, high-safety Clinical boundaries disclaimer */}
        <Disclaimer />

        {/* Main interactive section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative bg-white/90 backdrop-blur-sm border border-[#e8e4db] rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_-18px_rgba(18,46,42,0.25)] print:shadow-none print:border-none print:p-0 print:bg-transparent"
          id="checker-playground"
        >
          <div className="space-y-6">
            
            {/* Action Box Panel Title */}
            <div className="print:hidden">
              <h2 className="text-[#122e2a] font-serif text-xl sm:text-2xl font-semibold tracking-tight">
                Add your medications, supplements, and foods
              </h2>
              <p className="text-xs text-[#526662] mt-1 font-sans">
                Clearwell checks every possible combination pair for known absorption hurdles, metabolic interferences, or synergistic effects.
              </p>
            </div>

            {/* Type-Ahead Interaction Finder bar */}
            <SearchAutocomplete
              onSelectItem={handleSelectItem}
              selectedIds={selectedItems.map((i) => i.id)}
            />

            {/* Selected items chips */}
            <SelectedItems
              items={selectedItems}
              onRemoveItem={handleRemoveItem}
              onClearAll={handleClearAll}
            />

            {/* Check trigger button row */}
            <AnimatePresence mode="wait">
              {selectedItems.length >= 2 && !hasChecked && (
                <motion.div
                  key="cta-row"
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex justify-center pt-2 print:hidden"
                  id="check-action-container"
                >
                  <motion.button
                    type="button"
                    id="trigger-interaction-check-btn"
                    onClick={handleRunCheck}
                    disabled={isAnalyzing}
                    whileHover={isAnalyzing ? undefined : { scale: 1.035, y: -2 }}
                    whileTap={isAnalyzing ? undefined : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#5a8d79] via-[#4c7c6a] to-[#3d6556] px-9 py-4 font-sans font-semibold text-sm text-white shadow-xl shadow-[#4c7c6a]/35 transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#4c7c6a]/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4c7c6a]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-wait disabled:opacity-95 cursor-pointer"
                  >
                    {/* hover light-sweep */}
                    <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:[animation:cw-shine_0.9s_ease-in-out]" aria-hidden="true" />

                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="relative h-4 w-4 animate-spin" />
                        <span className="relative">Analyzing combinations</span>
                        {/* animated thinking dots */}
                        <span className="relative flex gap-1" aria-hidden="true">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-white/90"
                              animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                            />
                          ))}
                        </span>
                      </>
                    ) : (
                      <>
                        <Activity className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative">Run Safety Analysis</span>
                        <ArrowDown className="relative h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-y-1" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fast scan results trigger helper when substances are updated in live state */}
            <AnimatePresence>
              {selectedItems.length >= 2 && hasChecked && (
                <motion.div
                  key="live-indicator"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end pt-1 print:hidden"
                  id="live-check-indicator-box"
                >
                  <div className="text-[11px] font-mono text-[#4c7c6a] bg-[#f0f6f3] border border-[#d6e6de] px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="cw-ping-ring absolute inline-flex h-full w-full rounded-full bg-[#4c7c6a]" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4c7c6a]" />
                    </span>
                    Live update: Results synchronized
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.section>

        {/* Results presentation wrapper */}
        <AnimatePresence mode="wait">
          {(hasChecked || (selectedItems.length >= 2 && hasChecked)) && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 space-y-6"
              id="interaction-analysis-results-section"
            >
              
              {/* Results Headline banner */}
              <div className="flex flex-col sm:flex-row justify-between items-baseline border-b border-[#ece7dc] pb-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#122e2a]">
                  Interaction Check Findings
                </h3>
                <span className="text-xs text-[#7d8f8b] font-mono print:hidden">
                  Analyzed on {reportDate}
                </span>
              </div>

              {/* Reassurance-first Summary Dashboard */}
              <ResultsSummary summary={analysisSummary} hasRunCheck={hasChecked} />

              {/* Individual comparisons cards */}
              <div className="flex flex-col gap-5" id="interaction-cards-container">
                {checkedPairsResults.map(({ itemA, itemB, interaction }, index) => (
                  <ResultCard
                    key={`${itemA.id}-${itemB.id}`}
                    itemA={itemA}
                    itemB={itemB}
                    interaction={interaction}
                    index={index}
                  />
                ))}
              </div>

              {/* Printable Doctor-Pharmacist Consulting Block */}
              <div className="hidden print:block mt-8 border-t border-gray-400 pt-6">
                <div className="grid grid-cols-2 gap-8 text-xs text-gray-700">
                  <div>
                    <h5 className="font-bold underline mb-1">Caretaker/Patient Self-Assessment Notes</h5>
                    <p className="italic text-[11px]">
                      This printout consolidates my current medications, over-the-counter supplements, and dietary routines of concern.
                    </p>
                    <div className="h-16 border border-gray-300 rounded mt-2 p-2"></div>
                  </div>
                  <div>
                    <h5 className="font-bold underline mb-1">Pharmacist or Medical Review Signature</h5>
                    <p className="text-[10px] text-gray-500 mb-6 leading-tight">
                      Reviewed ingredients for therapeutic duplicate clearances, cytochrome P450 pathway risks, and general mineral spacing checks.
                    </p>
                    <div className="flex justify-between items-end pt-4 border-t border-gray-300">
                      <span>Pharmacist Signature / Date</span>
                      <span>Credentials/License #</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Explanatory Technical Reference & Sandbox Path Guidelines footer */}
        <AboutSection />

      </main>

      {/* Clean Aesthetic Footer */}
      <footer className="w-full bg-[#f6f4ee] border-t border-[#e8e4db] py-8 text-center text-xs text-[#7d8f8b] font-sans px-4 print:hidden">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="h-2 w-2 rounded-full bg-[#4c7c6a]" />
            Clearwell sandbox · educational purposes only
          </div>
          <div>
            Built with care for older adults and family caretakers.
          </div>
        </div>
      </footer>

    </div>
  );
}
