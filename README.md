# Bedfordshire Bicycle Club

## Code Institute - Milestone Project 2

![Website Mockup](assets/img/documentation/mockup.png)

[Click here to view the website](https://gregkaighin.github.io/bedfordshire-bicycle-club/)

This website is for a ficticious local bicycle club.
The primary goal is to provide information about the club to members and people interested in joining.  

Features include a carousel to show information about upcoming club events, and a photo gallery, using Bootstrap components.  

The website makes use of Google Maps API and JavaScript to provide users with a route planner which displays cycling routes used by the club, and also allows users to create their own. It also features a shop locator with map markers at locations of bicycle shops in Bedfordshire. Information about each shop is shown when the user clicks the markers.  

There is also a contact form to allow people to get in contact with the site administrator, this uses the EmailJS service.


## Table of Contents
1. [UX](#ux)
    -  [Visitor Goals](#visitor-goals)
    -  [Club Goals](#business-goals)
    -  [User Stories](#user-stories)
    -  [Design Choices](#design-choices)
    -  [Wireframes](#wireframes)
2. [Features](#features)
    - [Existing Features](#existing-features)
    - [Elements On Every Page](#elements-on-every-page)
    - [Elements Unique To Each Page](#elements-unique-to-each-page)
    - [Home Page](#home-page)
    - [Routes Page](#routes-page)
    - [Shops Page](#shops-page)
    - [Contact Page](#contact-page)
    - [Features For Future Releases](#features-for-future-releases)
3. [Technologies Used](#technologies-used)
    - [Languages](#languages)
    - [Libraries](#libraries)
    - [Tools](#tools)
4. [Testing](#testing)
    - [Validation](#validation)
    - [Performance](#performance)
5. [Deployment](#deployment)
6. [Credits](#credits)
    - [Images](#images)
    - [Original Content](#original-content)
    - [Acknowledgements](#acknowledgements)
8. [Contact](#contact)

The target audience is people who are members of the bicycle club, or who may be considering joining.

This website has been designed to provide users with information about Bedfordshire Bicycle Club. It is targeted at casual cyclists in Bedfordshire, who may have an interest in joining a social cycling club. 
The primary goal of the website is to attract people to join the club by presenting information about the club, including meeting times, social events and routes, and to promote public awareness of cycle lanes and bike shops in the county.
The website features a contact form so that visitors can contact the site with any potential query.

## User-Experience (UX):

  * ### User Stories
     
    * #### First Time Visitor Goals
      * As a First Time Visitor, I want to understand the purpose of the website and find out what Bedfordshire Bicycle Club has to offer.
      * As a First Time Visitor, I want to navigate throughout the website easily to find content.
      * As a First Time Visitor, I would like to be able to find out information about the club's cycling groups and social events, and how to get in contact.

    * #### Returning Visitor Goals
      * As a Returning Visitor, I would like to see some of the routes the club uses for their bike rides.
      * As a Returning Visitor, I want to contact the administrators with any general queries or questions about Bedfordshire Bicycle Club.
      * As a Returning Visitor, I would like to use the bike store locator to find out about bike shops in Bedfordshire.

    * #### Frequent User Goals
      * As a Frequent User, I would like to use the route planner to create routes for the club's bike rides.
      * As a Frequent User, I would like to view the different social media accounts to either view, look for updates or potentially interact with other people involved with the club.

## User Stories

As a visitor to Bedfordshire Bicycle Club website I expect/want/need:
1. To be able to navigate the website easily and to quickly find the information I am looking for.
2. To get information about Bedfordshire Bicycle Club.
3. To get information about upcoming club events.
4. To be able to view club cycling routes and to plan my own routes.
5. To find information about local bike shops.
6. To access the website on my phone, tablet and computer.
7. For the website to have a coherent look.
8. For everything to work.

# Design Choices

## Colours
![colour-scheme](assets/img/documentation/colour-scheme.png)

The colour scheme used for this website was composed with [Adobe Color](https://color.adobe.com/create/color-wheel).

* Light Yellow `#FFFFE0`
* Cream `#EEE8AA`
* Light Sea Green `#20B2AA`
* Dark Slate Grey `#2F4F4F`
* Brown `#A52A2A`

### Typography

The font for the club name and page headings is *Mali*, and for the paragraph text is *Poppins*. 
The secondary font, used as fallback if there are any issues presenting the primary font, is *Roboto*.
All fonts are taken from [Google Fonts](https://fonts.google.com/specimen/Sansita+Swashed?query=sansita+s#standard-styles).

### Imagery

The logo was created and edited in [Adobe Photoshop](https://www.adobe.com/uk/products/photoshop.html). It is a simple vector image of a bicycle.

[Pixabay](https://pixabay.com/) was used to source all images on the **Home page**, including the hero image, bootstrap card images and gallery images.

The hero image was created by making a collage of bicycle images in .png file format, which allows the images to retain transparency when displayed on the website. 

# Wireframes

* Home Page:

![home-page-wireframe](assets/img/wireframes/home.png)

* Routes Page:

![home-page-wireframe](assets/img/wireframes/routes.png)

* Shops Page:

![home-page-wireframe](assets/img/wireframes/shops.png)

* Contact Page:

![home-page-wireframe](assets/img/wireframes/contact.png)

# Features

#### Home Page

On the home page the user sees the navbar and hero image, which immediately gives a clear idea of what the website is about.  

This is followed by a short 'about-us' section telling users information about the club, and what they can find on the website.  This section includes internal links to other parts of the website to help users quickly navigate to where they want to go.  

The next section is about cycling club meetups and gives information about the different cycling groups, and includes a link to the club's Whatsapp messaging group.

Below this is a carousel slider showing details about upcoming club events.  

The next feature is a photo gallery, which shows an expanded image when the small images are clicked.  

At the bottom of the page there is a 'back-to-top' button, social media links, and copyright information.


#### Routes Page

The routes page shows a map with clickable buttons positioned above it to show routes used by the cycling club.  

Below the map are input fields to allow the user to create their own routes including up to 8 waypoints.

Routes are displayed on the map along with a panel below, showing a route summary and turn by turn directions, allowing the user to examine routes in detail.

The routes and input fields can be cleared by clicking the 'clear route buttons'.

The map, routing and directions are provided by Google Maps API. The input fields give results biased towards the boundary of the map. This uses the places feature of Google Maps API.  

#### Shops Page

The shops page shows a map showing the location of up to 20 bicycle shops in the Bedfordshire area.

Information about each shop is shown to the user when they click on the marker, including the fields "rating, name, address, phone number, website". The website field is a clickable link allowing the user to visit shop websites.  

The shops are located by using the 'nearby search' feature of Google Maps API.
#### Contact Page

The contact page shows a simple form allowing users to contact the site administrator with queries. The form makes use of the EmailJS service.  

#### Features on every page

All pages have a navbar at the top, and social links at the bottom.  

# Issues overcome

#### Issue 1

I had a problem with the route planner, where the bicycle layer (green lines) would dissappear from the map on subsequent route requests.
This was because the map displays the bicycle layer when the map is drawn initially, and again when a route request is made using bicycle as the travel mode.
This was fixed by adding "bicycleLayer: suppress" to the directions renderer object (routes.js line 144).

#### Issue 2

I had an issue with the waypoint input fields not returning results biased towards the boundary of the map.
This was fixed by appliying the getBounds() function directly to the created input fields (routes.js line 173).

## Features for Future Releases

# Technology Used:

## Programming Languages
- HTML5
- CSS3
- JavaScript  

## Frameworks, Libraries and Tools
- [Adobe Photoshop](https://www.adobe.com/uk/products/photoshop.html) for editing the images.
- [Balsamiq Wireframes](https://balsamiq.com/) for creating the wireframes.
- [Bootstrap](https://getbootstrap.com/) for the navbar, card, carousel, gallery and form components.
- [Font-Awesome](https://fontawesome.com/) for the icons.
- [Git](https://git-scm.com/) - for version control, and for the terminal to enter the code.
- [GitHub](https://github.com/) - to store the repository pushed from Git.
- [Google Fonts](https://fonts.google.com/) for the 'Poppins' and 'Mali' fonts.
- [jQuery](https://jquery.com/) to simplify creation of some of the JavaScript funtions in the routes.js file.
- [js popper](https://popper.js.org/) for the navbar menu toggle.
- [realfavicongenerator](https://realfavicongenerator.net/) for generating the favicons.
# Testing

## Validation
- HTML: [validator.w3.org](https://validator.w3.org/) - No errors or warnings to show.
- CSS: - [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/) - No Errors Found.
(http://jigsaw.w3.org/css-validator/validator$link)
<p>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="http://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!" />
    </a>
</p>

## Performance

[web.dev/measure/](https://web.dev/measure/)
![Piano Lessons with Greg Kaighin lighthouse-test](assets/images/lighthouse-test-plwgk.png)

# Known Issues and Potential Solutions


## Deployment:

### GitHub Pages

This project was deployed to GitHub Pages by doing the following:

1. Sign in to GitHub and locate the GitHub Repository.
1. Select "Settings" from the menu above the Repository files.
1. Scroll down to the "GitHub Pages" section.
1. Under "Source" click the dropdown menu called "None" and select "Master Branch".
1. After selecting "Master Branch", the page will automatically refresh.
1. The website is now deployed. Return to the "GitHub Pages" section to retrieve the newly published link.

### Forking the GitHub Repository

1. Sign in to GitHub and locate the GitHub Repository.
1. Go to the top right side of the screen and below the navigation bar is the "Fork" button.
1. After clicking this, you will now have a copy of the original Repository in your GitHub account.

### Making a Local Clone

1. Sign in to GitHub and locate the Repository.
1. Above the Repository files, click on the "Code" button.
1. You are then met with three options, HTTPS, SSH and GitHub CLI. Select one and copy the URL.
1. Open Git Bash.
1. Now change the current working directory to the location you'd like the cloned directory to be made.
1. Type `Git Clone` and then paste the URL copied from step 3.
1. Press Enter. Your local clone will now be created. 

# Credits

## Images

## Original Content

## Acknowledgements


# Contact
Greg Kaighin
gregkaighin@hotmail.com

Store Locator:
https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#0

Route Planner:
Javascript Google Map Directions API & Places API Project - [2021] | Google Map Javascript Tutorial -
https://www.youtube.com/watch?v=BkGtNBrOhKU&t=1837s
https://developers.google.com/maps/documentation/javascript/examples/layer-bicycling
https://developers.google.com/maps/documentation/javascript/directions#DraggableDirections
https://stackoverflow.com/questions/51576925/how-to-calculate-total-distance-and-time-getdistancematrix
https://stackoverflow.com/questions/14853779/adding-input-elements-dynamically-to-form
https://stackoverflow.com/questions/42776319/bind-google-address-autocomplete-api-on-dynamically-create-input

Map styling:
https://snazzymaps.com/style/60/blue-gray

images - pixabay, wiki commons

Image Gallery:
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tab_img_gallery



