---
title: "Slidarr: A Resistance-Sensing MIDI Musical Instrument"
excerpt: "A musical instrument prototype that maps piano tones onto a single conductive wire using resistance measurement to determine finger position. Touching and sliding along the wire generates real-time MIDI signals — including pitchbend and octave scrolling — for a connected synthesizer."
collection: projects
date: 2019-05-23
paperurl: "/files/projects/2019-Construction-of-the-Slidarr.pdf"
authors: ["Mats Jonsson", "Sören Meinken", "Mohammad El Musleh"]
tags: [Musical Instrument Design, Electronic Prototyping, Embedded Systems, Resistance Sensing, MIDI, TM4C, MATLAB, Pitchbend, Music Technology]
---

<div class="notice--info" markdown="1">
**🤖 AI Disclosure:** For transparency, the content of this page was partially or mainly created with AI assistance tools.
</div>

## The Idea: A Guitar That Thinks Like a Piano

What if a single wire could replace an entire keyboard? The Slidarr began as a thought experiment: map piano tones across a conductive string, let the player's finger position determine the note, and use resistance measurement as the underlying sensing mechanism. No keys, no frets — just a wire, a finger, and physics.

The concept draws from both stringed and keyboard instruments. Like a guitar, the player touches a string. Like a piano, the position maps to a discrete tone. The twist: sliding continuously between positions creates a live pitchbend, giving the Slidarr an expressive quality that neither instrument natively offers.

---

## Architecture

### Resistance-Based Position Sensing

The wire acts as a {% include skill.html text="voltage divider" %}. When a copper-tipped finger touches the string at any point, the circuit measures the {% include skill.html text="resistance" %} from that contact point to a reference end. This {% include skill.html text="resistance" %} value maps directly to a position along the wire, which in turn maps to a note on the {% include skill.html text="chromatic scale" %}.

The system must be calibrated before use — a calibration pass sweeps the full wire to establish minimum and maximum resistance bounds, then maps that range onto one octave starting at C4 (261 Hz).

### Embedded Signal Processing on TM4C

The {% include skill.html text="microcontroller" %} ({% include skill.html text="TM4C" %} / compatible with {% include skill.html text="Arduino" %}) runs the core sensing loop: sampling the {% include skill.html text="ADC" %}, converting {% include skill.html text="resistance" %} to note index, and generating {% include skill.html text="MIDI" %} messages. Three distinct interaction modes are handled in firmware:

- **Note on/off** — touch and release triggers standard {% include skill.html text="MIDI" %} note events.
- **{% include skill.html text="Pitchbend" %}** — continuous sliding sends incremental {% include skill.html text="pitchbend" %} messages. When the bend reaches its maximum, the firmware steps to the adjacent note and resets the bend, creating a seamless glide.
- **{% include skill.html text="Octave" %} scroll** — holding the scroll button while sliding shifts the entire frequency window left or right across the keyboard, allowing access to all {% include skill.html text="octaves" %} on a single wire.

### MATLAB Integration

{% include skill.html text="MATLAB" %} was used for {% include skill.html text="signal analysis" %} and validation during development — visualizing the resistance-to-note mapping, confirming calibration accuracy, and prototyping the {% include skill.html text="pitchbend" %} logic before embedding it in {% include skill.html text="embedded C" %}.

---

## Outcome

- Designed and built a functional single-string MIDI instrument prototype, from hardware wiring through embedded firmware to synthesizer integration.
- Implemented real-time MIDI generation including note on/off, continuous pitchbend, and octave-shift scrolling entirely in embedded C.
- Collaborated across a three-person team, dividing hardware design, firmware development, and signal processing responsibilities.
- Demonstrated the proof of concept live, with the Slidarr driving a software synthesizer in real time.

The project was intentionally scoped as a proof of concept — the goal was to validate the interaction model and demonstrate the hardware feasibility, not to produce a final instrument. The architecture is designed to scale: multiple strings, polyphony, and richer sensing are all natural extensions.

**Source code:** [github.com/Deffendor/slidar](https://github.com/Deffendor/slidar)  
**Full report:** [Construction of the Slidarr (PDF)](/files/projects/2019-Construction-of-the-Slidarr.pdf)
