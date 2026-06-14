/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Code, Database, ExternalLink, HelpCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="mt-12 bg-[#fcfbfa] border-t border-[#e8e4db] pt-10 pb-16 px-4 print:hidden" id="about-clinical-engine">
      <div className="mx-auto max-w-4xl font-sans text-xs text-[#526662] space-y-8">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-b border-[#f0ece4] pb-4"
        >
          <h2 className="text-[#122e2a] text-lg font-bold tracking-tight">
            Clearwell Clinical Sandbox & Developer Reference
          </h2>
          <p className="text-xs text-[#7d8f8b] mt-1 font-sans">
            How this application functions under the hood and instructions on upgrading to production registries
          </p>
        </motion.div>

        {/* 3 Grid Pillars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >

          {/* Pillar 1: Adding Items */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="space-y-2 border border-[#e8e4db] bg-white p-4.5 rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h3 className="font-semibold text-sm text-[#122e2a] flex items-center gap-1.5 font-sans">
              <Database className="h-4 w-4 text-[#4c7c6a]" />
              Dataset Extension
            </h3>
            <p className="leading-relaxed">
              Substances and rules reside in <code>src/data.ts</code>. To insert a new drug or food constituent, declare its record in the <code>CLINICAL_ITEMS</code> array:
            </p>
            <pre className="p-2.5 bg-[#fbfaf7] border border-[#e6e2da] rounded-lg font-mono text-[10px] text-[#122e2a] overflow-x-auto">
{`{
  id: "med_lisinopril",
  name: "Lisinopril",
  type: "medication",
  aliases: ["zestril", "prinivil"],
  description: "Blood pressure..."
}`}
            </pre>
          </motion.div>

          {/* Pillar 2: Unordered Lookup */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="space-y-2 border border-[#e8e4db] bg-white p-4.5 rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h3 className="font-semibold text-sm text-[#122e2a] flex items-center gap-1.5 font-sans">
              <Code className="h-4 w-4 text-[#4c7c6a]" />
              Unordered Pair Lookup
            </h3>
            <p className="leading-relaxed">
              We eliminate order bias by sorting compared item IDs alphabetically prior to lookups. Thus, analyzing <strong>Aspirin ✚ Warfarin</strong> outputs the same clinical response as <strong>Warfarin ✚ Aspirin</strong>:
            </p>
            <pre className="p-2.5 bg-[#fbfaf7] border border-[#e6e2da] rounded-lg font-mono text-[10px] text-[#122e2a] overflow-x-auto">
{`const key = [idA, idB].sort();
// Matches keys reliably inside:
CLINICAL_INTERACTIONS`}
            </pre>
          </motion.div>

          {/* Pillar 3: Integration Path */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="space-y-2 border border-[#e8e4db] bg-white p-4.5 rounded-xl shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h3 className="font-semibold text-sm text-[#122e2a] flex items-center gap-1.5 font-sans">
              <BookOpen className="h-4 w-4 text-[#4c7c6a]" />
              Production Registry
            </h3>
            <p className="leading-relaxed">
              For patient safety, production deployments require official clinical registries instead of demo arrays. Implement these public, standardized APIs:
            </p>
            <ul className="space-y-1 list-disc pl-4 text-[11px] text-[#40524e] font-sans">
              <li><strong>NIH RxNorm:</strong> Universal concept names for medications.</li>
              <li><strong>RxNav API:</strong> Automated, curated drug-drug interaction endpoints.</li>
              <li><strong>FDA openFDA:</strong> Query official product labeling data.</li>
            </ul>
          </motion.div>

        </motion.div>

        {/* NLM / FDA Integration Explainer Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#f0f6f3]/40 border border-[#d6e6de] rounded-xl p-5 space-y-3"
        >
          <h4 className="font-semibold text-sm text-[#122e2a] flex items-center gap-1.5 font-sans">
            <HelpCircle className="h-4 w-4 text-[#4c7c6a]" />
            Migrating from local Sandbox to NIH RxNav Interaction API
          </h4>
          <p className="leading-relaxed">
            To query actual live interactions programmatically without maintaining a manual dataset, perform a backend call to the National Library of Medicine (NLM) <strong>RxNav interaction API</strong>. The sequence involves:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-[#40524e]">
            <li>
              <strong>Resolve RxCUIs (RxNorm Concept Unique Identifier):</strong> 
              Match user text search against RxNorm's locator: <br />
              <code className="text-[#a85232] bg-white border border-[#ece7dc] px-1 py-0.5 rounded font-mono text-[11px]">
                https://rxnav.nlm.nih.gov/REST/rxcui.json?name=Ibuprofen
              </code>
            </li>
            <li>
              <strong>Call the Drug Interaction Endpoint:</strong>
              Once you possess the RxCUIs, fetch interactions between multiple ingredients: <br />
              <code className="text-[#a85232] bg-white border border-[#ece7dc] px-1 py-0.5 rounded font-mono text-[11px]">
                https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=8896+1191
              </code>
            </li>
            <li>
              <strong>Parse and Filter:</strong> Map clinical severity keys (e.g. "critical" or "significant") to supportive, reassuring UI classifications to maintain calm and reliable clinical communication.
            </li>
          </ol>
          <div className="pt-2 text-[11px]">
            <a 
              href="https://rxnav.nlm.nih.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/link inline-flex items-center gap-1 font-semibold text-[#4c7c6a] hover:underline cursor-pointer"
            >
              <span>Explore NIH NLM Medication Database Documentation</span>
              <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
