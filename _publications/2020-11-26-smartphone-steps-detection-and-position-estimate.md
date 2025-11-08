---
title: "Steps detection and position estimate from data collected using smartphone sensors"
collection: publications
category: conferences
excerpt: "This project uses a smartphone's built-in IMU sensors to automatically detect and estimate the position of an elderly user performing activities like walking, ascending, and descending stairs, showing potential but needing further improvement for accurate results."
date: 2020-10-29
venue: 'academia.edu'
paperurl: 'https://www.academia.edu/44489313/Steps_detection_and_position_estimate_from_data_collected_using_smartphone_sensors'
citation: 'El Musleh, M. (2020). Steps detection and position estimate from data collected using smartphone sensors.'
authors: ["Mohammad El Musleh"]
tags: [Physical Activity, Smartphones, Position Estimation, Stepping Stone Detection, IMU sensor]
---

The life expectancy of the elderly population is expected to increase and this means many older adults living alone will be in need of medical support and care. With the advantage of smartphones that has built-in IMU sensors, it can be used to allow the end-user to self-track and diagnose, i.e., health monitoring. This project work will be focusing on the automatic detection of performed activity, particularly in the process of detecting steps and estimate the position to identify the user activity. Three activities were considered: walking, ascending stairs, and descending stairs. The methods used are root mean square (RMS), detection signals boundaries, assign threshold for detecting the steps and steps Lengths, and uses double integral to get the position estimate. The methods are based on the collected data from the ’Sensor fusion app’ Android application. The result shows potential in detecting the steps and estimating the position and the methods still requires more improvement in order to give an accurate result.

Key outcome:
- Analyzed data collected from a smartphone's IMU sensor using MATLAB to monitor step detection and position estimation for elderly health evaluation and anomaly detection. 
- Applied signal filtering and sensor fusion techniques to raw data, such as RMS, to refine step and stair-climbing detection. Implemented thresholds and bias reduction for accurate movement estimation.

[The source code is available in Github.](https://github.com/el-musleh/phoneIMU).