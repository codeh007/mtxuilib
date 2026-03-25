import { DotsHorizontalIcon, DotsVerticalIcon, PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  Baseline,
  Bold,
  Bot,
  Box,
  Boxes,
  Brain,
  Bug,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Clock,
  Code2,
  Combine,
  Copy,
  CreditCard,
  Download,
  DownloadCloud,
  Edit,
  Edit2,
  ExternalLink,
  Eye,
  File,
  FileCode,
  FileText,
  Filter,
  FlaskConical,
  GalleryHorizontalEnd,
  Globe,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  HelpCircle,
  Highlighter,
  Image,
  Indent,
  Info,
  Italic,
  Laptop,
  LayoutDashboard,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Loader2,
  type LucideProps,
  MailX,
  Menu,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Minus,
  Monitor,
  MoreHorizontal,
  MoreVertical,
  Network,
  Outdent,
  PaintBucket,
  Palette,
  Paperclip,
  Pause,
  PenLine,
  PenTool,
  Pizza,
  Play,
  Plus,
  Quote,
  Rocket,
  RotateCcw,
  Save,
  Search,
  SeparatorHorizontal,
  Server,
  Settings,
  Shield,
  SquareIcon,
  Star,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  Terminal,
  Text,
  Trash,
  Underline,
  Ungroup,
  User,
  UserPlus,
  Users,
  Verified,
  WrapText,
  X,
  Zap,
} from "lucide-react";

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  inverted?: boolean;
}

export type Icon = LucideIcon;

export const iconVariants = cva("", {
  variants: {
    variant: {
      toolbar: "size-5",
      menuItem: "mr-2 size-5",
    },
    size: {
      sm: "mr-2 size-4",
      md: "mr-2 size-4",
    },
  },
  defaultVariants: {},
});

const borderAll = (props: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    height="48"
    width="48"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm10 13h5a1 1 0 0 0 1-1v-5h-6v6zm-2-6H5v5a1 1 0 0 0 1 1h5v-6zm2-2h6V6a1 1 0 0 0-1-1h-5v6zm-2-6H6a1 1 0 0 0-1 1v5h6V5z" />
  </svg>
);

const borderBottom = (props: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    height="48"
    width="48"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-2 7a1 1 0 1 1 2 0 1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm17-8a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3z" />
  </svg>
);

const borderLeft = (props: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    height="48"
    width="48"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 21a1 1 0 1 0 0-2 1 1 0 0 1-1-1V6a1 1 0 0 1 1-1 1 1 0 0 0 0-2 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3zm7-16a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm6 6a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm4-17a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zm-1 17a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
  </svg>
);

const borderNone = (props: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    height="48"
    width="48"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14 4a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-9 7a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-6 10a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zM7 20a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3z" />
  </svg>
);

const borderTop = (props: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    height="48"
    width="48"
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 6a1 1 0 0 0 2 0 1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3zm2 5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-8 1a1 1 0 1 0 0-2 1 1 0 0 1-1-1 1 1 0 1 0-2 0 3 3 0 0 0 3 3zm11-1a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
  </svg>
);

export const Icons = {
  X,
  // AI & Agents
  playground: MessagesSquare,
  bot: Bot,
  brain: Brain,
  "flask-conical": FlaskConical,
  zap: Zap,
  deploy: Rocket,
  gallery: GalleryHorizontalEnd,
  play: Play,
  pause: Pause,
  activity: Activity,
  pulse: Activity,

  // UI Elements
  dashboard: LayoutDashboard,
  box: Box,
  tasks: Boxes,
  boxes: Boxes,
  sandboxes: Boxes,
  add: Plus,
  plus: Plus,
  save: Save,
  trash: Trash,
  delete: Trash,
  edit: Edit,
  edit2: Edit2,
  editing: Edit2,
  refresh: RotateCcw,
  reload: ReloadIcon,
  copy: Copy,
  copyDone: ClipboardCheck,
  spinner: Loader2,
  search: Search,
  settings: Settings,
  filter: Filter,
  download: Download,
  downloadCloud: DownloadCloud,
  externalLink: ExternalLink,
  link: Link2,
  unlink: Link2Off,
  eye: Eye,
  viewing: Eye,
  info: Info,
  help: HelpCircle,
  alertTriangle: AlertTriangle,
  warning: AlertTriangle,
  bug: Bug,
  verified: Verified,

  // Communication
  messageSquare: MessageSquare,
  "message-square": MessagesSquare,
  messageCircle: MessageCircle,
  "message-circle": MessageCircle,
  mailX: MailX,
  post: FileText,
  page: File,
  media: Image,
  paperclip: Paperclip,
  attachment: Paperclip,
  PaperPlane: PaperPlaneIcon,

  // Users & Building
  user: User,
  users: Users,
  team: Users,
  userPlus: UserPlus,
  building: Building,
  billing: CreditCard,

  // Navigation & Layout
  chevronDown: ChevronDown,
  arrowDown: ChevronDown,
  chevronUp: ChevronDown, // Lucide would have ChevronUp, but keeping ChevronDown for now if needed or just use Rotate
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  more: MoreHorizontal,
  dotsHorizontal: DotsHorizontalIcon,
  dotsVertical: DotsVerticalIcon,
  ellipsis: MoreVertical,
  menu: Menu,
  alignCenter: AlignCenter,
  alignJustify: AlignJustify,
  alignLeft: AlignLeft,
  alignRight: AlignRight,
  indent: Indent,
  outdent: Outdent,
  gripVertical: GripVertical,
  dragHandle: GripVertical,
  separator: SeparatorHorizontal,

  // Editor
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  strikeThrough: Strikethrough,
  blockquote: Quote,
  quote: Quote,
  list: List,
  ul: List,
  orderedList: ListOrdered,
  ol: ListOrdered,
  code: Code2,
  codeblock: FileCode,
  table: Table,
  text: Text,
  subscript: Subscript,
  superscript: Superscript,
  color: Baseline,
  bg: PaintBucket,
  palette: Palette,
  highlighter: Highlighter,
  highlight: Highlighter,
  penLine: PenLine,
  suggesting: PenLine,
  penTool: PenTool,
  excalidraw: PenTool,
  hr: Minus,
  minus: Minus,
  wrapText: WrapText,
  lineHeight: WrapText,

  // Brand & Special
  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg title="github" viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg {...props} height="23" viewBox="0 0 1200 1227" width="23" xmlns="http://www.w3.org/2000/svg">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  apple: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  ),
  paypal: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
        fill="currentColor"
      />
    </svg>
  ),

  // Misc
  server: Server,
  terminal: Terminal,
  monitor: Monitor,
  laptop: Laptop,
  globe: Globe,
  shield: Shield,
  network: Network,
  star: Star,
  pizza: Pizza,
  clock: Clock,
  timer: Clock,
  calendar: Clock, // Alias for now
  dot: Circle,
  circle: Circle,
  combine: Combine,
  ungroup: Ungroup,
  borderAll,
  borderBottom,
  borderLeft,
  borderNone,
  borderTop,
};

export const IconX = (props: { name: string } & IconProps) => {
  const { name, ...etc } = props;
  const Icon = (Icons as Record<string, React.ComponentType<IconProps>>)[name] || SquareIcon;
  return <Icon {...etc} />;
};
