// TODO: Configure routes for this app with page.js, by registering each URL your app can handle,
// linked to a a single controller function to handle it:
page('/', articlesController.index);//declaring a route with the /, that will call the articlesController.index
page('/about', aboutController.index);//defines a route, and instantiating page.
// TODO: What function do you call to activate page.js? Fire it off now, to execute!
page();
