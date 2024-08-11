import { Feed } from "feed";
import moment from "moment";
import { resolvePath } from "./file.js";
import { join } from "path";

export const generateFeed = (site, pages, args, options) => {
  const outputRoot = resolvePath(options.root, args.output);
  const feed = new Feed(site.feed);

  pages.filter(({ publish }) => !!publish).forEach(({ title, url, snippet, rendered, publish }) => {
    if (url !== "/blog" && url.includes("/blog")) {
      feed.addItem({
        title,
        id: url,
        link: url,
        description: snippet,
        content: snippet,
        author: site.feed.author,
        date: moment(publish, "MMMM D, YYYY").toDate()
      });
    }
  });

  feed.addCategory("Software");

  return {
    rss: {
      content: feed.rss2(),
      output: join(outputRoot, "blog", "rss.xml")
    },
    atom: {
      content: feed.atom1(),
      output: join(outputRoot, "blog", "atom.xml")
    },
  };
}