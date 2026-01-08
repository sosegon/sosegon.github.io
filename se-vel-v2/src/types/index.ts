export type Size = 'small' | 'medium' | 'large';
export type Position = 'top' | 'bottom';
export type Thickness = 'thick' | 'thin';
export type ResumeItem = {
  role: string;
  organization: string;
  location: string;
  description?: string;
  dates: string;
};
export type Route = {
  label: string;
  pathname: string;
};
export type Project = {
  name: string;
  type: string;
  imgUrl: string;
  technologies: Array<string>;
  links?: {
    github?: string;
    web?: string;
    figma?: string;
    storybook?: string;
  };
  description: string;
};
