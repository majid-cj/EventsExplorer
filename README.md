# Ticket Master Task


### Setup Instructions

To set up and run the app locally, follow these steps:

Clone the repository: [EventsExplorer](https://github.com/majid-cj/EventsExplorer)

```
gh repo clone majid-cj/EventsExplorer
```


Install dependencies:

```
yarn install
```

Run the app:

```
yarn run android
```

```
yarn run ios
```
### Screen Recording


<video src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/recording-1.mp4" controls width="640" height="480"></video>


### Screens


### Biometric Authentication

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screen-1.PNG" alt="Alt Text" width="60" height="130">

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screen-2.PNG" alt="Alt Text" width="60" height="130">



### Overview

Divided into two primary sections:

#### Suggested


#### All Events
<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screen-3.PNG" alt="Alt Text" width="60" height="130">


### Event Details
<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screen-5.PNG" alt="Alt Text" width="60" height="130">



### Profile
<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screen-4.PNG" alt="Alt Text" width="60" height="130">


```
API Integration
```

The app utilizes the following provided API endpoints:

```
Suggested Events: https://app.ticketmaster.com/discovery/v2/suggest
```
Fetches the list of suggested events

```
All Events and Search: https://app.ticketmaster.com/discovery/v2/events.json?keyword=keyword
```


```
Event Details: https://app.ticketmaster.com/discovery/v2/events/_event_id_.json
```


### Project Structure
The source code of the application is organized under the src directory, which includes the following main folders:

#### core:
Contains foundational and reusable code essential for the application.
- components
- constants
- models
- network
- resource

#### hooks:
Includes custom hooks for managing state and logic

#### locale:
Manages localization and internationalization files for multi-language support.

#### navigation:
Handles the application's navigation logic and routing.

#### screens:

- Authenticate: Screen for the biometric authentication screen.
- Home: Screen for viewing suggested events and search events.
- Detail: Screen for the event details screen.
- Profile: Screen for the profile where it shows profile and profile setting and favorite events.


#### store:
Manages the application's state using Zustand, a small, fast, and scalable state management solution.
