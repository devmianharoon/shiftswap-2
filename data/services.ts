interface Service {
  iconClass: string;
  title: string;
  description: string;
  btnClass: string;
}

interface DesignItem {
  imgSrc: string;
  imgSrcSet: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    iconClass: "uil uil-phone-volume before:content-['\\ec50']",
    title: "24/7 Access",
    description:
      "Employees and managers can access schedules and request shift swaps anytime, anywhere.",
    btnClass: "btn-soft-purple",
  },
  {
    iconClass: "uil uil-shield-exclamation before:content-['\\ecb3']",
    title: "Smart Shift Swaps",
    description:
      "Streamlined swap requests with manager approvals and automatic notifications.",
    btnClass: "btn-soft-green",
  },
  {
    iconClass: "uil uil-laptop-cloud before:content-['\\ebb2']",
    title: "Real-Time Updates",
    description:
      "Instant alerts for schedule changes, shift approvals, or conflicts.",
    btnClass: "btn-soft-orange",
  },
  {
    iconClass: "uil uil-chart-line before:content-['\\e9d3']",
    title: "Compliance-First",
    description:
      "Ensure regulatory and company compliance with built-in rules.",
    btnClass: "btn-soft-blue",
  },
];

export const designItems: DesignItem[] = [
  {
    imgSrc: "/assets/images/illustrations/i24.png",
    imgSrcSet: "/assets/images/illustrations/i24@2x.png 2x",
    alt: "image",
    width: 800,
    height: 535,
    title: "Web Design",
    description:
      "Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget. Fusce dapibus tellus.",
  },
  {
    imgSrc: "/assets/images/illustrations/i19.png",
    imgSrcSet: "/assets/images/illustrations/i19@2x.png 2x",
    alt: "image",
    width: 800,
    height: 545,
    title: "Graphic Design",
    description:
      "Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet. Sed posuere consectetur.",
  },
  {
    imgSrc: "/assets/images/illustrations/i18.png",
    imgSrcSet: "/assets/images/illustrations/i18@2x.png 2x",
    alt: "image",
    width: 800,
    height: 481,
    title: "3D Animation",
    description:
      "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna scelerisque.",
  },
];