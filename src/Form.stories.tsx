import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Mail } from "lucide-react";
import { Form } from "./Form";
import { TextField } from "./TextField";
import { Select } from "./Select";
import { Autocomplete } from "./Autocomplete";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup, Radio } from "./RadioGroup";
import { Button } from "./Button";

const meta = {
  component: Form,
  args: {
    onSubmit: fn((e) => e.preventDefault()),
    onReset: fn(),
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  { id: "alice", name: "Alice Johnson" },
  { id: "bob", name: "Bob Smith" },
  { id: "charlie", name: "Charlie Brown" },
  { id: "diana", name: "Diana Prince" },
  { id: "edward", name: "Edward Norton" },
  { id: "fiona", name: "Fiona Apple" },
  { id: "george", name: "George Lucas" },
  { id: "helen", name: "Helen Mirren" },
  { id: "ivan", name: "Ivan Petrov" },
  { id: "julia", name: "Julia Roberts" },
  { id: "kevin", name: "Kevin Hart" },
  { id: "lisa", name: "Lisa Simpson" },
  { id: "michael", name: "Michael Scott" },
  { id: "nina", name: "Nina Simone" },
  { id: "oscar", name: "Oscar Isaac" },
];

export const Default: Story = {
  render: (args) => (
    <Form {...args}>
      <TextField
        label="Full name"
        name="fullName"
        placeholder="Enter your full name"
        isRequired
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        description="We'll never share your email with anyone else."
        startAdornment={<Mail size={16} />}
        isRequired
      />

      <Select label="Country" name="country" placeholder="Select a country">
        <Select.Item id="us">United States</Select.Item>
        <Select.Item id="ca">Canada</Select.Item>
        <Select.Item id="uk">United Kingdom</Select.Item>
        <Select.Item id="de">Germany</Select.Item>
        <Select.Item id="fr">France</Select.Item>
      </Select>

      <Autocomplete
        label="Assign to"
        name="assignee"
        placeholder="Select a user..."
      >
        {users.map((user) => (
          <Autocomplete.Item key={user.id} id={user.id}>
            {user.name}
          </Autocomplete.Item>
        ))}
      </Autocomplete>

      <RadioGroup label="Plan" name="plan" defaultValue="pro">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="enterprise">Enterprise</Radio>
      </RadioGroup>

      <CheckboxGroup label="Notifications" name="notifications">
        <Checkbox value="email">Email notifications</Checkbox>
        <Checkbox value="sms">SMS notifications</Checkbox>
        <Checkbox value="push">Push notifications</Checkbox>
      </CheckboxGroup>

      <Checkbox name="terms">I agree to the <a href="/terms">terms and conditions</a></Checkbox>

      <div className="form-buttons">
        <Button type="reset" variant="text">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
};
