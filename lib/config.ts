import { StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "예: 고무 오리는 팔아도 될까?",
    prompt: "고무 오리는 팔아도 될까?",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "뭐든지 물어보세요...";

export const GREETING = "아크 레이더스 플레이에 도움을 드립니다.";

export const getThemeConfig = (): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: -1,
    },
    accent: {
      primary: "#fa4a10",
      level: 1,
    },
    surface: {
      background: "#090c19",
      foreground: "#1a1d2e",
    },
  },
  radius: "pill",
  density: "normal",
  typography: {
    baseSize: 16,
    fontFamily: "Inter, sans-serif",
    fontSources: [
      {
        family: "Inter",
        src: "https://rsms.me/inter/font-files/Inter-Regular.woff2",
        weight: 400,
        style: "normal",
      },
      {
        family: "Inter",
        src: "https://rsms.me/inter/font-files/Inter-Medium.woff2",
        weight: 500,
        style: "normal",
      },
      {
        family: "Inter",
        src: "https://rsms.me/inter/font-files/Inter-SemiBold.woff2",
        weight: 600,
        style: "normal",
      },
      {
        family: "Inter",
        src: "https://rsms.me/inter/font-files/Inter-Bold.woff2",
        weight: 700,
        style: "normal",
      },
    ],
  },
});
