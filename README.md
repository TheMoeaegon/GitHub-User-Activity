# GitHub User Activity CLI

**View the project on [roadmap.sh](https://roadmap.sh/projects/github-user-activity)**

A simple command-line tool built with Node.js and TypeScript to view the recent public activity of any GitHub user. You can also filter the activity by event type.

## Features

- Fetches public events from the GitHub API.
- Formats and displays a summary of recent user activities.
- Allows filtering events by type (e.g., `PushEvent`, `CreateEvent`).
- Can be installed as a global `gh-activity` command.

## Installation & Usage

To install and run this tool, follow these steps from your terminal.

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/TheMoeaegon/GitHub-User-Activity.git
    cd GitHub-User-Activity
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Build and link the CLI command:**
    This command compiles the TypeScript code and creates a global `gh-activity` command you can use anywhere.

    ```sh
    npm link
    ```

4.  **Run the command:**
    You can now use the `gh-activity` command with a GitHub username.

    ```sh
    gh-activity <github-username> [event-type]
    ```

    - `<github-username>`: **(Required)** The GitHub user you want to check.
    - `[event-type]`: **(Optional)** The type of event to filter for (e.g., `PushEvent`, `WatchEvent`).

**Examples:**

- **To see all recent activity for a user:**

    ```sh
    gh-activity themoeaegon
    ```

- **To see only the push events for a user:**
    ```sh
    gh-activity themoeaegon PushEvent
    ```
