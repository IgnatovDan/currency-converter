# Currency Converter application

## Application:
 - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
 - shows 'loading' spinner on initial data fetching
 - shows error message if fetch was not succeeded and switches to 'demo' exchange rates

![image](https://user-images.githubusercontent.com/2094015/182308596-46497acc-ed3d-42a2-be04-b643d389ddf9.png)

## Used technologies
Vue, HTML, JS, CSS, BEM, fetch, XML, JSON.
This is a Vue application, project was bootstrapped with [vuejs-cli](https://cli.vuejs.org/guide/creating-a-project.html).

Available Scripts
- `npm run serve` - to open application in browser
- `npm run test:unit` - to run tests once
- `npm run test:unit -- --watch` - to run tests and keep running and watching changes

## How to avoid "Access to fetch at 'https://www.cbr.ru/scripts/XML_daily.asp' from origin 'null' has been blocked by CORS policy":

Close chrome and run it in this way: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir="c:\temp"
For more details, see https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

#### TODO:
- use local server proxy to avoid "blocked by CORS policy" error
- use vuex

#### Useful Links:
- [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro)
- [Vue Test Utils (for Vue3)](https://test-utils.vuejs.org/guide/) and [Vue Test Utils (for Vue2)](https://v1.test-utils.vuejs.org/)
