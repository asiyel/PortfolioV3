export type Stack = {
  name: string;
  content: string;
  icon: string;
};

export type Category = {
  id: string;
  label: string;
  icon: string;
  stacks: Stack[];
};
