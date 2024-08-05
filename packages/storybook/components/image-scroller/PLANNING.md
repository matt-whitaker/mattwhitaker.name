
1. Visible design (repeat 1 or two images, focus on implementation of scroller w/o loading concerns)
2. Collect consistent test images, polish design
3. Build service worker (load images / manifest / handle pagination)
4. Build infinite scrolling capability (plan for virtualization, ensure scrolling makes sense--ala the actual scrolling container needs to retain its most maximum height,
    offsetting actually rendered content to create the appearance of scrolling through the infinitely loaded list.
5. Virtualize elements not in view (and build as independent layer of functionality) can demo separately
6. Polish the story, provide knobs or configurations to demonstrate how it behaves in different contexts
7. Generate an accessibility report and provide it for reference.
8. Build static wiring (Cloudfront/S3) for demo images (maybe do a images.mattwhitaker.name and share between dev and prod)