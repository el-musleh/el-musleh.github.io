---
title: "Elevator Control System using STM32 MCU"
excerpt: "Development and deployment of a three-floor elevator control system using Model-Based Design (MBD). The system was modeled in MATLAB/Simulink, converted to C++ via Embedded Coder, and deployed on an STM32 microcontroller — validated through both MIL and HIL testing workflows."
collection: projects
date: 2020-09-01
# paperurl: ""
authors: ["Mohammad El Musleh"]
tags: [STM32, Embedded Systems, MCU, Control System, Model-Based Design, Simulink, MATLAB, Embedded Coder, C++, Keil uVision, STM32CubeMX, HIL Testing, MIL Testing, State Machine]
---

<div class="notice--info" markdown="1">
**🤖 AI Disclosure:** For transparency, the content of this page was partially or mainly created with AI assistance tools.
</div>

## From Model to Metal: MBD for Embedded Control

{% include skill.html text="Model-Based Design" %} is the standard for safety-critical {% include skill.html text="embedded systems" %} — the idea that a validated simulation model should be the authoritative source for deployed firmware, not a parallel artifact. This project applied that methodology end-to-end: designing a three-floor elevator control system in {% include skill.html text="MATLAB" %}/{% include skill.html text="Simulink" %}, generating production {% include skill.html text="C++" %} from the model using {% include skill.html text="Embedded Coder" %}, and deploying directly to an {% include skill.html text="STM32" %} {% include skill.html text="microcontroller" %}.

The result is a system where the model and the hardware share the same logic by construction, and where validation at the model level directly transfers to confidence in the deployed system.

---

## System Design

### Control Logic in Simulink

The elevator serves three floors, each equipped with up and down call buttons plus floor sensors. The {% include skill.html text="Simulink" %} model captures the full {% include skill.html text="state machine" %}: idle, moving up, moving down, door open/close sequences, and priority queuing for simultaneous call requests.

Signal interfaces were configured in {% include skill.html text="STM32CubeMX" %}, defining the {% include skill.html text="GPIO" %} mappings for buttons and floor sensors before importing them as driver blocks into {% include skill.html text="Simulink" %}. This keeps the hardware abstraction layer clean and the model portable.

### Code Generation via Embedded Coder

With the model validated at the simulation level, {% include skill.html text="Embedded Coder" %} generated optimized {% include skill.html text="C++" %} directly from the {% include skill.html text="Simulink" %} diagram. The generated code is structured, readable, and traceable back to specific model blocks — a key property for any system where you need to explain a behavior or trace a fault.

The generated code was compiled and flashed to the {% include skill.html text="STM32" %} using {% include skill.html text="Keil μVision" %}.

---

## Validation: MIL and HIL

### Model-in-the-Loop (MIL)

{% include skill.html text="MIL testing" %} ran the control logic entirely within {% include skill.html text="Simulink" %}, using validation blocks to simulate button presses, floor arrivals, and edge cases (simultaneous calls, direction changes mid-travel). Passing {% include skill.html text="MIL" %} establishes that the model logic is correct before any hardware is involved.

### Hardware-in-the-Loop (HIL)

{% include skill.html text="HIL testing" %} connected the deployed {% include skill.html text="STM32" %} back into the {% include skill.html text="Simulink" %} environment — the {% include skill.html text="microcontroller" %} runs its generated code while {% include skill.html text="Simulink" %} simulates the physical elevator plant. This catches timing issues, interrupt latency, and hardware-specific behavior that MIL cannot surface. Manual testing on the physical rig provided the final validation layer.

---

## Outcome

- Designed a complete elevator control state machine in MATLAB/Simulink, handling multi-floor call queuing, priority resolution, and door sequencing.
- Configured STM32CubeMX signal interfaces and integrated them as Simulink driver blocks, maintaining a clean hardware abstraction.
- Generated production C++ from the validated model using Embedded Coder; compiled and deployed to STM32 via Keil μVision.
- Validated correctness through the full MBD testing stack: MIL simulation, HIL with physical MCU, and manual functional testing on the rig.

**Demo video:** [youtu.be/rMcJRmVd3Ds](https://youtu.be/rMcJRmVd3Ds)
