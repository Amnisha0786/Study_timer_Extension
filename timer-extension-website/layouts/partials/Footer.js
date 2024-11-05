import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Footer = () => {
  const { copyright} = config.params;
  return (
    <footer className="bg-theme-light">
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
    </footer>
  );
};

export default Footer;
