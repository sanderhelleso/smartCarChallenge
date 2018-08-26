# smartcarChallenge

Front End Code Challenge by Smartcar - Sander Hellesø

<img src='https://github.com/sanderhelleso/smartCarChallenge/blob/master/client/public/img/screenshots/video.gif' alt='GIF of application'>

## Features

<ul>
  <li>Sends HTTP request to specific API endpoint upon form submission</li>
  <li>Allows user to enter info for the request body specified by the specific request selected</li>
  <li>React state application to easy and clearly update component on state change</li>
  <li>Good, clear and modern UX and UI, should be easy to use for user</li>
  <li>Make sure user is entering the correct formated data as the required formatting is set</li>
  <li>Responsive grid layout</li>
</ul>

### Installing

```
git clone https://github.com/sanderhelleso/smartCarChallenge.git
cd smartCarChallenge
cd client
npm install
npm run build
npm start
```

### Edit and modifying of component

```
Component state is mainly set through the configuration file data.js, located within the APIExplorer folder. Here you can easily add or remove methods, set placeholders, properties etc.
The APIExplorer component is state based and will rerender on changes done in the application.
Static text aswell is set through objects for easier modifying of the app.
```

## Built With

* React
* Axios
* Materialize.css
* Animate.css

## Authors

* **Sander Hellesø**

## License

This project is licensed under the MIT License

## Acknowledgments

* Thanks to smartcar for a fun and challenging project

## Notes

<ul>
  <li>Added GIF displaying some of the various stages of the application</li>
  <li>Layout is based on a simpel and modern design, i tried to make it feel at home with the smartcar website</li>
  <li>Added some minor usefull things like displaying and copying of auth token</li>
  <li>If you have issues running this locally please contact me ASAP</li>
</ul>

