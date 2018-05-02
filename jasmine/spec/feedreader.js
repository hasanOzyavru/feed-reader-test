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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each has url', function() {
            for (let i=0; i<allFeeds.length; i++) {                     
                expect(typeof(allFeeds[i].url)).not.toBe('undefined');  //If no url then the type is undefined
                if (typeof(allFeeds[i].url)==='string') {               //If there is a string as url then check
                    expect(allFeeds[i].url.length).not.toBe(0);         //if it is not empty
                }              
            }
            
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each has name', function() {
            for (let i=0; i<allFeeds.length; i++) {
                expect(typeof(allFeeds[i].name)).not.toBe('undefined'); //If no name then the type is undefined
                if (typeof(allFeeds[i].name)==='string') {              //If there is a string as name then check
                    expect(allFeeds[i].name.length).not.toBe(0);        //if it is not empty
                }              
            }
            
        });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        let menuDefaultPosition = parseInt($('.slide-menu').css('transform').split(',')[4]);
        let menuWidth = parseInt($('.slide-menu').css('width'));
        let netOutsidePosition = Math.abs(menuDefaultPosition)-menuWidth; // By analyzing CSS; Slide-menu should 
        const menuIcon = document.querySelector('.menu-icon-link');     //translate -x direction by 32 px more than
        const bodyClassList = document.body.classList;                  //width to be totally invisible (netOutsidePosition)
        
        it('is hidden by default', function() {
            expect(menuDefaultPosition).toBeLessThan(0);                //Initial position must be - X (required but not enough)
            expect(netOutsidePosition).not.toBeLessThan(32);            //Completes the condition for being hidden
        }); 
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */   

        it('toggles visibility when clicked', function() {            
            menuIcon.click();                                           //menu-icon-link class is clicked
            expect(document.body.classList.value).toBe('');             //to see the visibility changes
            menuIcon.click();
            expect(document.body.classList.value).toBe('menu-hidden');                 
        });  
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var entryLinks = document.getElementsByClassName('entry-link')
        var randomPage = Math.floor(Math.random()*allFeeds.length);     //random page is selected among allFeeds
        beforeEach(function(done){                                      //loadFeed(randomPage) runs async by use
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;         //of beforeEach and done
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;                   //to prevent timeout default is increased
            loadFeed(randomPage,function(){                             //in accordance with jasmine documentation
                done();
            })
        });       
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("have at least a single entry now", function(done) {      
            expect(entryLinks.length).toBeGreaterThan(0);               //ensure that there is at least one entry
            done();
        });
        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;         //default timeout is reset as described in
        });                                                             //jasmine documentation
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var container = document.querySelector('.header-title');        //check if loadFeed brings "CSS Tricks"
        beforeEach(function(done){                                      //random logic can also be used here with
            loadFeed(1,function(){                                      //not.toBE("Feeds") because this is the first
                done();                                                 //page loaded if no further command given
            })
        }); 
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("changes the content", function(done) {      
            expect(container.innerText).toBe("CSS Tricks");
            done();
        }); 
    });    
}());
