import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, expect } from "storybook/test";
import { Card } from "../Card/Card";
import { Form } from "../Form/Form";
import { Heading } from "../Heading/Heading";
import { Stack } from "../Stack/Stack";
import { TextField } from "../TextField/TextField";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import { Link } from "../Link/Link";

interface LoginPageProps {
  onLogin: (data: { email: string; password: string }) => void;
  emailError?: string;
  passwordError?: string;
}

function LoginPage({ onLogin, emailError, passwordError }: LoginPageProps) {
  return (
    <Stack
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: "1rem",
        background: "var(--color-bg-subtle)",
      }}
    >
      <Card variant="elevated" style={{ width: 360 }}>
        <Stack gap={6}>
          <Heading level={1}>Sign in</Heading>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              onLogin({ email: data.email as string, password: data.password as string });
            }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              isRequired
              isInvalid={!!emailError}
              errorMessage={emailError}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              isRequired
              isInvalid={!!passwordError}
              errorMessage={passwordError}
            />
            <Stack direction="row" align="center" justify="between">
              <Checkbox name="remember">Remember me</Checkbox>
              <Link href="#">Forgot password?</Link>
            </Stack>
            <Button type="submit" style={{ width: "100%" }}>
              Sign in
            </Button>
          </Form>
        </Stack>
      </Card>
    </Stack>
  );
}

const meta = {
  component: LoginPage,
  args: {
    onLogin: fn(),
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: "1rem",
        background: "var(--color-bg-subtle)",
      }}
    >
      <Card variant="elevated" style={{ width: 360 }}>
        <Stack gap={6}>
          <Heading level={1}>Sign in</Heading>
          <Form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              isRequired
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              isRequired
            />
            <Stack direction="row" align="center" justify="between">
              <Checkbox name="remember">Remember me</Checkbox>
              <Link href="#">Forgot password?</Link>
            </Stack>
            <Button type="submit" style={{ width: "100%" }}>
              Sign in
            </Button>
          </Form>
        </Stack>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        type: "dynamic",
      },
    },
  },
};

export const WithValidationErrors: Story = {
  args: {
    onLogin: fn(),
    emailError: "Please enter a valid email address.",
    passwordError: "Password must be at least 8 characters.",
  },
};

export const SubmitFlow: Story = {
  args: {
    onLogin: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText("Email"), "user@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "secret123");
    await userEvent.click(canvas.getByRole("button", { name: "Sign in" }));
    await expect(args.onLogin).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
    });
  },
};
