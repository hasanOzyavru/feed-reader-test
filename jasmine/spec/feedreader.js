/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are within the $() function, to ensure
 * they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is about the RSS feeds definitions,
    *  the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test (it) tests to make sure that the allFeeds 
         * variable has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that URL is not empty.
         */
        it('each has url', function() {
            /* loops through all feeds */
            for (let i=0; i<allFeeds.length; i++) {                     
                /* test if there is url definition in every feed */
                expect(typeof(allFeeds[i].url)).toBeDefined();  
                /* if there is url string, ensure that it is not empty */
                if (typeof(allFeeds[i].url)==='string') {               
                    expect(allFeeds[i].url.length).not.toBe(0);         
                }              
            }
            
        });
        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('each has name', function() {
            /* loops through all feeds */
            for (let i=0; i<allFeeds.length; i++) {
                /* test if there is name definition in every feed */
                expect(typeof(allFeeds[i].name)).toBeDefined(); 
                /* if there is name string, ensure that it is not empty */
                if (typeof(allFeeds[i].name)==='string') {              
                    expect(allFeeds[i].name.length).not.toBe(0);        
                }              
            }
            
        });
    });
    /* "The menu" test suite */
    describe('The menu', function() {
        /* The test ensures the menu element is hidden by default
         * hiding/showing of the menu element.
         */                
        /* Hide/show is defined in 'menu-hidden' class */
        
        it('is hidden by default', function() {
            /* Check if classList has 'menu-hidden' class by default */
            expect(document.body.classList.value).toContain('menu-hidden');         
        }); 
         /* The test ensures the menu changes visibility when
          * the menu icon is clicked. This test has two expectations :
          * Ddoes the menu display when clicked and does it hide when clicked again.
          */   
        /* menuIcon is defined to trigger click event for checking if menu is
         * displayed and hidden */
        const menuIcon = document.querySelector('.menu-icon-link'); 
        it('toggles visibility when clicked', function() {            
            menuIcon.click();                                           
            expect(document.body.classList.value).not.toContain('menu-hidden');             
            menuIcon.click();
            expect(document.body.classList.value).toContain('menu-hidden');                 
        });  
    });
    /* "Initial Entries" test suite */
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
        /* The test ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container. It is asynchronous testing.
         */
        it("have at least a single entry now", function(done) {      
            expect(entryLinks.length).toBeGreaterThan(0);               //ensure that there is at least one entry
            done();
        });
        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;         //default timeout is reset as described in
        });                                                             //jasmine documentation
    });
    /* "New Feed Selection" test suite*/
    describe('New Feed Selection', function() {
        var container = document.querySelector('.header-title');        //check if loadFeed brings "CSS Tricks"
        beforeEach(function(done){                                      //random logic can also be used here with
            loadFeed(1,function(){                                      //not.toBE("Feeds") because this is the first
                done();                                                 //page loaded if no further command given
            })
        }); 
        /* The test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes. Asynchronous testing.
         */
        it("changes the content", function(done) {      
            expect(container.innerText).toBe("CSS Tricks");
            done();
        }); 
    });    
}());
