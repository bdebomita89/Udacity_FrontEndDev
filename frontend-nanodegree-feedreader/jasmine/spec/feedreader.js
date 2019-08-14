/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
/* This is our first test suite - a test suite just contains
* a related set of tests. This suite is all about the RSS
* feeds definitions, the allFeeds variable in our application.
*/
describe('RSS Feeds', function() {
/* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
        */  
    it('Feeds are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);

    });

   // Test to verify if objects of allFeeds array length is not empty and has url defined
    it('Urls are defined', function() {
        for ( let i = 0 ; i < allFeeds.length ; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
        }
    });
    
    //Test to verify if objects of allFeeds array length is not empty and has name defined
    it('Names are defined', function() {
        for ( let i = 0 ; i < allFeeds.length ; i++){
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
        }
      });
    });
        describe('Menu', function() { 

      // Test to verify if the Menu is hidden by default
        it('Menu is hidden by Default', function() {
            const isClassValue = document.body.classList.contains('menu-hidden');
            expect(isClassValue).toBe(true);
        });
        
        // Test to verify if the Menu is displayed when clicked and on again clicked is hidden
        it('Menu changes visibility when clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click;
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click;
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() { 
     
    // loadfeed function to be completed before test proceeds    
        beforeEach(function(done){
            loadFeed(1,done);
        });

    // Test to verify there are more than one entries within Feed cont  
        it('It has more than one entries in feed container', function() {
            const feed = document.querySelector('div.feed');
            const entries = feed.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    })
        
    describe('New Feed SElection', function() { 
        let InitialFeed , FinalFeed;
     
     //load feeds twice to verify the feed content changes    
        beforeEach(function(done){
            loadFeed(3,function(){
            InitialFeed = document.querySelector('div.feed').innerHTML;
            loadFeed(2,function(){
            FinalFeed = document.querySelector('div.feed').innerHTML;
            done();
         });
       });
     });

     // Test to verify the content changes , when new feed is loaded by comparing the innerhtml
            it('New Feed is loaded', function() {
            expect(InitialFeed).not.toBe(FinalFeed);
            });

        });
}());
