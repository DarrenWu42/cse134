# Homework 5

## Required information
Name: Darren Wu

PID: A15936118

Link: https://cse134hw5-4242dw.web.app/

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

## Part 3 Implementation
I wanted to use FirebaseUI for my login since it seemed simple. To use it though, I had to revert to firebase SDK v8, which involved quite a few changes on the crud.html page of the site. After that, I have a script that checks if a user is signed in or not. If they are signed in then it removes the login container and keeps the sign out button and the paragraph that says which user is signed in. If they are not signed in then it keeps the login container and removes the sign out button and many of the CRUD elements that allows an interaction with the backend. This isn't ideal since it does briefly show these elements and this isn't that secure, but it works and I don't really want to put more work into it anymore.