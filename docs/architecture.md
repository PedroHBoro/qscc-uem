# Architecture Documentation

This document outlines the architecture of the game, covering the project structure, design principles, and gameplay mechanics.

## 1. Directory Structure

The project follows a specific structure to maintain organization and clarity.

-   **`main.js`**: This file is the entry point of the application. Its sole responsibility is to initialize and configure the server for the game. All game-related logic is delegated to other parts of the application and should not be placed here.

-   **`src/components/`**: This directory contains all the game components. Following the principles of high cohesion and low coupling, each component should be self-contained and responsible for a single piece of functionality.

-   **`src/utils/`**: This directory should contain utility functions that can be shared across different components, such as helper functions for math, physics, or other reusable logic.

-   **`public/assets/`**: All static assets, including images (PNG, JPG), vector graphics (SVG), and bitmaps, must be placed in this directory.

## 2. Design Philosophy

### Mobile-First Design

The game is designed with a mobile-first approach. All UI and gameplay considerations should prioritize a seamless experience on mobile devices. The layout should be responsive and controls should be intuitive for touch screens **IN VERTICAL**.

### High Cohesion and Low Coupling

Game components should be designed to be highly cohesive and loosely coupled.
-   **High Cohesion**: Each component should have a single, well-defined purpose.
-   **Low Coupling**: Components should have minimal dependencies on each other. Communication between components should be handled through well-defined interfaces or an event system.

## 3. Game Overview

### Camera and Perspective

The game is presented from a 2D top-down camera perspective.

### Gameplay Concept

The core mechanic revolves around player choice and self-reflection. The protagonist is presented with a series of questions about their preferences and future ambitions.

To answer, the player controls the protagonist and moves them to a specific side of the screen that represents their agreement with a statement. If the player has no opinion or prefers not to answer, they can remain in their current position. This movement-based response system forms the primary way the player interacts with the game's narrative. Player input is handled via touch controls; the user taps the desired location on the screen, and the protagonist moves to that point.
