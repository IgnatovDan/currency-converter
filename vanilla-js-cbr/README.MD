"VanillaJS" application: select your currency, enter your amount, select the target currency. The application will show the target amount.

Application will connect to www.cbr.ru

Used technologies: HTML, semantic, CSS flex/position/margin/padding/z-index, BEM.

TODO:
- store selected values between sessions
- add duedate for exchange rates and refresh it automatically without loosing user data (add a new button 'Test refresh outdated rates')
- add tests
- show country flag, currency symbol
- store received rates and use it if the remove service is not available (add a new button 'Test CBR unavailable mode')
