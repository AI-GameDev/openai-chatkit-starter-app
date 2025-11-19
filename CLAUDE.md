# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js starter application for OpenAI's ChatKit, a web component for building AI chat interfaces. The app connects to OpenAI-hosted workflows created via Agent Builder and provides a customizable UI wrapper with theming and configuration options.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Setup

Required environment variables in `.env.local`:

- `OPENAI_API_KEY` - API key from the same org/project as Agent Builder workflow
- `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID` - Workflow ID from Agent Builder (starts with `wf_...`)
- `CHATKIT_API_BASE` (optional) - Custom API base URL

**Important**: Before running, unset any existing `OPENAI_API_KEY` in your terminal session (`unset OPENAI_API_KEY` on Unix/Mac, `set OPENAI_API_KEY=` on Windows) to ensure `.env.local` values are used.

## Architecture

### Session Flow
1. Client requests session via `app/api/create-session/route.ts` (Edge runtime)
2. Server creates ChatKit session with OpenAI API, passing workflow ID
3. Server generates/retrieves user ID via HTTP-only cookie (`chatkit_session_id`, 30-day lifetime)
4. Client receives `client_secret` to authenticate ChatKit web component

### Component Structure
- `app/App.tsx` - Root client component with theme management
- `components/ChatKitPanel.tsx` - Main ChatKit integration with session management, error handling, and client-side tool callbacks
- `lib/config.ts` - Configuration for starter prompts, theme, placeholder text, greeting

### Client-Side Tools
The app supports custom client-side tool invocations via `onClientTool`:
- `switch_theme` - Switches between light/dark themes
- `record_fact` - Example tool for saving user facts (with deduplication)

### Error Handling
Three error states tracked in ChatKitPanel:
- `script` - ChatKit web component loading errors
- `session` - Session creation/authentication errors
- `integration` - Runtime integration errors

### Theming
Theme configuration uses ChatKit's theming system with grayscale and accent color customization. Configure via `getThemeConfig()` in `lib/config.ts`. Use https://chatkit.studio/playground to explore theme options.

## Key Integration Points

### Customizing Chat Behavior
- Edit `lib/config.ts` for UI customization (prompts, greeting, placeholder, theme)
- Modify `components/ChatKitPanel.tsx` event handlers for analytics or storage integration:
  - `onClientTool` - Handle custom tool invocations from agent
  - `onResponseEnd` - Track when responses complete
  - `onResponseStart` - Track when responses begin
  - `onThreadChange` - Handle thread switches

### API Endpoint
The `app/api/create-session/route.ts` endpoint:
- Runs on Edge runtime
- Handles session creation and renewal
- Manages user identification via cookies
- Supports file upload configuration via `chatkit_configuration.file_upload.enabled`

### File Attachments
File upload is enabled by default in this starter. Configure via:
- `ChatKitPanel.tsx` composer config: `attachments: { enabled: true }`
- Session creation payload: `chatkit_configuration.file_upload.enabled`

## Deployment

Before deploying:
1. Run `npm run build` to verify production build
2. Add domain to [Domain allowlist](https://platform.openai.com/settings/organization/security/domain-allowlist)
3. Ensure organization is verified if using models like GPT-5

## Dependencies

Core libraries:
- `@openai/chatkit-react` (>=1.1.1 <2.0.0) - ChatKit React integration
- `next` (^15.5.4) - Next.js framework
- `react` (^19.2.0) - React library
- `@tailwindcss/postcss` (^4) - Tailwind CSS v4
