declare module "lucide-react" {
  import * as React from "react";
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  export type Icon = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
  export const Home: Icon;
  export const Bookmark: Icon;
  export const PlusCircle: Icon;
  export const User: Icon;
  export const Settings: Icon;
  export default Icon;
}
