# Getting Started

```bash
Prerequisite:
- React Native Setup along with android and ios dev tools XCode and Android Studio

Step 1 : Clone the repo

git clone git@github.com:kaushalmarakana/fc.git

=> Go to cloned directory

Step 2 : Install deps

- npm install
- cd ios
    - pod install
    - cd ..

Step 3 : Start metro bundler

npm start

Step 4 : Run android or ios on other terminal

npm run android
OR
npm run ios
```

## Features

- Implemented all mentioned features in assignment
- Implemented all bonus points
- Search functionality is based on the search text with infinte scroll

## Additional Features

- If genre is changed at particular year section, user will be landed on that year only with new data
- Genres filter is not local filter, on change of genre all 20 new items will be fetched with genre filter applied to api

## Extra information

- To sort based on popularity, the api was not giving proper response using sort_by filter, so sorted manually from frontend side
- For 20 results per year, the limit key is not available in api, default it's giving 20 result, so assuming it will give 20 max per page.
- Tested all functionalities on iPhone 14 (ios 16.1) and Pixel 5 (Api level 33) and Samsung F62 (Android 13)
- Could not test on multiple different devices

## System Info

- Xcode - 14.1
- Android Studio: 2023.1 AI-231.9392.1.2311.11076708
- Java: 18.0.2
