# The Island Quiz

**Developer:** Supphawit Wuttiprasit

The Island Quiz is a game application built with Next.js and TypeScript. It allows users to play a trivia quiz game with questions and answers. Players can track their performance, replay the game, and continue their session later if they navigate away.

## Features

### 1. Start Game Button
- Clicking the "Start" button creates a new session and navigates to the question-answering screen.

### 2. Question and Answer Screen
- Displays the question and a set of 2–4 answer choices (based on the API response).
- When the user selects an answer, the result of the answer is shown, and the user can proceed to the next question using the "Next" button.

### 3. Timing Feature
- Tracks the time spent on each question and sends it along with the answer.

### 4. Game End
- When all questions are answered, the API will return `null` to indicate the test is complete.
- Displays the results of the game when the test ends.

### 5. Replay Game
- After displaying the results, a "Continue" button allows the user to return to the home screen.
- Starting a new game creates a new session.

### 6. Session Continuation
- If the user navigates away from the question screen before completing the test, they can continue the current session when they return.

### 7. Local Player History
- Stores the player's name and score history locally on the device.
- Includes a History button that allows the user to view their past game results.

## Installation and Running the Application

Follow these steps to run the application locally:

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/supphawit/the-island-quiz.git
    ```
2. Navigate into the project directory:
    ```bash
    cd the-island-quiz
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production
1. To build the application for production, use the following command:
    ```bash
    npm run build
    ```
2. After building the application, you can start the production server using the following command:
    ```bash
    npm run start
    ```
Now, you can visit http://localhost:3000 to see the app in production mode.

## Technologies Used
- Next.js - React framework for building the application.
- TypeScript - For type-safe JavaScript development.
- API - Fetches question and answer data.
- framer-motion - Used to enhance the user experience (UX) and user interface (UI) with smooth animations and transitions.
