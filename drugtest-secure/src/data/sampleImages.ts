// High-clarity SVG-based realistic colorimetric test kit captures for prototype demonstration

export const SAMPLE_KIT_IMAGES = {
  positive: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
    <rect width="640" height="480" fill="%231e293b"/>
    <!-- Background grid / sterile lab surface -->
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23334155" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="640" height="480" fill="url(%23grid)" />
    
    <!-- Reference Color Card (Left) -->
    <rect x="50" y="80" width="220" height="320" rx="8" fill="%23f8fafc" stroke="%2394a3b8" stroke-width="2"/>
    <rect x="50" y="80" width="220" height="36" rx="8" fill="%230f172a"/>
    <text x="160" y="104" fill="%23f8fafc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">REF COLOR CALIBRATION CARD</text>
    <text x="65" y="132" fill="%23475569" font-family="monospace" font-size="9">STANDARD CAL-PROFILE v2.4</text>
    
    <!-- 4 Calibration swatches -->
    <rect x="65" y="145" width="42" height="42" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="1"/>
    <text x="86" y="198" fill="%2364748b" font-family="sans-serif" font-size="8" text-anchor="middle">WHT</text>

    <rect x="115" y="145" width="42" height="42" fill="%2364748b" stroke="%23cbd5e1" stroke-width="1"/>
    <text x="136" y="198" fill="%2364748b" font-family="sans-serif" font-size="8" text-anchor="middle">GRY</text>

    <rect x="165" y="145" width="42" height="42" fill="%230284c7" stroke="%23cbd5e1" stroke-width="1"/>
    <text x="186" y="198" fill="%2364748b" font-family="sans-serif" font-size="8" text-anchor="middle">CYN</text>

    <rect x="215" y="145" width="42" height="42" fill="%23e11d48" stroke="%23cbd5e1" stroke-width="1"/>
    <text x="236" y="198" fill="%2364748b" font-family="sans-serif" font-size="8" text-anchor="middle">MAG</text>

    <!-- Colorimetric Spectrum Bar -->
    <rect x="65" y="215" width="192" height="24" rx="4" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="70" y="220" width="30" height="14" fill="%23fef08a"/>
    <rect x="105" y="220" width="30" height="14" fill="%23ca8a04"/>
    <rect x="140" y="220" width="30" height="14" fill="%239333ea"/>
    <rect x="175" y="220" width="30" height="14" fill="%23581c87"/>
    <rect x="210" y="220" width="42" height="14" fill="%233b0764"/>
    
    <text x="65" y="260" fill="%23334155" font-family="monospace" font-size="9">CHROMA FIDUCIAL: PASS</text>
    <rect x="65" y="275" width="30" height="30" fill="%23000000"/>
    <rect x="75" y="285" width="10" height="10" fill="%23ffffff"/>
    <rect x="227" y="275" width="30" height="30" fill="%23000000"/>
    <rect x="237" y="285" width="10" height="10" fill="%23ffffff"/>
    <text x="160" y="380" fill="%2364748b" font-family="sans-serif" font-size="10" text-anchor="middle">AUTHENTICATED FIELD CARD</text>

    <!-- Field Test Reaction Ampoule / Tube (Right) -->
    <rect x="330" y="90" width="250" height="300" rx="16" fill="%230f172a" stroke="%2338bdf8" stroke-width="1.5" opacity="0.95"/>
    <rect x="350" y="110" width="210" height="260" rx="12" fill="%23020617" stroke="%231e293b"/>
    
    <!-- Test Tube Glass -->
    <rect x="425" y="130" width="60" height="200" rx="30" fill="%23ffffff" fill-opacity="0.1" stroke="%23e2e8f0" stroke-width="2"/>
    <!-- Liquid Reaction Positive (Intense Deep Violet / Purple) -->
    <path d="M 425 240 Q 455 245 485 240 L 485 300 Q 485 330 455 330 Q 425 330 425 300 Z" fill="%236b21a8" fill-opacity="0.95"/>
    <circle cx="445" cy="270" r="4" fill="%23c084fc" fill-opacity="0.6"/>
    <circle cx="465" cy="285" r="3" fill="%23c084fc" fill-opacity="0.6"/>

    <text x="455" y="360" fill="%2338bdf8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">REACTION ZONE A</text>
    <text x="455" y="378" fill="%23a855f7" font-family="monospace" font-size="11" text-anchor="middle">POSITIVE SHIFT DETECTED</text>
  </svg>`,

  negative: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
    <rect width="640" height="480" fill="%231e293b"/>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23334155" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="640" height="480" fill="url(%23grid)" />
    
    <!-- Reference Color Card (Left) -->
    <rect x="50" y="80" width="220" height="320" rx="8" fill="%23f8fafc" stroke="%2394a3b8" stroke-width="2"/>
    <rect x="50" y="80" width="220" height="36" rx="8" fill="%230f172a"/>
    <text x="160" y="104" fill="%23f8fafc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">REF COLOR CALIBRATION CARD</text>
    <text x="65" y="132" fill="%23475569" font-family="monospace" font-size="9">STANDARD CAL-PROFILE v2.4</text>
    
    <rect x="65" y="145" width="42" height="42" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="115" y="145" width="42" height="42" fill="%2364748b" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="165" y="145" width="42" height="42" fill="%230284c7" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="215" y="145" width="42" height="42" fill="%23e11d48" stroke="%23cbd5e1" stroke-width="1"/>

    <rect x="65" y="215" width="192" height="24" rx="4" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="70" y="220" width="30" height="14" fill="%23fef08a"/>
    <rect x="105" y="220" width="30" height="14" fill="%23ca8a04"/>
    <rect x="140" y="220" width="30" height="14" fill="%239333ea"/>
    <rect x="175" y="220" width="30" height="14" fill="%23581c87"/>
    <rect x="210" y="220" width="42" height="14" fill="%233b0764"/>
    
    <text x="65" y="260" fill="%23334155" font-family="monospace" font-size="9">CHROMA FIDUCIAL: PASS</text>
    <rect x="65" y="275" width="30" height="30" fill="%23000000"/>
    <rect x="75" y="285" width="10" height="10" fill="%23ffffff"/>
    <rect x="227" y="275" width="30" height="30" fill="%23000000"/>
    <rect x="237" y="285" width="10" height="10" fill="%23ffffff"/>
    <text x="160" y="380" fill="%2364748b" font-family="sans-serif" font-size="10" text-anchor="middle">AUTHENTICATED FIELD CARD</text>

    <!-- Field Test Reaction Ampoule / Tube (Right) -->
    <rect x="330" y="90" width="250" height="300" rx="16" fill="%230f172a" stroke="%2394a3b8" stroke-width="1.5" opacity="0.95"/>
    <rect x="350" y="110" width="210" height="260" rx="12" fill="%23020617" stroke="%231e293b"/>
    
    <!-- Test Tube Glass -->
    <rect x="425" y="130" width="60" height="200" rx="30" fill="%23ffffff" fill-opacity="0.1" stroke="%23e2e8f0" stroke-width="2"/>
    <!-- Liquid Reaction Negative (Clear Straw Pale Amber / No chromogenic shift) -->
    <path d="M 425 240 Q 455 245 485 240 L 485 300 Q 485 330 455 330 Q 425 330 425 300 Z" fill="%23fef08a" fill-opacity="0.45"/>

    <text x="455" y="360" fill="%2394a3b8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">REACTION ZONE A</text>
    <text x="455" y="378" fill="%23eab308" font-family="monospace" font-size="11" text-anchor="middle">NO COLOR SHIFT (CLEAR)</text>
  </svg>`,

  inconclusive: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">
    <rect width="640" height="480" fill="%231e293b"/>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23334155" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="640" height="480" fill="url(%23grid)" />
    
    <!-- Reference Color Card (Left) -->
    <rect x="50" y="80" width="220" height="320" rx="8" fill="%23f8fafc" stroke="%2394a3b8" stroke-width="2"/>
    <rect x="50" y="80" width="220" height="36" rx="8" fill="%230f172a"/>
    <text x="160" y="104" fill="%23f8fafc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">REF COLOR CALIBRATION CARD</text>
    
    <!-- Slightly faded reference -->
    <rect x="65" y="145" width="42" height="42" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="115" y="145" width="42" height="42" fill="%2394a3b8" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="165" y="145" width="42" height="42" fill="%2338bdf8" stroke="%23cbd5e1" stroke-width="1"/>
    <rect x="215" y="145" width="42" height="42" fill="%23fb7185" stroke="%23cbd5e1" stroke-width="1"/>

    <text x="65" y="260" fill="%23f97316" font-family="monospace" font-size="9">CHROMA FIDUCIAL: POOR LIGHT</text>
    <text x="160" y="380" fill="%2364748b" font-family="sans-serif" font-size="10" text-anchor="middle">AUTHENTICATED FIELD CARD</text>

    <!-- Field Test Reaction Ampoule / Tube (Right) -->
    <rect x="330" y="90" width="250" height="300" rx="16" fill="%230f172a" stroke="%23f59e0b" stroke-width="1.5" opacity="0.95"/>
    <rect x="350" y="110" width="210" height="260" rx="12" fill="%23020617" stroke="%231e293b"/>
    
    <!-- Test Tube Glass -->
    <rect x="425" y="130" width="60" height="200" rx="30" fill="%23ffffff" fill-opacity="0.1" stroke="%23e2e8f0" stroke-width="2"/>
    <!-- Liquid Reaction Inconclusive (Turbid / Muddy grey-brown) -->
    <path d="M 425 240 Q 455 245 485 240 L 485 300 Q 485 330 455 330 Q 425 330 425 300 Z" fill="%2378716c" fill-opacity="0.75"/>

    <text x="455" y="360" fill="%23f59e0b" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">REACTION ZONE A</text>
    <text x="455" y="378" fill="%23f97316" font-family="monospace" font-size="11" text-anchor="middle">TURBID / SUB-THRESHOLD</text>
  </svg>`,
};
