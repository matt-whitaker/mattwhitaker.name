
1. Visible design (repeat 1 or two images, focus on implementation of scroller w/o loading concerns)
2. Collect images
3. Build static wiring (Cloudfront/S3)
4. Build service worker (load images / manifest / handle pagination)
5. Build infinite scrolling capability (plan for virtualization, ensure scrolling makes sense--ala the actual scrolling container needs to retain its most maximum height,
    offsetting actually rendered content to create the appearance of scrolling through the infinitely loaded list.
6. Virtualize elements not in view.
7. Polish the story, provide knobs or configurations to demonstrate how it behaves in different concepts.1
8. Generate an accessibility report and provide it for reference.