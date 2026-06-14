/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { X, Beaker, HelpCircle } from "lucide-react";
import { Item } from "../types";

interface SelectedItemsProps {
  items: Item[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export default function SelectedItems({ items, onRemoveItem, onClearAll }: SelectedItemsProps) {
  // Compute pair calculations: N * (N - 1) / 2
  const n = items.length;
  const pairsCount = (n * (n - 1)) / 2;

  // Dot color mappings for each item Type
  const getDotStyle = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-[#a85232]"; // Clay
      case "supplement":
        return "bg-[#47657b]"; // Slate-blue
      case "food":
        return "bg-[#2b5a47]"; // Sage green
      default:
        return "bg-gray-400";
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-[#fcf3ef] border-[#f2d8cf] text-[#a85232]";
      case "supplement":
        return "bg-[#f2f7fa] border-[#dae6ee] text-[#47657b]";
      case "food":
        return "bg-[#f0f6f3] border-[#d6e6de] text-[#2b5a47]";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="w-full bg-[#fcfbfa] border border-[#e8e4db] rounded-xl p-5 mb-8" id="selected-substances-dashboard">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#f0ece4] pb-4 mb-4">
        <h3 className="font-sans text-sm font-semibold text-[#122e2a] uppercase tracking-wider flex items-center gap-2">
          <Beaker className="h-4 w-4 text-[#4c7c6a]" />
          My Active Substances
        </h3>
        <div className="font-mono text-xs text-[#526662] flex items-center gap-1.5 flex-wrap">
          <motion.span
            key={`count-${n}`}
            initial={{ scale: 1.4, color: "#4c7c6a" }}
            animate={{ scale: 1, color: "#122e2a" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="font-semibold inline-block"
            id="active-items-count"
          >
            {n}
          </motion.span>{" "}
          item{n !== 1 ? "s" : ""}
          <span className="text-[#c9c3b8] font-sans">·</span>
          <motion.span
            key={`pairs-${pairsCount}`}
            initial={{ scale: 1.4, color: "#4c7c6a" }}
            animate={{ scale: 1, color: "#122e2a" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="font-semibold inline-block"
            id="active-pairs-count"
          >
            {pairsCount}
          </motion.span>{" "}
          unique pair{pairsCount !== 1 ? "s" : ""} under analysis
        </div>
      </div>

      {n === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8 text-center text-sm text-[#7d8f8b] font-sans"
        >
          No substances added yet. Search and select items above to analyze potential interactions.
          <p className="text-xs text-[#a85232] mt-2 flex items-center justify-center gap-1">
            <HelpCircle className="h-3 w-3" /> Select at least <strong>two items</strong> to run the safety checker.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* Flex-wrapping chips of substances */}
          <motion.div layout className="flex flex-wrap gap-2.5" id="substance-chip-row">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  id={`chip-${item.id}`}
                  initial={{ opacity: 0, scale: 0.6, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: -6 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  whileHover={{ y: -2 }}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium shadow-sm transition-shadow duration-200 hover:shadow-md ${getBadgeStyle(
                    item.type
                  )}`}
                >
                  {/* Visual Dot */}
                  <span className={`h-2.5 w-2.5 rounded-full ${getDotStyle(item.type)}`} aria-hidden="true" />

                  {/* Item Label with Accessible Type suffix */}
                  <span className="font-sans">
                    {item.name}
                    <span className="sr-only"> ({item.type})</span>
                  </span>

                  {/* Remove chip trigger */}
                  <button
                    type="button"
                    id={`remove-item-btn-${item.id}`}
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.name} from analysis list`}
                    className="p-0.5 rounded-full hover:bg-black/10 text-[#526662] hover:text-[#122e2a] focus:outline-none transition-all duration-200 ml-1 cursor-pointer hover:rotate-90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Quick instructions indicator */}
          <AnimatePresence>
            {n < 2 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden text-xs text-[#b47a1c] bg-[#fffcf5] border border-[#f6e5c9] p-3 rounded-lg font-sans"
              >
                <strong>Tip:</strong> Add at least one more substance (e.g., an over-the-counter painkiller, dietary green tea, or magnesium supplement) to run the therapeutic drug-pair analyzer.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
