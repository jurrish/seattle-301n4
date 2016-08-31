(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    //it looks like the method loadById is a function that takes a context object, and runs the next function in the page.js queue after the context object is manipulated. the particular manipulation on ctx is taking articleData and passing in an article object and attaching articles as a property on the context object and naming it article (for this instance). article data then calls the next function (which is articlesController.index - ). articlesController.index then takes that ctx.articles object, and runs .findWhere on it where the id(field option in the SQL query) is equal to the value of ctx.params.id.  This whole sequence of functions is executed when the url( '/article/:id') is hit (aka queried by the client-side).
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };
  //loadbyAuthor is taking a context object and assigning articles as a property. it then calls next (which is articlesController.index in the route.js). then, Article.findWhere takes that authorData variable that was created(as a reference to a function that takes articlesByAuthor), and takes author name in the url and removes the + sign and replaces it with an empty space
    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //.loadByCategory defines categoryData as a function that takes articlesInCategory and assigns that value as the context object with articles as a property. then it runs the next function in the page function queue. Afterwards, it runs .findWhere method on the Article constructor that matches category to categoryName (on the context object parameter property) and runs the callback function categoryData
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //.loadAll is a function that names articleData as a function that takes allArticles as a parameter, and equates the articles property on the context object as a .all array property on the Article constructor. then, it calls the next page function that's queued up as a parameter. IF the Article.all array has a length, then set the context object property equal to Article.all and run next. Else, load the data from a local storage or the data directory.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
