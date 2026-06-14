/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Pill, Leaf, Coffee, ArrowRight } from "lucide-react";
import { Item } from "../types";
import { searchClinicalItems } from "../data";

interface SearchAutocompleteProps {
  onSelectItem: (item: Item) => void;
  selectedIds: string[];
}

export default function SearchAutocomplete({ onSelectItem, selectedIds }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions when query changes
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    const results = searchClinicalItems(query);
    setSuggestions(results.slice(0, 7)); // limit to top 7
    setIsOpen(true);
    setHighlightedIndex(0); // auto-highlight the first result
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          const item = suggestions[highlightedIndex];
          if (!selectedIds.includes(item.id)) {
            onSelectItem(item);
            setQuery("");
            setIsOpen(false);
          }
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (item: Item) => {
    if (selectedIds.includes(item.id)) return; // Don't add duplicates
    onSelectItem(item);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Icon selector based on type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="h-4 w-4 text-[#a85232]" />;
      case "supplement":
        return <Leaf className="h-4 w-4 text-[#47657b]" />;
      case "food":
        return <Coffee className="h-4 w-4 text-[#2b5a47]" />;
      default:
        return null;
    }
  };

  // Short label getter for item types
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "medication":
        return "Medication";
      case "supplement":
        return "Supplement";
      case "food":
        return "Food/Diet";
      default:
        return "Other";
    }
  };

  return (
    <div className="relative w-full print:hidden" ref={containerRef}>
      {/* Combobox Search Input Wrapper */}
      <div className="group relative flex items-center">
        {/* animated focus glow */}
        <span className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#4c7c6a]/30 to-[#a8c5b8]/30 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100" aria-hidden="true" />

        <div className="absolute left-4 z-10 flex items-center pointer-events-none text-[#93a29f] transition-colors duration-200 group-focus-within:text-[#4c7c6a]">
          <Search className="h-5 w-5 transition-transform duration-300 group-focus-within:scale-110" />
        </div>

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="clearwell-search-listbox"
          aria-haspopup="listbox"
          placeholder="Search medicines, supplements, or foods (e.g., 'Coumadin', 'Advil', 'St. John\'s Wort', 'Grapefruit')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() !== "") setIsOpen(true);
          }}
          className="relative w-full text-base placeholder-[#93a29f] bg-[#fbfaf7] text-[#122e2a] pl-12 pr-10 py-3.5 border-2 border-[#e6e2da] rounded-xl focus:border-[#4c7c6a] focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
          id="clearwell-search-input"
        />

        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              aria-label="Clear Search Input"
              className="absolute right-3.5 z-10 p-1 rounded-full text-[#93a29f] hover:bg-[#ebe8e0] hover:text-[#122e2a] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Autocomplete Listbox Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="clearwell-search-listbox"
            role="listbox"
            aria-label="Medication and supplement search suggestions"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute z-50 w-full mt-2 overflow-hidden bg-white border border-[#e6e2da] rounded-xl shadow-xl shadow-[#122e2a]/10 max-h-72 overflow-y-auto divide-y divide-[#f5f3ee]"
          >
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => {
                const isAdded = selectedIds.includes(item.id);
                const isFocused = index === highlightedIndex;
                return (
                  <motion.li
                    key={item.id}
                    id={`suggestion-item-${item.id}`}
                    role="option"
                    aria-selected={isFocused}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.035, ease: "easeOut" }}
                    onClick={() => handleSuggestionClick(item)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`relative flex items-center justify-between px-4 py-3.5 cursor-pointer select-none transition-colors duration-150 ${
                      isFocused ? "bg-[#f5f8f6]" : "bg-white"
                    } ${isAdded ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    {/* highlight accent bar */}
                    <span
                      className={`absolute left-0 h-7 w-1 rounded-r-full bg-[#4c7c6a] transition-opacity duration-150 ${
                        isFocused && !isAdded ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{getItemIcon(item.type)}</div>
                      <div>
                      {/* Name and Highlighting Matching Characters */}
                      <span className="font-semibold text-sm text-[#122e2a]">
                        {item.name}
                      </span>
                      {/* Show matched alias if search hit an alias */}
                      {query.trim().length > 0 &&
                        item.aliases.some((alias) =>
                          alias.toLowerCase().includes(query.toLowerCase()) &&
                          !item.name.toLowerCase().includes(query.toLowerCase())
                        ) && (
                          <span className="text-xs text-[#7d8f8b] block font-mono">
                            Alias match: "
                            {
                              item.aliases.find((alias) =>
                                alias.toLowerCase().includes(query.toLowerCase())
                              )
                            }
                            "
                          </span>
                        )}
                        {item.description && (
                          <p className="text-xs text-[#7d8f8b] mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#f5f3ee] text-[#526662] px-2 py-0.5 rounded-md font-medium">
                        {getTypeLabel(item.type)}
                      </span>
                      {isAdded ? (
                        <span className="font-mono text-[10px] text-[#2b5a47] bg-[#f0f6f3] text-opacity-90 px-2 py-0.5 rounded-md font-medium border border-[#d6e6de]">
                          Added
                        </span>
                      ) : isFocused ? (
                        <motion.span
                          initial={{ x: -4, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-[#4c7c6a]" />
                        </motion.span>
                      ) : null}
                    </div>
                  </motion.li>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-sm text-[#7d8f8b] font-sans">
                No matching medications, supplements, or foods found in our demo dataset.
                <p className="text-xs text-[#93a29f] mt-1 font-mono">
                  Try searching "Warfarin", "Advil", "St. John's", Grapefruit, or "Synthroid".
                </p>
              </div>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
