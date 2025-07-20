import type { Meta, StoryObj } from "@storybook/react";
import { Token } from "./Token";

const meta = {
  title: "Token",
  component: Token,
  tags: ["autodocs"],
} satisfies Meta<typeof Token>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Character: Story = {
  args: {
    token: {
      type: "character",
      sign: "好",
      pinyin: "hǎo",
      translation: "good",
      components: [
        { type: "character", sign: "女", pinyin: "nǚ", translation: "woman" },
        { type: "character", sign: "子", pinyin: "zǐ", translation: "child" },
      ],
    },
  },
};

export const Word: Story = {
  args: {
    token: {
      type: "word",
      word: "今天",
      pinyin: "jīntiān",
      translation: "today",
      characters: [
        { type: "character", sign: "今", pinyin: "jīn", translation: "now" },
        { type: "character", sign: "天", pinyin: "tiān", translation: "day" },
      ],
    },
  },
};
