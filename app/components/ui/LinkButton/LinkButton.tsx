import Link from "next/link";
import "./LinkButton.scss";

export default function LinkButton({
  name,
  link,
  newTab,
}: {
  name: string;
  link: string;
  newTab?: boolean;
}) {
  return (
    <Link
      href={link}
      className="link-button"
      target={newTab ? "_blank" : undefined}
    >
      {name}
    </Link>
  );
}
