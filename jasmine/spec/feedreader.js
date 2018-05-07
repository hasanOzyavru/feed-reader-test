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
         * Hide/show is defined in 'menu-hidden' class              
         */    
        it('is hidden by default', function() {
            /* Check if classList has 'menu-hidden' class by default */
            expect(document.body.classList.value).toContain('menu-hidden');         
        }); 
         /* The test ensures the menu changes visibility when
          * the menu icon is clicked. This test has two expectations :
          * Ddoes the menu display when clicked and does it hide when clicked again.
          */   
        /* menuIcon is defined to trigger click event for checking if menu is
         * displayed and hidden 
         */
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
        /* entry class length needs to be checked */
        var entryClass ;  
        /* loadFeed function runs asynchronously so beforeEach and done usage is needed. */
        beforeEach(function(done){                                                       
            /* loadFeed function is completed before the test */
            loadFeed(0,function(){ 
                entryClass = document.getElementsByClassName('entry');                                                  
                done(); 
            })
            
        });   
        /* The test ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container. It is asynchronous testing.
         */
        it("has at least a single entry now", function(done) {      
            /* check if entry length is greater than 0 */
            expect(entryClass.length).toBeGreaterThan(0);               
            done();
        });                                                             
    });
    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {
        var entryCurrent;
        var entryNext;      
        beforeEach(function(done){                                              
            loadFeed(0,function(){
                /* Get the current feed inner HTML 
                 * Page load is asynchrous and handled with done
                 */
                entryCurrent = document.querySelector('.feed').innerHTML;
                /* Load the second feed as a different feed to see if content changes */ 
                loadFeed(1,function(){
                    entryNext = document.querySelector('.feed').innerHTML;
                    done();
                })                                                                           
            })           
        }); 
        /* The test ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        it("changes the content", function(done) {                   
            /* Compare the two contents and they are expected not to be equal */
            expect(entryCurrent).not.toEqual(entryNext);
            done();
        }); 
    });    
}());
