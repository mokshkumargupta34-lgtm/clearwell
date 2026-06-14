/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="w-full bg-[#fcfbfa] border border-[#e8e4db] rounded-xl p-5 mb-8 text-[#526662] font-sans print:shadow-none"
      id="safety-disclaimer-panel"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f9f3ea] text-[#b47a1c]">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[#122e2a] flex items-center gap-1.5 font-sans" id="disclaimer-header">
            Important Safety Guide & Clinical Boundaries
          </h2>
          
          <div className="text-xs leading-relaxed space-y-1.5 font-sans" id="disclaimer-body">
            <p>
              <strong className="text-[#a85232]">Not Medical Advice:</strong> Clearwell is an interactive educational demonstration tool designed solely for illustrative awareness. It is <strong className="text-[#122e2a]">not a medical device</strong>, does not provide clinical diagnoses, and is not a substitute for professional medical counseling, evaluation, or treatment.
            </p>
            <p>
              <strong className="text-[#122e2a]">Limited Illustrative Dataset:</strong> The database holds a small handful (~45 items and ~50 interactions) of well-known textbook pairs. It is <strong>highly incomplete</strong> and does not reflect a full clinical compendium. The absence of an interaction flagged between checked substances <span className="underline decoration-[#a85232] underline-offset-2">never</span> implies the combination is safe or healthy. Many real-world interactions are not in this demo.
            </p>
            <p>
              <strong className="text-[#122e2a]">Important Directive:</strong> Always consult your physician, cardiologist, or a licensed pharmacist before starting, stopping, or altering any medication, dosage, diet, or supplement program. Never change your health routines based on results from this website.
            </p>
            <p className="flex items-center gap-1 text-[11px] font-semibold text-[#c45232] pt-1">
              <span>●</span> In an immediate medical emergency, call your local emergency services (e.g., 911 or your local emergency room) immediately.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
