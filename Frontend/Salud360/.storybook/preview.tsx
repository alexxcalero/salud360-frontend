import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  ColorPalette,
} from "@storybook/blocks";
import "@/index.css";
import type { Preview } from "@storybook/react";
import { BrowserRouter, Routes, Route } from "react-router";
import { LoadingContext } from "@/hooks/LoadingContext";
import { ToastProvider } from "@/hooks/ToastContext";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <ColorPalette />
          <Stories />
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <LoadingContext>
          <ToastProvider>
            <Routes>
              <Route path="*" element={<Story />} />
            </Routes>
          </ToastProvider>
        </LoadingContext>
      </BrowserRouter>
    ),
  ],
};

export default preview;
