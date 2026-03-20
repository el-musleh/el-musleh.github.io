---
title:  "Smart Voice Dictation on Linux: Automatically Detect Keyboard Layout"
date: 2026-03-20
collection: experience
published: true 
header:
   teaser: "posts/GenAI_Gemini_Smart_Voice_Dictation_Linux.png"
categories: 
  - Technology
  - Linux
tags:
  - Linux
  - Speech Recognition
  - VOSK
  - nerd-dictation
  - Productivity
---

Imagine you're writing a document in both English and Arabic. You need to switch between dictation modes every time you change languages. It's tedious. On Windows, you just press `Win+H` and start talking. But on Linux, you're stuck manually selecting the right speech model.

That's the problem I set out to solve.

## The Solution

I created [nerd-dictation-auto-switch-languages](https://github.com/el-musleh/nerd-dictation-auto-switch-languages), a wrapper script that automatically detects your current keyboard layout and uses the appropriate speech-to-text model. No more manual switching. Just press one shortcut and start talking.

### How It Works

1. Press `Super+H` to start dictation
2. The script detects your keyboard layout (English, Arabic, German, etc.)
3. Launches the correct VOSK model automatically
4. Speak — your words appear on screen
5. Press `Super+Shift+H` to stop

## The Technical Details

### Key Components

| Component | Purpose |
|-----------|---------|
| [nerd-dictation](https://github.com/ideasman42/nerd-dictation) | Base speech-to-text tool using VOSK |
| [VOSK Models](https://alphacephei.com/vosk/models) | Neural network models for each language |
| [xkblayout-state](https://github.com/nonpop/xkblayout-state) | Detects current keyboard layout |

### The Magic: Layout Detection

The key innovation is detecting the keyboard layout in real-time:

```bash
# Get current keyboard layout
CURRENT_LAYOUT=$(xkblayout-state print "%s")

# Result: "us", "ara", "de", etc.
```

Then map it to the appropriate model:

```bash
case "$CURRENT_LAYOUT" in
    us)
        MODEL_DIR="$HOME/.config/nerd-dictation/model"
        LANG_NAME="English"
        ;;
    ara)
        MODEL_DIR="$HOME/.config/nerd-dictation/model-ar"
        LANG_NAME="Arabic"
        ;;
esac
```

### The Scripts

**dictate-start** — Main script that:
- Detects keyboard layout
- Selects appropriate model
- Starts dictation with 30-second timeout
- Shows desktop notification

**dictate-stop** — Cleanup script that:
- Reads which model was used
- Stops the dictation process
- Types the transcribed text
- Shows completion notification

## Installation

### Prerequisites

```bash
# Install system dependencies
sudo apt install python3-pip xdotool zenity libnotify-bin wget unzip git

# Install xkblayout-state
git clone https://github.com/nonpop/xkblayout-state.git
cd xkblayout-state && make && sudo make install
```

### Download Models

```bash
# English (required)
mkdir -p ~/.config/nerd-dictation
wget https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip
unzip vosk-model-small-en-us-0.15.zip
mv vosk-model-small-en-us-0.15 ~/.config/nerd-dictation/model

# Arabic (optional)
wget https://alphacephei.com/vosk/models/vosk-model-ar-mgb2-0.4.zip
unzip vosk-model-ar-mgb2-0.4.zip
mv vosk-model-ar-mgb2-0.4 ~/.config/nerd-dictation/model-ar
```

### Set Up Scripts

```bash
# Clone scripts
cp dictate-start ~/.nerd-dictation/
cp dictate-stop ~/.nerd-dictation/
chmod +x ~/.nerd-dictation/dictate-*
```

### Configure Shortcuts

In your desktop settings:

| Shortcut | Command |
|----------|---------|
| `Super+H` | `~/.nerd-dictation/dictate-start` |
| `Super+Shift+H` | `~/.nerd-dictation/dictate-stop` |

## Results

### Before

```
1. Switch keyboard to Arabic
2. Find and open Arabic dictation app
3. Start dictation
4. Speak
5. Switch back to English
6. Find and open English dictation app
7. Repeat...
```

### After

```
1. Press Super+H
2. Speak
3. Press Super+Shift+H
4. Done!
```

## Supported Languages

| Layout | Language | Model Size |
|--------|----------|------------|
| `us` | English | 40 MB |
| `ara` | Arabic | 333 MB |
| `de` | German | 45 MB |
| `fr` | French | 45 MB |

Adding new languages is straightforward — just download the VOSK model and add a case to the script.

## Challenges & Solutions

### Challenge 1: Reliable Layout Detection

**Problem**: `gsettings` didn't update in real-time when switching layouts.

**Solution**: Used `xkblayout-state` which reads directly from X11.

### Challenge 2: Model Organization

**Problem**: Multiple language models needed management.

**Solution**: Standardized directory naming (`model`, `model-ar`, `model-de`).

### Challenge 3: Error Handling

**Problem**: Users might not understand why dictation fails.

**Solution**: Desktop notifications + zenity popups with clear messages.

## Future Improvements

- [ ] Add support for more languages
- [ ] Implement auto-language switching mid-dictation
- [ ] Create GUI for configuration
- [ ] Add Whisper as alternative backend

## Conclusion

Linux speech recognition has come a long way. With nerd-dictation-auto-switch-languages and VOSK, you can have seamless, offline, private voice typing that automatically adapts to your language. No cloud services, no subscriptions, just open-source speech-to-text that just works.

The project is fully open-source and available on GitHub. Contributions welcome!

## Resources

- [nerd-dictation-auto-switch-languages Repository](https://github.com/yourusername/nerd-dictation-auto-switch-languages)
- [nerd-dictation](https://github.com/ideasman42/nerd-dictation)
- [VOSK Models](https://alphacephei.com/vosk/models)
- [xkblayout-state](https://github.com/nonpop/xkblayout-state)

*Have questions or suggestions? Open an issue on GitHub!*
