# Source Structure

```
src/
├── app/ <-- Routes for the website
├── components/ <-- Components for the website
├── data/ <-- Bot data
│   ├── commands/ <-- Bot commands
│   ├── util/ <-- Bot utilities
├── handlers/ <-- Command handlers
├── lib/ <-- External libraries
├── types/ <-- Types throughout the application
├── utils/ <-- Utility functions
├── config.ts <-- The configuration values
├── env.mjs <-- Environment variables
├── ...
```

---

## APP (`/src/app`)

The front-end application

### API

- `/api/auth/discord/redirect`
    - Handles [OAuth2](https://discord.com/developers/docs/topics/oauth2) connection with Discord
- `/api/interactions`
    - Handles the interactions

### Routes

- `/commands`
    - Displays a searchable list of all commands
- `/commands/{COMMAND_ID}`
    - Displays the JSON command object

---

## Components (`/src/components`)

- [`<Command data={} />`](/src/components/Command.tsx) - The command component
    - **Command** object must be passed into the `data` param

### UI

User interface components

- [`<Button />`](/src/components/ui/Button.tsx) - A simple button
- [`<Card />`](/src//components/ui/Card.tsx) - Card to display command
- [`<Scroll />`](/src/components/ui/Scroll.tsx) - A scrollable section

### UX

User experience components

- [`<Search />`](/src/components/ux/Search.tsx) - The searchable commands component
- [`<SearchList />`](/src/components/ux/SearchList.tsx) - The filtered list of what was searched

---

## Data (`/src/data`)

The data for the bot (commands & utility).
> This would be where other things such as buttons and other message components would be located as well.

### Commands 

- Each command should also be located in a parent "category" directory (ex. `/commands/misc/ping.ts` -> **`/ping`**)
- Each command should be exported in the main `index.ts` file:
    ```ts
    import PING_COMMAND from "./misc/ping";

    export const commands = {
        ping: PING_COMMAND,
        // ...
    } as const;
    ```

### Utilities

Utilities for the bot should fall under 1 of these 3 categories:
1. **Function**
2. **Resource**
3. **Cass**

#### Functions

These are functions that will be utilized throughout interactivity with the bot.
> **ex.** [`timeLeft.ts`](./data/util/functions/timeLeft.ts) -> function to detect the time left until a given birthday for `/birthday countdown`

#### Resources

These are constant values or data that will, once again, be utilized for interactivity with the bot.
> **ex.** [`signs.ts`](./data/util/resources/signs.ts) -> A layout of all the zodiac signs for `/sign`

#### Classes

These are classes that provide external functions for interactivity with the bot.

> **ex.** [`cooldown.ts`](./data/util/classes/cooldown.ts) -> The cooldown class for commands
---

## Handlers (`/src/handlers`)

At the moment, these are just handlers for commands.

- Separated into **admin** & **general**.
- Every handler should be exported in the main `index.ts` file as a **`adminHandler`** or **`generalHandler`**:
    ```ts
    import birthdaySet from "./general/birthday/set";

    const generalHandlers = {
        birthdaySet,
        // ...
    };

    import {viewConfigHandler} from "./admin";

    const adminHandlers = {
        viewConfigHandler,
        // ...
    };

    export {
        generalHandlers,
        adminHandlers
    }
    ```

---

## Libraries (`/src/lib`)

Defined values for external libraries to be utilized throughout the application.

- [`db.ts`](/src/lib/db.ts) - [Prisma](https://www.prisma.io/) client
- [`openai.ts`](./lib/openai.ts) - [OpenAI](https://openai.com/) object