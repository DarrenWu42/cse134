# Homework 5 Changelog
## Lighthouse
### Lighthouse Original Score
#### Performance (94) Changes
- Text remaining visible
  - Added css property font-display to font faces
- Images not having set width and height
  - Company images didn't have a height property set, so I set it to 20vw
  
#### Accessibility (100) Changes
- None

#### Best Practices (83) Changes
- Serving images with higher resolution
  - Some of my company images are stored at a lower resolution than the max resolution I set them to, so I updated them
  - Changed the max-width and max-height to be at the correctly stored resolution
- Browser errors
  - This one was unavoidable since I'm using an adblocker and the error is with Google Analytics

#### SEO (90) Changes
- Crawlable Links
  - Needed to change homepage href to "index.html" instead of having it as just ""

### Lighthouse Post Changes Score
#### Performance (95)
- A few smaller diagnostics problems
  
#### Accessibility (100)
- None

#### Best Practices (92)
- Browser errors
- CSP effective against XSS attacks

#### SEO (100)
- None