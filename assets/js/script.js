// Function to show custom notifications
function showNotification(message, type) {
    // Remove any existing notifications
    $('.custom-notification').remove();
    
    // Create notification element
    var notification = $(`
        <div class="custom-notification ${type}">
            <span class="notification-message">${message}</span>
            <span class="notification-close">&times;</span>
        </div>
    `);
    
    // Add to body
    $('body').append(notification);
    
    // Show notification with animation
    setTimeout(function() {
        notification.addClass('show');
    }, 100);
    
    // Auto hide after 3 seconds
    setTimeout(function() {
        hideNotification(notification);
    }, 3000);
    
    // Manual close on click
    notification.find('.notification-close').click(function() {
        hideNotification(notification);
    });
}

// Function to hide notification
function hideNotification(notification) {
    notification.removeClass('show');
    setTimeout(function() {
        notification.remove();
    }, 300);
}

$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form values
        var nameValue = $('input[name="name"]').val();
        var emailValue = $('input[name="email"]').val();
        var phoneValue = $('input[name="phone"]').val();
        var messageValue = $('textarea[name="message"]').val();
        
        // Validate required fields
        if (!emailValue) {
            alert("Please fill in Email.");
            return;
        }
        
        // HubSpot API settings
        var settings = {
            "url": "https://api.hsforms.com/submissions/v3/integration/submit/243234182/ef1ae9c1-bb01-4bb1-81f3-73cdf41125bf",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Cookie": "__cf_bm=IISbENXKAIFMuLYdGtDkpaoR6edU8eTZdg32ER1l8hI-1756724258-1.0.1.1-bKjfYb2Xka.hMUAmMkA8jyKRrbxroxvHfldfSXejGUKv3OEOxS2U54J5n50nrWhgWsa6_c8GqKB.S9XgEsPMU6YA58y7SqcB3l29bGBL_jU; _cfuvid=WL3KpM1mMDuq4mEb4KTuPhaPeL.0YHJA92A3IEHfHmo-1756724258541-0.0.1.1-604800000"
            },
            "data": JSON.stringify({
                "fields": [
                    {
                        "name": "firstname",
                        "value": nameValue
                    },
                    {
                        "name": "email",
                        "value": emailValue
                    },
                    {
                        "name": "phone",
                        "value": phoneValue
                    },
                    {
                        "name": "message",
                        "value": messageValue
                    }
                ],
                "context": {
                    "pageUri": window.location.href, // Dynamic page URL
                    "pageName": "Contact Form Submission"
                }
            }),
        };
        
        // Submit to HubSpot
        $.ajax(settings)
            .done(function (response) {
                console.log('SUCCESS!', response);
                document.getElementById("contact-form").reset();
                showNotification("Form Submitted Successfully", "success");
            })
            .fail(function (xhr, status, error) {
                console.log('FAILED...', xhr.responseText || error);
                showNotification("Form Submission Failed! Try Again", "error");
            });
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Dharmendra Singh";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });