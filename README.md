# Verses

Verses is a web application, built using the NEXT JS framework, that provides an instant messenger service to users.

[https://verses-six.vercel.app](https://verses-six.vercel.app)
 
## The App

The application uses the NEXT JS App Router pattern with a combination of server-side pages and client-side components. Static pages are cached server-side whilst dynamic content is rendered at run time. Live updates to client side data are made through a subscription service.

## Features

Features of the app include:

- **Live updates** - Newly received messages are rendered instantly using the Pusher subscription service. 
- **Client-side fetching** - Data is fetched from the client components.
- **Authorisation** - User can register with a custom username and password, or sign in using NEXT Auth Google or GitHub OAuth methods.
- **Image upload** - Using Cloudinary, images can be uploaded and shared between users.
- **Groups** - Groups of users can interact in the same verse.
