/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { HeartPulse, Printer, Sparkles, RotateCcw } from "lucide-react";

interface HeaderProps {
  onLoadExample: () => void;
  onClearAll: () => void;
  hasSelectedItems: boolean;
  onPrint: () => void;
}

export default function Header({ onLoadExample, onClearAll, hasSelectedItems, onPrint }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 w-full border-b border-[#e6e2da]/80 bg-[#fbfaf7]/85 backdrop-blur-md py-5 px-4 sm:px-6 print:hidden print:static print:bg-transparent print:backdrop-blur-none"
    >
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand and Description */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
            whileHover={{ scale: 1.08, rotate: -4 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5a8d79] to-[#3d6556] text-[#fbfaf7] shadow-lg shadow-[#4c7c6a]/30"
          >
            {/* soft breathing glow */}
            <span className="absolute inset-0 rounded-2xl bg-[#4c7c6a] opacity-40 blur-md cw-soft-pulse" aria-hidden="true" />
            <HeartPulse className="relative h-6 w-6" id="brand-logo-icon" />
          </motion.div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="font-sans text-2xl font-bold tracking-tight text-[#122e2a]" id="app-title">
                Clearwell
              </h1>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#4c7c6a] bg-[#eef4f1] px-2 py-0.5 rounded-full font-medium border border-[#d6e6de]">
                Educational Demo
              </span>
            </div>
            <p className="text-xs text-[#526662] mt-0.5 font-sans">
              Medication, supplement &amp; food interaction checker for safe combining
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <motion.button
            type="button"
            id="load-example-btn"
            onClick={onLoadExample}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group flex items-center gap-1.5 rounded-xl border border-[#c9c3b8] bg-[#f5f3ee] px-3.5 py-2 text-xs font-medium text-[#122e2a] shadow-sm transition-colors duration-200 hover:bg-[#ebe8e0] hover:border-[#b1aaa0] focus:outline-none focus:ring-2 focus:ring-[#4c7c6a]/60 focus:ring-offset-2 focus:ring-offset-[#fbfaf7] cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#4c7c6a] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            Load Example Set
          </motion.button>

          <AnimatePresence>
            {hasSelectedItems && (
              <motion.div
                key="contextual-actions"
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ opacity: 1, width: "auto", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <motion.button
                  type="button"
                  id="clear-all-btn"
                  onClick={onClearAll}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group flex items-center gap-1.5 rounded-xl border border-transparent px-3.5 py-2 text-xs font-medium text-[#c45232] transition-colors duration-200 hover:bg-[#fdefeb] focus:outline-none focus:ring-2 focus:ring-[#c45232]/50 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                  Clear All
                </motion.button>

                <motion.button
                  type="button"
                  id="print-report-btn"
                  onClick={onPrint}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-br from-[#5a8d79] to-[#3d6556] px-3.5 py-2 text-xs font-medium text-[#fbfaf7] shadow-md shadow-[#4c7c6a]/30 transition-shadow duration-200 hover:shadow-lg hover:shadow-[#4c7c6a]/40 focus:outline-none focus:ring-2 focus:ring-[#4c7c6a]/60 focus:ring-offset-2 focus:ring-offset-[#fbfaf7] cursor-pointer"
                >
                  {/* hover light-sweep */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:[animation:cw-shine_0.9s_ease-in-out]" aria-hidden="true" />
                  <Printer className="relative h-3.5 w-3.5" />
                  <span className="relative">Print / Share Report</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
